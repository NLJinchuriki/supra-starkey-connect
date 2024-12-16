import { RawTxPayload } from '../types'
import { RawTxPayloadSchema } from '../schemas/rawTxPayloadSchema'

/**
 * Validates a RawTxPayloadArray against the predefined RawTxPayloadArraySchema.
 *
 * This function checks whether the provided rawTxPayloadArray adheres to the required schema.
 * If the validation fails, it throws a ZodError with detailed information.
 *
 * @param {RawTxPayloadArray} rawTxPayloadArray - The raw transaction payload array to validate.
 * @throws {z.ZodError} Throws an error if the rawTxPayloadArray does not conform to the schema.
 *
 */
export const validateRawTxPayload = (rawTxPayload: RawTxPayload): void => {
  RawTxPayloadSchema.parse(rawTxPayload)
}
