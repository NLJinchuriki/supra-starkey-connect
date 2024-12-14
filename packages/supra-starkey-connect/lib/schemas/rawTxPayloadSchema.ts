import { z } from 'zod'
import { RawTxPayload } from '../types'
import { TypeTagSchema } from '../schemas/builderTypesSchema'
import { OptionalTransactionPayloadArgsSchema } from '../schemas/optionalTransactionPayloadArgsSchema' // Assuming you have this

/**
 * Zod schema for validating RawTxPayloadArray.
 *
 * Ensures that each element in the RawTxPayloadArray adheres to the required type and format.
 * The schema defines a tuple with the following structure:
 *
 * 1. **senderAddr**: string - The sender's address in hexadecimal format, starting with '0x'.
 * 2. **senderSequenceNumber**: number - The sender's sequence number.
 * 3. **moduleAddr**: string - The module address in hexadecimal format, starting with '0x'.
 * 4. **moduleName**: string - The name of the module. Must be a non-empty string.
 * 5. **functionName**: string - The name of the function. Must be a non-empty string.
 * 6. **functionTypeArgs**: TxnBuilderTypes.TypeTag[] - An array of TypeTag instances representing the type arguments.
 * 7. **functionArgs**: Uint8Array[] - An array of Uint8Array instances representing the function arguments.
 * 8. **optionalTransactionPayloadArgs**: OptionalTransactionPayloadArgs | undefined - Optional transaction payload arguments.
 *
 * @type {z.ZodType<RawTxPayload>}
 */
export const RawTxPayloadSchema: z.ZodType<RawTxPayload> = z.tuple([
  z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid senderAddr'), // senderAddr
  z.number(), // senderSequenceNumber
  z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid moduleAddr'), // moduleAddr
  z.string().min(1, 'moduleName cannot be empty'), // moduleName
  z.string().min(1, 'functionName cannot be empty'), // functionName
  z.array(TypeTagSchema), // functionTypeArgs
  z.array(z.instanceof(Uint8Array)), // functionArgs
  OptionalTransactionPayloadArgsSchema.optional() // optional transaction payload arguments
])
