import nacl from 'tweetnacl'
import { Buffer } from 'buffer'
import {
  remove0xPrefix,
  generateNonce,
  setOptionalTransactionPayloadArgs
} from './utils'

import {
  StarkeyProvider,
  StarkeyProviderWithOff,
  SendTransactionParams,
  Balance,
  SignMessageParams,
  SignMessageResponse,
  RawTxPayload
} from './types'
import { validateRawTxPayload } from './validators'

/**
 * A class that provides a wrapper around the StarKey Supra wallet provider.
 */
export class SupraStarkeyConnect {
  private provider: StarkeyProvider | null = null
  private initialized: boolean = false
  private _accountChangedCallbacks: Array<(accounts: string[]) => void> = []
  private _disconnectCallbacks: Array<(info: any) => void> = []
  private _networkChangedCallbacks: Array<
    (networkInfo: { chainId: string }) => void
  > = []

  constructor() {
    this._handleAccountChanged = this._handleAccountChanged.bind(this)
    this._handleDisconnect = this._handleDisconnect.bind(this)
    this._handleNetworkChanged = this._handleNetworkChanged.bind(this)
  }

  /**
   * Helper method to test if a given provider supports the `off` method.
   * Acts as a type guard to ensure `provider` is not null and has the `off` method.
   * @param provider - The StarkeyProvider instance to check.
   * @returns {provider is StarkeyProviderWithOff} True if `off` exists, false otherwise.
   */
  private hasOffMethod(
    provider: StarkeyProvider | null
  ): provider is StarkeyProviderWithOff {
    return (
      provider !== null &&
      'off' in provider &&
      typeof provider.off === 'function'
    )
  }

