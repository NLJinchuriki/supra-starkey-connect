# Supra Starkey Connect (Unofficial)

**supra-starkey-connect** is a TypeScript-based library that provides a robust and type-safe wrapper around the StarKey Supra wallet provider. It simplifies the integration of Supra Blockchain wallet functionalities into your web applications, enabling seamless interactions such as connecting wallets, sending transactions, signing messages, and handling network changes.

For an overview of the entire monorepo and example applications, please refer to the [MONOREPO README](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/README.md).

## Features

- **Type Safety**: Leveraging TypeScript to ensure type-safe interactions with the StarKey Supra provider.
- **Event Handling**: Simplified event listeners for account changes, disconnections, and network changes.
- **Multiple Build Formats**: Supports ESM, CJS, and (BROWSER) builds to cater to different environments.
- **Comprehensive Methods**: Includes methods for connecting, disconnecting, sending transactions, signing messages, and more.
- **Undocumented Methods Support**: Exposes additional methods that are currently undocumented by StarKey, with the intention to support them fully once more information is available.

**Vanilla JS supra-starkey-connect features demo**: [Live Demo on vercel](https://supra-starkey-connect-vanilla.vercel.app)

## Installation

To install supra-starkey-connect within your project:

```bash
npm install supra-starkey-connect
# or
pnpm add supra-starkey-connect
```

**For Browser (Vanilla JavaScript)**

(You can use the browser-friendly build provided by the library via a CDN)

```typescript
<script src="https://unpkg.com/supra-starkey-connect/dist/browser.iife.js"></script>
```

## Usage

Import the library into your project:

```typescript
import { ssc } from 'supra-starkey-connect'

// Connect to the wallet
const account = await ssc.connect()
```

For detailed examples and integration guides, refer to the [React Example App](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/react-example-app/README.md) and the [Vanilla Example](<[../vanilla-example-app/README.md](https://github.com/NLJinchuriki/supra-starkey-connect/blob/master/packages/vanilla-example-app/README.md)>).

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

#### `getBalance()`

```typescript
interface Balance {
  balance: number
  formattedBalance: string
  decimal: number
  displayUnit: string
}
```

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

**Higher Order Component (HoC)**

The `signMessage` function is a **Higher Order Component (HoC)** wrapped around the `signMessageRaw` method. It simplifies and abstracts the signing process provided by the StarKey wallet's window provider. The function prepares the message and nonce internally, making it more convenient to use.

Key responsibilities:

1. Preparing the message into a compatible format.
2. Generating a nonce (if not provided) using the `generateNonce` utility.
3. Removing the `0x` prefix from hexadecimal strings using the `remove0xPrefix` utility.
4. Delegating the signing operation to the `signMessageRaw` method, which directly interacts with the window provider.

```typescript
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
```

```typescript
async signMessage(params: SignMessageParams): Promise<{ verified: boolean; response: SignMessageResponse }>
```

**Utilities Used Internally:**

1. **`remove0xPrefix(value: string): string`**
   Removes the `0x` prefix from a hexadecimal string, if it exists.

2. **`generateNonce(message: string): string`**
   Generates a random nonce using `tweetnacl`'s `randomBytes`. This ensures unique signing for each message. If no nonce is provided, it generates one.

**Example Usage:**

```typescript
try {
  const params = {
    message: 'Hello, Supra!',
  }
  const response = await ssc.signMessage(params)
  console.log(reponse) - outputs: SignMessageResponse
} catch (error) {
  console.error(`Sign Message Error: ${error.message}`)
}
```

### How It Works

1. **Prepares the Message:** Converts the string message to a hex format.
2. **Handles Nonce:** Generates a random nonce if none is provided by the user.
3. **Uses Utilities:** Applies `remove0xPrefix` to ensure a clean hex format.
4. **Delegates to `signMessageRaw`:** Passes the processed message and nonce to the `signMessageRaw` method for signing.
5. **Returns:** Provides both the response from the signing function and a verification status (if applicable).

---

#### `signAndSendTransaction(rawTxPayload: RawTxPayload, value?: string | number): Promise<string>`

**Higher Order Component (HoC)**

The `signAndSendTransaction` function is a **Higher Order Component (HoC)** designed to streamline the process of signing and sending raw transactions through the StarKey wallet. This method ensures that transactions are properly constructed, validated, and dispatched in a type-safe and reliable manner. By abstracting the complexities involved in transaction handling, it provides developers with a seamless interface for interacting with the Supra Blockchain.

**Function Signature:**

```typescript
async signAndSendTransaction(
  rawTxPayload: RawTxPayload,
  value: string | number = ''
): Promise<string>
```

**Parameters:**

- **`rawTxPayload: RawTxPayload`**  
  An array representing the raw transaction payload. This array must adhere to the `RawTxPayload` type, ensuring that all necessary fields are correctly formatted and typed.

- **`value?: string | number`**  
  (Optional) The value to send with the transaction. Defaults to an empty string (`''`) if not provided.

**`RawTxPayload` Type Definition:**

```typescript
type RawTxPayload = [
  string, // senderAddr
  number, // senderSequenceNumber
  string, // moduleAddr
  string, // moduleName
  string, // functionName
  TxnBuilderTypes.TypeTag[], // functionTypeArgs
  Uint8Array[], // functionArgs
  OptionalTransactionPayloadArgs? // optionalTransactionPayloadArgs
]

interface OptionalTransactionPayloadArgs {
  maxGas?: number
  gasUnitPrice?: number
  txExpiryTime?: number
}
```

**Example Usage:**

```typescript
import { ssc, BCS, RawTxPayload } from 'supra-starkey-connect'

// Define transaction parameters
const slotId: bigint = BigInt(4)
const coins: bigint = BigInt(0)
const referencePrice: bigint = BigInt(0)
const txExpiryTime: number = Math.ceil(Date.now() / 1000) + 30 // 30 seconds from now

// Construct the RawTxPayload array example 1
const rawTxPayload: RawTxPayload = [
  '0xYourSenderAddress', // senderAddr
  0, // senderSequenceNumber
  '0xModuleAddress', // moduleAddr
  'slot_prediction', // moduleName
  'create_prediction', // functionName
  [], // functionTypeArgs
  [
    BCS.bcsSerializeU256(slotId), // functionArgs[0]
    BCS.bcsSerializeUint64(coins), // functionArgs[1]
    BCS.bcsSerializeUint64(referencePrice) // functionArgs[2]
  ],
  { txExpiryTime } // optionalTransactionPayloadArgs ( will fallback to defaults if not set (internal step 3 ) )
]

// Construct the RawTxPayload array example 2
const rawTxPayload: RawTxPayload = [
  account,
  0,
  '0000000000000000000000000000000000000000000000000000000000000001',
  'supra_account',
  'transfer',
  [],
  [
    new HexString(
      '0x782608dff0ebf604f708cb4ce8b4ae43c03af7587093579267da4b20df146b40'
    ).toUint8Array(),
    BCS.bcsSerializeUint64(100000000)
  ]
]

// Sign and send the transaction
try {
  const txHash = await ssc.signAndSendTransaction(rawTxPayload, '100000000')
  console.log(`Transaction sent successfully! Hash: ${txHash}`)
} catch (error) {
  console.error(`Transaction failed: ${error.message}`)
}
```

**How It Works on the inside:**

1. **Parameter Preparation:**

   - **`rawTxPayload`:**  
     The function expects a `RawTxPayload` array containing all necessary transaction details. Each element of the array must conform to the specified types, ensuring that the transaction is well-formed.

   - **`value`:**  
     An optional parameter representing the value to be sent with the transaction. If not provided, it defaults to an empty string. (We don't know what this value is for, ask Starkey)

2. **Validation with Zod:**

   ```typescript
   validateRawTxPayload(rawTxPayload)
   ```

   - The `rawTxPayload` is validated against a predefined Zod schema (`RawTxPayloadArraySchema`). This validation ensures that all elements of the payload are correctly typed and adhere to the expected formats.

   - **Zod Schema Used for validating:**

     ```typescript
     import { z } from 'zod'

     export const OptionalTransactionPayloadArgsSchema = z.object({
       maxGas: z.number().optional(),
       gasUnitPrice: z.number().optional(),
       txExpiryTime: z.number().optional()
     })

     export const RawTxPayloadArraySchema: z.ZodType<RawTxPayload> = z.tuple([
       z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid senderAddr'),
       z.number().nonnegative('senderSequenceNumber must be non-negative'),
       z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid moduleAddr'),
       z.string().min(1, 'moduleName cannot be empty'),
       z.string().min(1, 'functionName cannot be empty'),
       z.array(z.instanceof(TxnBuilderTypes.TypeTag)),
       z.array(z.instanceof(Uint8Array)),
       OptionalTransactionPayloadArgsSchema.optional()
     ])
     ```

   - If validation fails, a `ZodError` is thrown, detailing the discrepancies in the payload structure.

3. **Setting Optional Transaction Payload Arguments:**

   - The function utilizes the `setOptionalTransactionPayloadArgs` utility to ensure that all optional parameters (`maxGas`, `gasUnitPrice`, `txExpiryTime`) are set. If any optional arguments are not provided, default values are assigned.

     ```typescript
     const updatedRawTxPayload = setOptionalTransactionPayloadArgs(rawTxPayload)
     ```

4. **Creating Raw Transaction Data:**

   - Upon successful validation, the function calls the provider's `createRawTransactionData` method to generate the raw transaction data string. This method translates the structured payload into a format suitable for blockchain submission.

     ```typescript
     const rawTransaction = await this.provider.createRawTransactionData(
       updatedRawTxPayload
     )
     ```

5. **Fetching Chain ID:**

   - The function retrieves the current `chainId` using the `getChainId` method. This ID is essential for ensuring that the transaction is broadcasted to the correct blockchain network.

     ```typescript
     const chainIdResult = await this.getChainId()
     if (!chainIdResult) {
       throw new Error('Failed to retrieve chainId.')
     }
     const { chainId } = chainIdResult
     ```

6. **Constructing Transaction Parameters:**

   - A `SendTransactionParams` object is created, encapsulating all necessary details for the transaction, including the sender and recipient addresses, the raw transaction data, the `chainId`, and the optional `value`.

     ```typescript
     const params: SendTransactionParams = {
       data: rawTransaction,
       from: updatedRawTxPayload[0], // senderAddr
       to: updatedRawTxPayload[2], // moduleAddr
       chainId,
       value: value
     }
     ```

7. **Sending the Transaction:**

   - The constructed `params` object is passed to the `sendTransaction` method, which dispatches the transaction to the blockchain network.

     ```typescript
     const txHash = await this.sendTransaction(params)
     if (!txHash) {
       throw new Error(
         'Sending transaction failed, please check wallet for error'
       )
     }
     return txHash
     ```

8. **Handling Responses and Errors:**

   - If the transaction is successfully sent, the function returns the transaction hash (`txHash`), allowing developers to track the transaction status on the blockchain.

   - In case of failures during any of the steps (validation, data creation, sending), appropriate error messages are logged, and the errors are propagated to be handled by the calling context.

---

### Event listeners

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

- **`signMessage(params: SignMessageParams): Promise<SignMessageResponse>`**
- **`waitForTransactionWithResult_undocumented(params: any): Promise<any>`**
- **`createRawTransactionData_undocumented(params: any): Promise<any>`**

**Note:** Use these methods with caution, as their behavior may change without notice. We recommend monitoring StarKey's official channels for updates and additional documentation regarding these functions.

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

Certainly! Below is the updated **Utilities** section for your README. This version removes the `generateNonce` and `setOptionalTransactionPayloadArgs` utilities and adds comprehensive details about the `BCS` (Binary Canonical Serialization) utilities. Additionally, it includes a note stating that the `BCS` utilities are originally from the Aptos Core library but have been abstracted to remove the dependency on the now-deprecated Aptos Core library. This section aligns with the existing style of your README and provides clear descriptions along with usage examples for each utility.

---

## Utilities

In addition to the core functionalities, `supra-starkey-connect` offers a set of utility functions and classes that facilitate common tasks related to hexadecimal string manipulation and transaction payload validation. These utilities enhance the developer experience by providing easy-to-use tools for handling data transformations and ensuring data integrity.

### `HexString`

A versatile class for managing hexadecimal strings and converting between hexadecimal strings and byte arrays.

**Features:**

- **Initialization:** Automatically prefixes hexadecimal strings with `0x` if not already present.
- **Conversion Methods:**
  - `fromUint8Array(bytes: Uint8Array): HexString`  
    Creates a `HexString` instance from a `Uint8Array`.
  - `toUint8Array(): Uint8Array`  
    Converts the hexadecimal string back to a `Uint8Array`.
- **String Retrieval:**
  - `hex(): string`  
    Retrieves the full hexadecimal string with the `0x` prefix.
  - `noPrefix(): string`  
    Retrieves the hexadecimal string without the `0x` prefix.

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

### `remove0xPrefix`

A utility function that removes the `0x` prefix from a hexadecimal string if it exists. This is particularly useful for normalizing hexadecimal inputs.

**Signature:**

```typescript
remove0xPrefix(value: string): string
```

**Example Usage:**

```typescript
import { remove0xPrefix } from 'supra-starkey-connect'

const cleanHex = remove0xPrefix('0xabcdef') // 'abcdef'
const sameHex = remove0xPrefix('abcdef') // 'abcdef'

console.log(cleanHex) // 'abcdef'
console.log(sameHex) // 'abcdef'
```

### `validateRawTxPayload`

Validates a `RawTxPayload` against the predefined Zod schema to ensure that all required fields are correctly formatted and typed. If the validation fails, it throws a `ZodError` with detailed information about the discrepancies.

**Signature:**

```typescript
validateRawTxPayload(rawTxPayload: RawTxPayload): void
```

**Example Usage:**

```typescript
import { validateRawTxPayload } from 'supra-starkey-connect'
import { ZodError } from 'zod'

const rawTxPayload = [
  '0xSenderAddressHere',
  1,
  '0xModuleAddressHere',
  'ModuleName',
  'FunctionName',
  [], // functionTypeArgs
  [new Uint8Array()], // functionArgs
  { maxGas: 500000, gasUnitPrice: 2, txExpiryTime: 1700000000 }
]

try {
  validateRawTxPayload(rawTxPayload)
  console.log('RawTxPayload is valid.')
} catch (error) {
  if (error instanceof ZodError) {
    console.error('Validation failed:', error.errors)
  } else {
    console.error('An unexpected error occurred:', error)
  }
}
```

### `BCS` (Binary Canonical Serialization)

The `BCS` utilities are originally from the **Aptos Core** library but have been **abstracted** to remove the dependency on the now-deprecated Aptos Core library. This ensures that `supra-starkey-connect` remains lightweight and free from deprecated dependencies while providing robust serialization and deserialization capabilities.

`BCS` provides utilities for serializing and deserializing data structures using the Binary Canonical Serialization format. This is essential for preparing data to be sent over the blockchain and interpreting responses.

**Features:**

- **Serialization:** Convert various data types into a binary format suitable for blockchain transactions.
- **Deserialization:** Parse binary data received from the blockchain into usable data structures.

**Example Usage:**

```typescript
import { BCS, HexString } from 'supra-starkey-connect'

// Example: Serializing a uint64 value
const serializedU64 = BCS.bcsSerializeUint64(1311768467750121216)
console.log(serializedU64) // Uint8Array(8) [0, 239, 205, 171, 120, 86, 52, 18]

// Example: Deserializing a uint64 value
const deserializer = new BCS.Deserializer(serializedU64)
const deserializedU64 = deserializer.deserializeU64()
console.log(deserializedU64) // 1311768467750121216n

// Example: Serializing a string
const serializedStr = BCS.bcsSerializeStr('Hello, Supra!')
console.log(serializedStr) // Uint8Array([...])

// Example: Deserializing a string
const deserializerStr = new BCS.Deserializer(serializedStr)
const deserializedStr = deserializerStr.deserializeStr()
console.log(deserializedStr) // "Hello, Supra!"

// Example: Using HexString with BCS
const hex = new HexString('abcdef')
const serializedHex = BCS.bcsSerializeBytes(hex.toUint8Array())
console.log(serializedHex) // Uint8Array([...])

const deserializerHex = new BCS.Deserializer(serializedHex)
const deserializedHexBytes = deserializerHex.deserializeBytes()
const deserializedHexString = new HexString(
  Buffer.from(deserializedHexBytes).toString('hex')
)
console.log(deserializedHexString.hex()) // '0xabcdef'
```

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
