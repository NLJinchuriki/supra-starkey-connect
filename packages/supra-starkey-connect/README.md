# Supra Starkey Connect (Unofficial)

**supra-starkey-connect** is a TypeScript-based library that provides a robust and type-safe wrapper around the StarKey Supra wallet provider. It simplifies the integration of Supra Blockchain wallet functionalities into your web applications, enabling seamless interactions such as connecting wallets, sending transactions, signing messages, and handling network changes.

**This version** introduces improvements that resolve specific Server-Side Rendering (SSR) issues and adopts the `getSupraStarkeyConnect` method for enhanced functionality.

For an overview of the entire monorepo and example applications, please refer to the [MONOREPO README](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/README.md).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Interfaces](#interfaces)
  - [Methods](#methods)
- [Undocumented Methods](#undocumented-methods)
- [Utilities](#utilities)
  - [Utility Functions](#utility-functions)
  - [BuilderTypes](#buildertypes)
  - [Types](#types)
- [Development](#development)
- [Example Applications](#example-applications)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Type Safety**: Leveraging TypeScript to ensure type-safe interactions with the StarKey Supra provider.
- **Event Handling**: Simplified event listeners for account changes, disconnections, and network changes.
- **Multiple Build Formats**: Supports ESM, CJS, and Browser (IIFE) builds to cater to different environments.
- **Comprehensive Methods**: Includes methods for connecting, disconnecting, sending transactions, signing messages, and more.
- **SSR Enhancements**: Version 1.0.9 and up addresses specific SSR issues, ensuring better compatibility with server-rendered applications.
- **Utility Functions**: Provides utilities like `HexString`, `remove0xPrefix`, and `sleep` for common tasks.
- **BuilderTypes**: Exports `BuilderTypes` for constructing transaction payloads and other blockchain-related data structures.
- **Undocumented Methods Support**: Exposes additional methods currently undocumented by StarKey, with plans for full support as documentation becomes available.

**REACTJS supra-starkey-connect Features Demo**: [React Live Demo on Vercel](https://supra-starkey-connect-react.vercel.app)
**REACT NEXTJS supra-starkey-connect Features Demo**: [React NextJS Live Demo on Vercel](https://supra-starkey-connect-reactnextjs.vercel.app)
**Vanilla JS supra-starkey-connect Features Demo**: [Vanilla JS Live Demo on Vercel](https://supra-starkey-connect-vanilla.vercel.app)

## Installation

### NPM

```bash
npm install supra-starkey-connect
```

### PNPM

```bash
pnpm add supra-starkey-connect
```

### For Browser (Vanilla JavaScript)

You can use the browser-friendly build provided by the library via a CDN:

```html
<script src="https://unpkg.com/supra-starkey-connect/dist/browser.iife.js"></script>
```

## Usage

### Importing the Library

```typescript
import { getSupraStarkeyConnect } from 'supra-starkey-connect'

// Initialize the connection
const ssc = getSupraStarkeyConnect()

// Connect to the wallet
const account = await ssc.connect()
console.log(`Connected Account: ${account}`)
```

### Connecting to the Wallet

```typescript
import { getSupraStarkeyConnect } from 'supra-starkey-connect'

const ssc = getSupraStarkeyConnect()

async function connectWallet() {
  try {
    const account = await ssc.connect()
    console.log(`Connected Account: ${account}`)
  } catch (error) {
    console.error(`Connection Failed: ${error.message}`)
  }
}
```

For detailed examples and integration guides, refer to the [React Example App](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/react-example-app/README.md), [React Next.js Example App](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/react-nextjs-example/README.md), and the [Vanilla Example App](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/vanilla-example-app/README.md).

## API

The `supra-starkey-connect` library exposes a comprehensive API to interact with the StarKey Supra wallet provider. Below is an overview of the available interfaces and methods, complete with examples for each function.

### Interfaces

#### `SendTransactionParams`

Parameters for sending a transaction.

```typescript
interface SendTransactionParams {
  from: string
  to: string
  value: string | number
  data?: string
  chainId?: string
}
```

**Example:**

```typescript
const transaction = {
  from: '0xYourAccountAddress',
  to: '0xRecipientAddress',
  value: '100000000',
  data: '0x'
}

const txHash = await ssc.sendTransaction(transaction)
console.log(`Transaction Hash: ${txHash}`)
```

#### `Balance`

Represents the balance information.

```typescript
interface Balance {
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

#### `SignMessageParams`

Parameters for signing a message.

```typescript
interface SignMessageParams {
  message: string
  nonce?: string
}
```

#### `SignMessageResponse`

Represents the response from a signed message.

```typescript
interface SignMessageResponse {
  publicKey: string
  signature: string
  address: string
}
```

#### `RawTxPayload`

Defines the structure of a raw transaction payload.

```typescript
type RawTxPayload = [
  string, // sender address
  number, // sender sequence number
  string, // module address
  string, // module name
  string, // function name
  TypeTag[], // function type arguments
  Uint8Array[], // function arguments
  OptionalTransactionPayloadArgs? // optional transaction payload arguments
]
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
console.log(`All Accounts: ${accounts?.join(', ')}`)
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

#### `signMessage(params: SignMessageParams)`

Signs a message.

```typescript
async signMessage(params: SignMessageParams): Promise<{ verified: boolean; response: SignMessageResponse }>
```

**Example Usage:**

```typescript
try {
  const params = {
    message: 'Hello, Supra!'
  }
  const response = await ssc.signMessage(params)
  console.log(response) // Outputs: SignMessageResponse
} catch (error) {
  console.error(`Sign Message Error: ${error.message}`)
}
```

#### `signAndSendTransaction(rawTxPayload: RawTxPayload, value?: string | number): Promise<string>`

Signs and sends a raw transaction.

```typescript
async signAndSendTransaction(
  rawTxPayload: RawTxPayload,
  value: string | number = ''
): Promise<string>
```

**Example Usage:**

```typescript
import { HexString, BCS } from 'supra-starkey-connect'

// Define transaction parameters
const rawTxPayload: RawTxPayload = [
  '0xYourSenderAddress',
  0,
  '0xModuleAddress',
  'module_name',
  'function_name',
  [],
  [new HexString('0xabcdef').toUint8Array(), BCS.bcsSerializeUint64(100000000)]
]

try {
  const txHash = await ssc.signAndSendTransaction(rawTxPayload, '100000000')
  console.log(`Transaction sent successfully! Hash: ${txHash}`)
} catch (error) {
  console.error(`Transaction failed: ${error.message}`)
}
```

## Undocumented Methods

The `supra-starkey-connect` library currently exposes some methods that are **undocumented** by StarKey. These methods are included based on existing functionality and observed behavior, with plans for full support once more comprehensive API documentation is available.

### List of Undocumented Methods

**Note:** Use these methods with caution, as their behavior may change without notice.

#### `waitForTransactionWithResult(txHash: string)`

Waits for a transaction with a result.

```typescript
async waitForTransactionWithResult(txHash: string): Promise<any>
```

**Example:**

```typescript
try {
  const result = await ssc.waitForTransactionWithResult('0xTransactionHash')
  console.log(`Transaction Result:`, result)
} catch (error) {
  console.error(`Wait For Transaction Error: ${error.message}`)
}
```

#### `waitForTransactionCompletion (Alternative to undocumented function)`

Utility function that waits for a transaction to complete by polling its status at regular intervals
(will be deprecated when `waitForTransactionWithResult` is documented)

```typescript
async waitForTransactionCompletion(
  txHash: string,
  network?: string
): Promise<TransactionStatus>
```

**Example:**

```typescript
import {
  waitForTransactionCompletion,
  TransactionStatus
} from 'supra-starkey-connect'

const txHash = '0xYourTransactionHashHere'

waitForTransactionCompletion(txHash, 'mainnet')
  .then((status) => {
    if (status === TransactionStatus.Success) {
      console.log('Transaction completed successfully!')
    } else if (status === TransactionStatus.Failed) {
      console.log('Transaction failed.')
    } else {
      console.log('Transaction is still pending after maximum retries.')
    }
  })
  .catch((error) => {
    console.error('Error while waiting for transaction completion:', error)
  })
```

## Utilities

### Utility Functions

The `supra-starkey-connect` library offers a set of utility functions to facilitate common tasks related to hexadecimal string manipulation and transaction payload validation.

#### `HexString`

A versatile class for managing hexadecimal strings and converting between hexadecimal strings and byte arrays.

**Example Usage:**

```typescript
import { HexString } from 'supra-starkey-connect'

// Creating a HexString instance
const hex = new HexString('abcdef')

// Converting to Uint8Array
const bytes = hex.toUint8Array()
console.log(bytes) // Uint8Array(3) [ 171, 205, 239 ]

// Getting hex string with prefix
console.log(hex.hex()) // '0xabcdef'

// Getting hex string without prefix
console.log(hex.noPrefix()) // 'abcdef'

// Creating HexString from Uint8Array
const newHex = HexString.fromUint8Array(new Uint8Array([171, 205, 239]))
console.log(newHex.hex()) // '0xabcdef'
```

#### `remove0xPrefix`

Removes the `0x` prefix from a hexadecimal string if it exists.

**Example Usage:**

```typescript
import { remove0xPrefix } from 'supra-starkey-connect'

const cleanHex = remove0xPrefix('0xabcdef') // 'abcdef'
const sameHex = remove0xPrefix('abcdef') // 'abcdef'

console.log(cleanHex) // 'abcdef'
console.log(sameHex) // 'abcdef'
```

#### `sleep`

Delays execution for the specified time.

```typescript
/**
 * Delays execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified delay.
 */
```

**Example Usage:**

```typescript
import { sleep } from 'supra-starkey-connect'

async function delayedLog() {
  console.log('Wait for it...')
  await sleep(2000)
  console.log('Done!')
}

delayedLog()
// Output:
// Wait for it...
// (2 seconds later)
// Done!
```

### BuilderTypes

Exports `BuilderTypes` for constructing transaction payloads and other blockchain-related data structures.

**Example Usage:**

```typescript
import { TxnBuilderTypes } from 'supra-starkey-connect'

// Use TxnBuilderTypes to construct transaction payloads
const typeTag: TxnBuilderTypes.TypeTag = TxnBuilderTypes.TypeTagU64
```

### Types

The library defines several TypeScript types and interfaces to ensure type safety and clarity in interactions.

#### `TypeTag`

Represents various type tags used in transactions.

```typescript
export type TypeTag =
  | TypeTagBool
  | TypeTagU8
  | TypeTagU16
  | TypeTagU32
  | TypeTagU64
  | TypeTagU128
  | TypeTagU256
  | TypeTagAddress
  | TypeTagSigner
  | TypeTagVector
  | TypeTagStruct
```

#### `TransactionStatus`

Represents the status of a transaction.

```typescript
export enum TransactionStatus {
  Success = 'Success',
  Failed = 'Failed',
  Pending = 'Pending'
}
```

#### Additional Types and Interfaces

- **`OptionalTransactionPayloadArgs`**: Represents optional transaction options.
- **`SendTransactionParams`**: Parameters for sending a transaction.
- **`Balance`**: Represents balance information.
- **`SignMessageParams`**: Parameters for signing a message.
- **`SignMessageResponse`**: Represents the response from a signed message.
- **`RawTxPayload`**: Defines the structure of a raw transaction payload.
- **`StarkeyProvider` & `StarkeyProviderWithOff`**: Interfaces defining the Starkey wallet provider functionalities.
- **`StarkeyObject`**: Represents the Starkey object attached to the window.
- **`StructTag`**: Defines the structure of a blockchain struct.

For detailed type definitions, refer to the library's [TypeScript Definitions](./lib/types.ts).

## Development

### Building the Library

To build the library, run:

```bash
pnpm build
```

This command will compile the TypeScript code and generate the necessary build outputs in ESM, CJS, and IIFE formats.

### Running Tests

To run tests for the `supra-starkey-connect` library:

```bash
pnpm run test
```

Ensure that all tests pass to maintain code quality and reliability.

## Example Applications

This monorepo includes **four** example applications to demonstrate the integration and usage of `supra-starkey-connect` across different environments:

1. **React Example App (without Next.js)**
2. **React Next.js Example App**
3. **Vanilla JavaScript Example App**

Each example app provides unique insights and showcases various features of the `supra-starkey-connect` library. Refer to their respective READMEs for detailed instructions and usage examples.

## Contributing

Contributions are highly appreciated! Please ensure that your code adheres to the existing style and includes relevant tests. If you wish to add support for the undocumented methods, please coordinate with the StarKey team to ensure compatibility and stability.

## License

This project is licensed under the [MIT License](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/LICENSE).

```

```