  /**
   * Checks if the Starkey Provider is available in the current environment.
   * @returns {boolean} True if available, false otherwise.
   */
  isStarKeyAvailable(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!window.starkey &&
      !!window.starkey.supra
    )
  }

  /**
   * Initializes the Starkey provider by setting up event listeners.
   */
  init(): void {
    if (this.initialized) return
    this.initialized = true

    if (!this.isStarKeyAvailable()) {
      console.warn(
        'StarKey Supra wallet not available. Please install StarKey at https://starkey.app/'
      )
      return
    }
    this.provider = window.starkey!.supra
    this.provider.on('accountChanged', this._handleAccountChanged)
    this.provider.on('disconnect', this._handleDisconnect)
    this.provider.on('networkChanged', this._handleNetworkChanged)
  }

  /**
   * Unregisters a callback for accountChanged events.
   * @param {(accounts: string[]) => void} callback - The callback function to unregister.
   */
  offAccountChanged(callback: (accounts: string[]) => void): void {
    this._accountChangedCallbacks = this._accountChangedCallbacks.filter(
      (cb) => cb !== callback
    )
    const provider = this.provider
    if (this.hasOffMethod(provider)) {
      provider.off('accountChanged', callback)
    }
  }

  /**
   * Unregisters a callback for disconnect events.
   * @param {(info: any) => void} callback - The callback function to unregister.
   */
  offDisconnect(callback: (info: any) => void): void {
    this._disconnectCallbacks = this._disconnectCallbacks.filter(
      (cb) => cb !== callback
    )
    const provider = this.provider
    if (this.hasOffMethod(provider)) {
      provider.off('disconnect', callback)
    }
  }

  /**
   * Unregisters a callback for networkChanged events.
   * @param {(networkInfo: { chainId: string }) => void} callback - The callback function to unregister.
   */
  offNetworkChanged(
    callback: (networkInfo: { chainId: string }) => void
  ): void {
    this._networkChangedCallbacks = this._networkChangedCallbacks.filter(
      (cb) => cb !== callback
    )
    const provider = this.provider
    if (this.hasOffMethod(provider)) {
      provider.off('networkChanged', callback)
    }
  }

  /**
   * Cleanup all listeners for accountChanged, disconnect, and networkChanged events.
   */
  cleanupListeners(): void {
    const provider = this.provider
    if (this.hasOffMethod(provider)) {
      // Cleanup all listeners on the provider
      this._accountChangedCallbacks.forEach((cb) =>
        provider.off('accountChanged', cb)
      )
      this._disconnectCallbacks.forEach((cb) => provider.off('disconnect', cb))
      this._networkChangedCallbacks.forEach((cb) =>
        provider.off('networkChanged', cb)
      )
    }
    // Clear internal arrays
    this._accountChangedCallbacks = []
    this._disconnectCallbacks = []
    this._networkChangedCallbacks = []
  }

  /**
   * Connects to the Supra wallet and retrieves the first account.
   * @returns {Promise<string>} The connected account address.
   * @throws Will throw an error if the provider is not available.
   */
  async connect(): Promise<string> {
    if (!this.provider) {
      this.init()
    }
    if (!this.provider) {
      throw new Error('Starkey Provider not available.')
    }
    const accounts = await this.provider.connect()
    return accounts[0]
  }

  /**
   * Disconnects from the Supra wallet.
   * @returns {Promise<void>}
   */
  async disconnect(): Promise<void> {
    if (!this.provider) return
    await this.provider.disconnect()
  }

  /**
   * Checks if there are any connected accounts.
   * @returns {Promise<boolean>} True if connected, false otherwise.
   */
  async isConnected(): Promise<boolean> {
    if (!this.provider) return false
    const accounts = await this.provider.account()
    return accounts.length > 0
  }

  /**
   * Retrieves all connected accounts.
   * @returns {Promise<string[] | null>} An array of account addresses or null if none are connected.
   */
  async getAllAccounts(): Promise<string[] | null> {
    if (!this.provider) return null
    const accounts = await this.provider.account()
    return accounts.length ? accounts : null
  }

  /**
   * Retrieves the current connected account.
   * @returns {Promise<string | null>} The current account address or null if none are connected.
   */
  async getCurrentAccount(): Promise<string | null> {
    const accounts = await this.getAllAccounts()
    return accounts?.length ? accounts[0] : null
  }

  /**
   * Retrieves the current network.
   * @returns {Promise<string | null>} The current network identifier or null if not available.
   */
  async getCurrentNetwork(): Promise<string | null> {
    if (!this.provider) return null
    return this.provider.currentNetwork
  }

  /**
   * Retrieves the chain ID of the current network.
   * @returns {Promise<{ chainId: string } | null>} The chain ID or null if not available.
   */
  async getChainId(): Promise<{ chainId: string } | null> {
    if (!this.provider) return null
    return await this.provider.getChainId()
  }

  /**
   * Sends a transaction.
   * @param {SendTransactionParams} tx - The transaction parameters.
   * @returns {Promise<string>} The transaction hash.
   * @throws Will throw an error if the provider is not initialized.
   */
  async sendTransaction(tx: SendTransactionParams): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.sendTransaction(tx)
  }

  /**
   *
   * Signs a message with the Starkey wallet.
   * partially documented function. Needs more input from the StarKey team.
   * @param {SignMessageParams} params - The message and nonce to be signed.
   * @returns {Promise<SignMessageResponse>} The signing response containing publicKey, signature, and address.
   */
  async signMessageRaw(
    params: SignMessageParams
  ): Promise<SignMessageResponse> {
    console.warn(
      'signMessage is partially. Please refer to the starkey documentation or contact starkey support if issues occur'
    )
    if (!this.provider) {
      this.init()
    }
    if (!this.provider) {
      throw new Error('Provider not initialized.')
    }

    if (!params.message) {
      throw new Error('Message not provided.')
    }
    return await this.provider.signMessage(params)
  }

  /**
   * Signs and sends a transaction.
   *
   * @param {RawTxPayloadArray} rawTxPayloadArray - The raw transaction payload array.
   * @param {string | number} [value=''] - The value to send with the transaction (optional).
   * @returns {Promise<string>} The transaction hash.
   * @throws Will throw an error if signing or sending fails.
   */
  async signAndSendTransaction(
    rawTxPayload: RawTxPayload,
    value: string | number = ''
  ): Promise<string> {
    if (!this.provider) {
      this.init()
    }

    if (!this.provider) {
      throw new Error('Provider not initialized.')
    }

    try {
      const updatedRawTxPayload =
        setOptionalTransactionPayloadArgs(rawTxPayload)

      validateRawTxPayload(updatedRawTxPayload)

      const rawTransaction = await this.provider.createRawTransactionData(
        updatedRawTxPayload
      )

      const chainIdResult = await this.getChainId()
      if (!chainIdResult) {
        throw new Error('Failed to retrieve chainId.')
      }
      const { chainId } = chainIdResult

      const params: SendTransactionParams = {
        data: rawTransaction,
        from: updatedRawTxPayload[0], // senderAddr
        to: updatedRawTxPayload[2], // moduleAddr
        chainId,
        value: value
      }

      const txHash = await this.sendTransaction(params)
      if (!txHash) {
        throw new Error(
          'Sending transaction failed, please check wallet for error'
        )
      }

      return txHash
    } catch (error) {
      console.error('Error in signAndSendTransaction:', error)
      throw error
    }
  }

  /**
   * Partially verified function. Needs more input from the StarKey team.
   *
   * A higher-level signing function that performs the signing and verification logic.
   * This abstracts away the raw signing process and handles Uint8Array conversion.
   * @param {SignMessageParams} params - The message and nonce to be signed.
   * @returns {Promise<{ verified: boolean, response: SignMessageResponse }>}
   */
  async signMessage(
    params: SignMessageParams
  ): Promise<{ verified: boolean; response: SignMessageResponse }> {
    if (!params.message) {
      throw new Error('Message not provided.')
    }
    const message = '0x' + Buffer.from(params.message, 'utf8').toString('hex')
    const response = await this.signMessageRaw({
      message,
      nonce: params.nonce || generateNonce(message)
    })

    if (response) {
      const { publicKey, signature } = response
      const sign = remove0xPrefix(signature)
      const key = remove0xPrefix(publicKey)

      const signUint8Array = Uint8Array.from(Buffer.from(sign, 'hex'))
      const keyUint8Array = Uint8Array.from(Buffer.from(key, 'hex'))

      const verified = nacl.sign.detached.verify(
        new TextEncoder().encode(params.message),
        signUint8Array,
        keyUint8Array
      )

      return { verified, response }
    }

    throw new Error('Signing failed, no response received.')
  }

  /**.
   *
   * @param {RawTxObject} params - Raw Transaction Data
   * @returns {Promise<string>} The raw transaction data.
   * @throws Will throw an error if the provider is not initialized.
   */
  async createRawTransactionData(params: RawTxPayload): Promise<string> {
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.createRawTransactionData(params)
  }

  /**
   * Undocumented function. Needs more input from the StarKey team.
   *
   * @param {any} params - Undocumented parameters. Refer to documentation or contact support for details.
   * @returns {Promise<any>} The transaction result.
   * @throws Will throw an error if the provider is not initialized.
   */
  async waitForTransactionWithResult_undocumented(params: any): Promise<any> {
    console.warn(
      'waitForTransactionWithResult is undocumented. Please refer to the starkey documentation or contact starkey support for more details.'
    )
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.waitForTransactionWithResult(params)
  }

  /**
   * Retrieves the balance of the connected account.
   * @returns {Promise<Balance>} The balance details.
   * @throws Will throw an error if the provider is not initialized.
   */
  async getBalance(): Promise<Balance> {
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.balance()
  }

  /**
   * Retrieves the version of the Starkey Provider.
   * @returns {Promise<string>} The version string.
   * @throws Will throw an error if Starkey is not available.
   */
  async getVersion(): Promise<string> {
    if (!window.starkey) throw new Error('StarKey not available')
    return await window.starkey.getVersion()
  }

  /**
   * Changes the network chain.
   * @param {string} chainId - The chain ID to switch to.
   * @returns {Promise<{ chainId: string }>} The new chain ID.
   * @throws Will throw an error if the provider is not initialized.
   */
  async changeNetwork(chainId: string): Promise<{ chainId: string }> {
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.changeNetwork({ chainId })
  }

  /**
   * Prompts the user to install the StarKey Supra wallet.
   */
  promptInstall(): void {
    window.open('https://starkey.app/', '_blank')
  }

  /**
   * Registers a callback for account changes.
   * @param {(accounts: string[]) => void} callback - The callback function.
   */
  onAccountChanged(callback: (accounts: string[]) => void): void {
    this._accountChangedCallbacks.push(callback)
  }

  /**
   * Registers a callback for disconnect events.
   * @param {(info: any) => void} callback - The callback function.
   */
  onDisconnect(callback: (info: any) => void): void {
    this._disconnectCallbacks.push(callback)
  }

  /**
   * Registers a callback for network changes.
   * @param {(networkInfo: { chainId: string }) => void} callback - The callback function.
   */
  onNetworkChanged(callback: (networkInfo: { chainId: string }) => void): void {
    this._networkChangedCallbacks.push(callback)
  }

  /**
   * Handles account changes by invoking registered callbacks.
   * @private
   * @param {string[]} accounts - The new list of accounts.
   */
  private _handleAccountChanged(accounts: string[]): void {
    for (const cb of this._accountChangedCallbacks) {
      cb(accounts)
    }
  }

  /**
   * Handles disconnect events by invoking registered callbacks.
   * @private
   * @param {any} info - Information about the disconnect event.
   */
  private _handleDisconnect(info: any): void {
    for (const cb of this._disconnectCallbacks) {
      cb(info)
    }
  }

  /**
   * Handles network changes by invoking registered callbacks.
   * @private
   * @param {{ chainId: string }} networkInfo - Information about the new network.
   */
  private _handleNetworkChanged(networkInfo: { chainId: string }): void {
    for (const cb of this._networkChangedCallbacks) {
      cb(networkInfo)
    }
  }
}

export const ssc = new SupraStarkeyConnect()
ssc.init()
