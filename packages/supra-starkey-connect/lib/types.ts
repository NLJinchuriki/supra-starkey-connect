import { TypeTag } from './builderTypes/builderTypes'

export interface OptionalTransactionPayloadArgs {
  maxGas?: number
  gasUnitPrice?: number
  txExpiryTime?: number
}

/**
 * Parameters for sending a transaction.
 */
export interface SendTransactionParams {
  from: string
  to: string
  value: string | number
  data?: string
  chainId?: string
}

/**
 * Represents the balance information.
 */
export interface Balance {
  balance: number
  formattedBalance: string
  decimal: number
  displayUnit: string
}

/**
 * Parameters for signing a message.
 */
export interface SignMessageParams {
  message: string
  nonce?: string
}

/**
 * Represents the response from a signed message.
 */
export interface SignMessageResponse {
  publicKey: string
  signature: string
  address: string
}

export type RawTxPayload = [
  string, // sender address
  number, // sender sequence number
  string, // module address
  string, // module name
  string, // function name
  TypeTag[], // function type arguments
  Uint8Array[], // function arguments
  OptionalTransactionPayloadArgs? // optional transaction payload arguments
]

/**
 * Defines the StarkeyProvider interface.
 */
export interface StarkeyProvider {
  connect(): Promise<string[]>
  disconnect(): Promise<void>
  account(): Promise<string[]>
  currentNetwork: string | null
  getChainId(): Promise<{ chainId: string } | null>
  sendTransaction(tx: SendTransactionParams): Promise<string>

  /**
   * Signs a message with the Starkey wallet.
   * Partially documented method.
   * @param params - The parameters required for signing a message.
   */
  signMessage(params: SignMessageParams): Promise<SignMessageResponse>

  /**
   * Signs a message with the Starkey wallet.
   * Partially documented method.
   * @param params - The parameters required for signing a message.
   */
  signMessageRaw(params: SignMessageParams): Promise<SignMessageResponse>

  /**
   * Signs and sends a transaction.
   * @param {RawTxPayload} RawTxPayload - The raw tx params object.
   * @param {string | number} [value=''] - The value to send with the transaction (optional).
   */
  signAndSendTransaction(
    rawTxPayload: RawTxPayload,
    value: string | number
  ): Promise<string>

  /**
   * Undocumented method. Parameters can be any object.
   * @param params - Undocumented parameters. Refer to documentation or contact starKey support for details.
   */
  waitForTransactionWithResult(txHash: string): Promise<any>

  /**
   * Creates a raw transaction.
   * @param {RawTxPayload} RawTxPayload - The raw tx params object.
   */
  createRawTransactionData(params: RawTxPayload): Promise<string>

  balance(): Promise<Balance>
  getVersion(): Promise<string>
  changeNetwork(options: { chainId: string }): Promise<{ chainId: string }>

  /**
   * Registers a callback for accountChanged events.
   * @param event - The event name.
   * @param handler - The callback function.
   */
  on(event: 'accountChanged', handler: (accounts: string[]) => void): void

  /**
   * Registers a callback for disconnect events.
   * @param event - The event name.
   * @param handler - The callback function.
   */
  on(event: 'disconnect', handler: (info: any) => void): void

  /**
   * Registers a callback for networkChanged events.
   * @param event - The event name.
   * @param handler - The callback function.
   */
  on(
    event: 'networkChanged',
    handler: (networkInfo: { chainId: string }) => void
  ): void
}

/**
 * Extended StarkeyProvider interface that includes the 'off' method.
 * Someday Starkey will implement .off :P
 */
export interface StarkeyProviderWithOff extends StarkeyProvider {
  /**
   * Unregisters a callback for accountChanged events.
   * @param event - The event name.
   * @param handler - The callback function to unregister.
   */
  off(event: 'accountChanged', handler: (accounts: string[]) => void): void

  /**
   * Unregisters a callback for disconnect events.
   * @param event - The event name.
   * @param handler - The callback function to unregister.
   */
  off(event: 'disconnect', handler: (info: any) => void): void

  /**
   * Unregisters a callback for networkChanged events.
   * @param event - The event name.
   * @param handler - The callback function to unregister.
   */
  off(
    event: 'networkChanged',
    handler: (networkInfo: { chainId: string }) => void
  ): void
}

/**
 * Represents the Starkey object attached to the window.
 */
export interface StarkeyObject {
  supra: StarkeyProvider
  getVersion(): Promise<string>
}

import * as BuilderTypes from './builderTypes/builderTypes'

/**
 * BCS (Binary Canonical Serialization) utilities.
 */
export const TxnBuilderTypes = {
  ...BuilderTypes
}
