import nacl from 'tweetnacl'
import { Buffer } from 'buffer'

import {
  DEFAULT_GAS_PRICE,
  DEFAULT_MAX_GAS_UNITS,
  DEFAULT_TX_EXPIRATION_DURATION,
  MILLISECONDS_PER_SECOND,
  MAX_RETRY_FOR_TRANSACTION_COMPLETION,
  DELAY_BETWEEN_POOLING_REQUEST
} from '../constants'
import {
  OptionalTransactionPayloadArgs,
  RawTxPayload,
  TransactionStatus
} from '../types'

import { sendRequest } from '../network/request'

/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @function
 * @param {number} timeMs - The duration to sleep in milliseconds.
 * @returns {Promise<null>} - A promise that resolves after the specified duration.
 *
 * @example
 * await sleep(2000); // Pauses execution for 2 seconds
 */
export const sleep = (timeMs: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs)
  })
}
/**
 * Removes the `0x` prefix from a hexadecimal string if it exists.
 *
 * @param value - The hexadecimal string that may or may not start with `0x`.
 * @returns The string without the `0x` prefix. If the input does not start with `0x`, it returns the original string.
 *
 * @example
 * ```typescript
 * remove0xPrefix("0xabcdef"); // "abcdef"
 * remove0xPrefix("abcdef");   // "abcdef"
 * ```
 */
export const remove0xPrefix = (value: string): string =>
  value.startsWith('0x') ? value.slice(2) : value

/**
 * Generates a random nonce using tweetnacl's `randomBytes`.
 *
 * @param message - The input message (optional, used to ensure nonce variation).
 * @returns A random nonce as a hexadecimal string.
 */
export const generateNonce = (message: string): string => {
  // Generate 16 random bytes (128 bits) for the nonce
  const randomBytes = nacl.randomBytes(16)
  const randomHex = Buffer.from(randomBytes).toString('hex')

  const messageHash = Buffer.from(message).toString('hex').slice(0, 16)
  return (randomHex + messageHash).slice(0, 32)
}

/**
 * Sets default values for the `optionalTransactionPayloadArgs` element in a RawTxPayloadArray.
 *
 * This function ensures that the `optionalTransactionPayloadArgs` field contains all necessary
 * properties by assigning default values where they are missing. It helps prevent transactions
 * from failing due to missing optional parameters.
 *
 * @param {RawTxPayloadArray} rawTxPayloadArray - The raw transaction payload array to be augmented with default payload args.
 * @returns {RawTxPayloadArray} A new RawTxPayloadArray with `optionalTransactionPayloadArgs` properly set.
 *
 */
export const setOptionalTransactionPayloadArgs = (
  rawTxPayload: RawTxPayload
): RawTxPayload => {
  const currentTimeInSeconds =
    Math.ceil(Date.now() / MILLISECONDS_PER_SECOND) +
    DEFAULT_TX_EXPIRATION_DURATION

  const [
    senderAddr,
    senderSequenceNumber,
    moduleAddr,
    moduleName,
    functionName,
    functionTypeArgs,
    functionArgs,
    optionalArgs
  ] = rawTxPayload

  const updatedOptionalArgs: OptionalTransactionPayloadArgs = {
    maxGas: optionalArgs?.maxGas ?? DEFAULT_MAX_GAS_UNITS,
    gasUnitPrice: optionalArgs?.gasUnitPrice ?? DEFAULT_GAS_PRICE,
    txExpiryTime: optionalArgs?.txExpiryTime ?? currentTimeInSeconds
  }

  return [
    senderAddr,
    senderSequenceNumber,
    moduleAddr,
    moduleName,
    functionName,
    functionTypeArgs,
    functionArgs,
    updatedOptionalArgs
  ]
}

/**
 * Retrieves the status of a given Supra transaction.
 *
 * @param transactionHash - Hex-encoded 32-byte transaction hash.
 * @returns A promise that resolves to the transaction status or null if not found.
 */
export const getTransactionStatus = async (
  transactionHash: string,
  network: string = 'testnet'
): Promise<TransactionStatus | null> => {
  const subURL = `/rpc/v1/transactions/${transactionHash}`

  try {
    const resData = await sendRequest(true, subURL, network)

    if (resData.data == null) {
      return null
    }

    switch (resData.data.status) {
      case 'Unexecuted':
        return TransactionStatus.Pending
      case 'Fail':
        return TransactionStatus.Failed
      case 'Success':
        return TransactionStatus.Success
      default:
        // Handle unexpected status values
        throw new Error(`Unknown transaction status: ${resData.data.status}`)
    }
  } catch (error) {
    console.error(`Error fetching transaction status: ${error}`)
    throw error
  }
}

/**
 * Waits for a transaction to complete by polling its status.
 *
 * @param txHash - The transaction hash to monitor.
 * @returns A promise that resolves to the final transaction status.
 */
export const waitForTransactionCompletion = async (
  txHash: string,
  network: string = 'testnet'
): Promise<TransactionStatus> => {
  for (let i = 0; i < MAX_RETRY_FOR_TRANSACTION_COMPLETION; i++) {
    try {
      const txStatus = await getTransactionStatus(txHash, network)

      if (txStatus === null || txStatus === TransactionStatus.Pending) {
        await sleep(DELAY_BETWEEN_POOLING_REQUEST)
      } else {
        return txStatus
      }
    } catch (error) {
      console.error(`Error during transaction polling: ${error}`)
      throw error
    }
  }

  return TransactionStatus.Pending
}
