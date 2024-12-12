import { StarkeyProvider, SendTransactionParams, Balance } from './types'

/**
 * A class that provides a wrapper around the StarKey Supra wallet provider.
 */
export class SupraStarkeyConnect {
  private provider: StarkeyProvider | null = null
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
   * Undocumented function. Needs more input from the StarKey team.
   *
   * @param {any} params - Undocumented parameters. Refer to documentation or contact support for details.
   * @returns {Promise<string>} The signed message.
   * @throws Will throw an error if the provider is not initialized.
   */
  async signMessage_undocumented(params: any): Promise<string> {
    console.warn(
      'signMessage_undocumented is undocumented. Please refer to the starkey documentation or contact starkey support for more details.'
    )
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.signMessage(params)
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
      'waitForTransactionWithResult_undocumented is undocumented. Please refer to the starkey documentation or contact starkey support for more details.'
    )
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.waitForTransactionWithResult(params)
  }

  /**
   * Undocumented function. Needs more input from the StarKey team.
   *
   * @param {any} params - Undocumented parameters. Refer to documentation or contact support for details.
   * @returns {Promise<any>} The raw transaction data.
   * @throws Will throw an error if the provider is not initialized.
   */
  async createRawTransactionData_undocumented(params: any): Promise<any> {
    console.warn(
      'createRawTransactionData_undocumented is undocumented. Please refer to the starkey documentation or contact starkey support for more details.'
    )
    if (!this.provider) throw new Error('Provider not initialized')
    return await this.provider.createRawTransactionData(params)
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
export * from './types'
export default ssc
