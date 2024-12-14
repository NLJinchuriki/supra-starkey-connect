import { z } from 'zod'

/**
/**
 * Zod schema for validating OptionalTransactionPayloadArgs.
 *
 * Validates the optional transaction payload arguments, ensuring that if provided,
 * each field adheres to the expected type.
 *
 * @type {z.ZodSchema<OptionalTransactionPayloadArgs>}
 */
export const OptionalTransactionPayloadArgsSchema = z.object({
  /**
   * The maximum gas units for the transaction.
   * Must be a numbers if provided.
   */
  maxGas: z.number().optional(),

  /**
   * The gas unit price for the transaction.
   * Must be a number if provided.
   */
  gasUnitPrice: z.number().optional(),

  /**
   * The transaction expiry time in seconds.
   * Must be a number if provided.
   */
  txExpiryTime: z.number().optional()
})
