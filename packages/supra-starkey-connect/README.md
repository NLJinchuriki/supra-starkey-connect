# Supra Starkey Connect (Unofficial)

**supra-starkey-connect** is a TypeScript-based library that provides a robust and type-safe wrapper around the StarKey Supra wallet provider. It simplifies the integration of Supra Blockchain wallet functionalities into your web applications, enabling seamless interactions such as connecting wallets, sending transactions, signing messages, and handling network changes.

For an overview of the entire monorepo and example applications, please refer to the [MONOREPO README](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/README.md).

## Features

- **Type Safety**: Leveraging TypeScript to ensure type-safe interactions with the StarKey Supra provider.
- **Event Handling**: Simplified event listeners for account changes, disconnections, and network changes.
- **Multiple Build Formats**: Supports ESM, CJS, and IIFE builds to cater to different environments.
- **Comprehensive Methods**: Includes methods for connecting, disconnecting, sending transactions, signing messages, and more.
- **Undocumented Methods Support**: Exposes additional methods that are currently undocumented by StarKey, with the intention to support them fully once more information is available.

## Installation

As part of a monorepo, `supra-starkey-connect` is managed via workspace dependencies. To install it within your project:

```bash
pnpm install
```

Ensure that your project is part of the monorepo workspace as defined in the `pnpm-workspace.yaml`.

## Usage

Import the library into your project:

```typescript
import { ssc } from 'supra-starkey-connect'

// Connect to the wallet
const account = await ssc.connect()
```

For detailed examples and integration guides, refer to the [React Example App](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/react-example-app/README.md) and the [https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/vanilla-example-app/README.md](../vanilla-example-app/README.md).

## API

The `supra-starkey-connect` library exposes a comprehensive API to interact with the StarKey Supra wallet provider. Below is an overview of the available interfaces and methods, complete with examples for each function.

### Interfaces

#### `SendTransactionParams`

Parameters for sending a transaction.

```typescript
export interface SendTransactionParams {
  from: string
  to: string
  value: string | number
  data?: string
}
```

**Example:**

```typescript
const transaction = {
  from: '0xYourAccountAddress',
  to: '0xRecipientAddress',
  value: '100000000', // Value in smallest unit
  data: '0x' // Optional data payload
}

const txHash = await ssc.sendTransaction(transaction)
console.log(`Transaction Hash: ${txHash}`)
```

#### `Balance`

Represents the balance information.

```typescript
export interface Balance {
  balance: number
  formattedBalance: string
  decimal: number
  displayUnit: string
}
```

**Example:**

```typescript
const balance = await ssc.getBalance()
console.log(`Balance: ${balance.formattedBalance} ${balance.displayUnit}`)
```

### Methods

#### `isStarKeyAvailable()`

Checks if the Starkey Provider is available in the current environment.

```typescript
isStarKeyAvailable(): boolean
```

**Example:**

```typescript
if (ssc.isStarKeyAvailable()) {
  console.log('Supra Wallet is available.')
} else {
  console.log('Supra Wallet is not available.')
}
```

#### `connect()`

Connects to the Supra wallet and retrieves the first account.

```typescript
async connect(): Promise<string>
```

**Example:**

```typescript
const account = await ssc.connect()
console.log(`Connected Account: ${account}`)
```

#### `disconnect()`

Disconnects from the Supra wallet.

```typescript
async disconnect(): Promise<void>
```

**Example:**

```typescript
await ssc.disconnect()
console.log('Disconnected from Supra Wallet.')
```

#### `isConnected()`

Checks if there are any connected accounts.

```typescript
async isConnected(): Promise<boolean>
```

**Example:**

```typescript
const connected = await ssc.isConnected()
console.log(`Is Connected: ${connected}`)
```

#### `getAllAccounts()`

Retrieves all connected accounts.

```typescript
async getAllAccounts(): Promise<string[] | null>
```

**Example:**

