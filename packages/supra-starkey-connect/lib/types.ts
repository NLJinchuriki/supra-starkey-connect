/**
 * Parameters for sending a transaction.
 */
export interface SendTransactionParams {
  from: string
  to: string
  value: string | number
  data?: string
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

/**
 * Defines the StarkeyProvider interface.
 */
export interface StarkeyProvider {
  connect(): Promise<string[]>
  disconnect(): Promise<void>
  account(): Promise<string[]>
  currentNetwork: string
  getChainId(): Promise<{ chainId: string }>
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
   * Undocumented method. Parameters can be any object.
   * @param params - Undocumented parameters. Refer to documentation or contact starKey support for details.
   */
  waitForTransactionWithResult(params: any): Promise<any>

  /**
   * Undocumented method. Parameters can be any object.
   * @param params - Undocumented parameters. Refer to documentation or contact starKey support for details.
   */
  createRawTransactionData(params: any): Promise<any>

  balance(): Promise<Balance>
  getVersion(): Promise<string>
  changeNetwork(options: { chainId: string }): Promise<{ chainId: string }>

  on(event: 'accountChanged', handler: (accounts: string[]) => void): void
  on(event: 'disconnect', handler: (info: any) => void): void
  on(
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
