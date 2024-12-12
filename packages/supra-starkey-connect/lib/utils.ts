/**
 * Removes the `0x` prefix from a hexadecimal string if it exists.
 *
 * @param value - The hexadecimal string that may or may not start with `0x`.
 * @returns The string without the `0x` prefix. If the input does not start with `0x`, it returns the original string.
 *
 * @example
 * ```typescript
 * remove0xPrefix("0xabcdef"); // "abcdef"
 * remove0xPrefix("abcdef");   // "abcdef"
 * ```
 */
export const remove0xPrefix = (value: string): string =>
  value.startsWith('0x') ? value.slice(2) : value

import nacl from 'tweetnacl'
import { Buffer } from 'buffer'

/**
 * Generates a random nonce using tweetnacl's `randomBytes`.
 *
 * @param message - The input message (optional, used to ensure nonce variation).
 * @returns A random nonce as a hexadecimal string.
 */
export const generateNonce = (message: string): string => {
  // Generate 16 random bytes (128 bits) for the nonce
  const randomBytes = nacl.randomBytes(16)
  const randomHex = Buffer.from(randomBytes).toString('hex')

  const messageHash = Buffer.from(message).toString('hex').slice(0, 16)
  return (randomHex + messageHash).slice(0, 32)
}