```typescript
const accounts = await ssc.getAllAccounts()
console.log(`All Accounts: ${accounts?.join(', ')`)
```

#### `getCurrentAccount()`

Retrieves the current connected account.

```typescript
async getCurrentAccount(): Promise<string | null>
```

**Example:**

```typescript
const currentAccount = await ssc.getCurrentAccount()
console.log(`Current Account: ${currentAccount}`)
```

#### `getCurrentNetwork()`

Retrieves the current network.

```typescript
async getCurrentNetwork(): Promise<string | null>
```

**Example:**

```typescript
const network = await ssc.getCurrentNetwork()
console.log(`Current Network: ${network || 'None'}`)
```

#### `getChainId()`

Retrieves the chain ID of the current network.

```typescript
async getChainId(): Promise<{ chainId: string } | null>
```

**Example:**

```typescript
const chainId = await ssc.getChainId()
console.log(`Chain ID: ${chainId?.chainId}`)
```

#### `sendTransaction(tx: SendTransactionParams)`

Sends a transaction.

```typescript
async sendTransaction(tx: SendTransactionParams): Promise<string>
```

**Example:**

```typescript
const transaction = {
  from: '0xYourAccountAddress',
  to: '0xRecipientAddress',
  value: '100000000'
}

const txHash = await ssc.sendTransaction(transaction)
console.log(`Transaction Hash: ${txHash}`)
```

#### `signMessage_undocumented(params: any)`

**Undocumented Function**

Signs a message. This function is currently undocumented by StarKey. We will provide full support once more information is available from StarKey.

```typescript
async signMessage_undocumented(params: any): Promise<string>
```

**Example:**

```typescript
try {
  const signature = await ssc.signMessage_undocumented('Hello, Supra!')
  console.log(`Signature: ${signature}`)
} catch (error) {
  console.error(`Sign Message Error: ${error.message}`)
}
```

#### `waitForTransactionWithResult_undocumented(params: any)`

**Undocumented Function**

Waits for a transaction with result. This function is currently undocumented by StarKey. We will provide full support once more information is available from StarKey.

```typescript
async waitForTransactionWithResult_undocumented(params: any): Promise<any>
```

**Example:**

```typescript
try {
  const result = await ssc.waitForTransactionWithResult_undocumented({
    txHash: '0xTransactionHash'
  })
  console.log(`Transaction Result:`, result)
} catch (error) {
  console.error(`Wait For Transaction Error: ${error.message}`)
}
```

#### `createRawTransactionData_undocumented(params: any)`

**Undocumented Function**

Creates raw transaction data. This function is currently undocumented by StarKey. We will provide full support once more information is available from StarKey.

```typescript
async createRawTransactionData_undocumented(params: any): Promise<any>
```

**Example:**

```typescript
try {
  const rawData = await ssc.createRawTransactionData_undocumented({
    from: '0xYourAccount',
    to: '0xRecipient',
    value: '1000000'
  })
  console.log(`Raw Transaction Data:`, rawData)
} catch (error) {
  console.error(`Create Raw Transaction Data Error: ${error.message}`)
}
```

#### `getBalance()`

Retrieves the balance of the connected account.

```typescript
async getBalance(): Promise<Balance>
```

**Example:**

```typescript
const balance = await ssc.getBalance()
console.log(`Balance: ${balance.formattedBalance} ${balance.displayUnit}`)
```

#### `getVersion()`

Retrieves the version of the Starkey Provider.

```typescript
async getVersion(): Promise<string>
```

**Example:**

```typescript
const version = await ssc.getVersion()
console.log(`Starkey Provider Version: ${version}`)
```

#### `changeNetwork(chainId: string)`

Changes the network chain.

```typescript
async changeNetwork(chainId: string): Promise<{ chainId: string }>
```

**Example:**

```typescript
const newChain = '6'
const result = await ssc.changeNetwork(newChain)
console.log(`Network changed to Chain ID: ${result.chainId}`)
```

#### `promptInstall()`

Prompts the user to install the StarKey Supra wallet.

```typescript
promptInstall(): void
```

**Example:**

```typescript
ssc.promptInstall()
```

#### `onAccountChanged(callback: (accounts: string[]) => void)`

Registers a callback for account changes.

```typescript
onAccountChanged(callback: (accounts: string[]) => void): void
```

**Example:**

```typescript
ssc.onAccountChanged((accounts) => {
  console.log(`Accounts Changed: ${accounts.join(', ')}`)
})
```

#### `onDisconnect(callback: (info: any) => void)`

Registers a callback for disconnect events.

```typescript
onDisconnect(callback: (info: any) => void): void
```

**Example:**

```typescript
ssc.onDisconnect((info) => {
  console.log('Disconnected:', info)
})
```

#### `onNetworkChanged(callback: (networkInfo: { chainId: string }) => void)`

Registers a callback for network changes.

```typescript
onNetworkChanged(callback: (networkInfo: { chainId: string }) => void): void
```

**Example:**

```typescript
ssc.onNetworkChanged((networkInfo) => {
  console.log(`Network Changed to Chain ID: ${networkInfo.chainId}`)
})
```

## Undocumented Methods

The `supra-starkey-connect` library currently exposes several methods that are **undocumented** by StarKey. These methods have been included based on existing functionality and observed behavior, but their full capabilities and usage details are not officially provided. We are committed to supporting these methods fully once more comprehensive API documentation is available from StarKey.

### List of Undocumented Methods

- **`signMessage_undocumented(params: any): Promise<string>`**
- **`waitForTransactionWithResult_undocumented(params: any): Promise<any>`**
- **`createRawTransactionData_undocumented(params: any): Promise<any>`**

**Note:** Use these methods with caution, as their behavior may change without notice. We recommend monitoring StarKey's official channels for updates and additional documentation regarding these functions.

## Development

### Building the Library

To build the library, run:

```bash
pnpm build
```

This command will compile the TypeScript code and generate the necessary build outputs in ESM, CJS, and IIFE formats.

## Documentation

Comprehensive documentation is available within the codebase and through example applications. For a quick start, refer to the example apps included in this monorepo.

## Contributing

Contributions are highly appreciated! Please ensure that your code adheres to the existing style and includes relevant tests. If you wish to add support for the undocumented methods, please coordinate with the StarKey team to ensure compatibility and stability.

## License

This project is licensed under the [MIT License](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/LICENSE).
