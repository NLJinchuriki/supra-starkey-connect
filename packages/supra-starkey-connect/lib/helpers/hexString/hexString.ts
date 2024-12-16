/**
 * Utility to work with hexadecimal strings and byte arrays.
 */
export class HexString {
  private readonly hexString: string

  /**
   * Constructs a new HexString.
   * @param hexString The hexadecimal string. If it doesn't start with `0x`, it will be added.
   */
  constructor(hexString: string) {
    if (hexString.startsWith('0x')) {
      this.hexString = hexString
    } else {
      this.hexString = `0x${hexString}`
    }
  }

  /**
   * Converts a Uint8Array to a HexString.
   * @param bytes The input byte array.
   * @returns A new HexString instance.
   */
  static fromUint8Array(bytes: Uint8Array): HexString {
    return new HexString(HexString.bytesToHex(bytes))
  }

  /**
   * Converts a HexString to a Uint8Array.
   * @returns A Uint8Array representation of the hex string.
   */
  toUint8Array(): Uint8Array {
    return HexString.hexToBytes(this.hexString.slice(2))
  }

  /**
   * Returns the hex string with the `0x` prefix.
   * @returns The full hex string.
   */
  hex(): string {
    return this.hexString
  }

  /**
   * Returns the hex string without the `0x` prefix.
   * @returns The hex string without the prefix.
   */
  noPrefix(): string {
    return this.hexString.slice(2)
  }

  /**
   * Converts a Uint8Array to a hexadecimal string.
   * @param bytes The input byte array.
   * @returns The hexadecimal string representation of the byte array.
   */
  private static bytesToHex(bytes: Uint8Array): string {
    const hexArray: string[] = []
    for (const byte of bytes) {
      hexArray.push(byte.toString(16).padStart(2, '0'))
    }
    return hexArray.join('')
  }

  /**
   * Converts a hexadecimal string to a Uint8Array.
   * @param hex The input hexadecimal string.
   * @returns The byte array representation of the hexadecimal string.
   * @throws Will throw an error if the input string is not valid hexadecimal.
   */
  private static hexToBytes(hex: string): Uint8Array {
    if (typeof hex !== 'string') {
      throw new Error('Input must be a string.')
    }

    if (hex.length % 2 !== 0) {
      throw new Error('Hex string length must be even.')
    }

    const byteArray = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
      const byte = parseInt(hex.slice(i, i + 2), 16)
      if (isNaN(byte)) {
        throw new Error(`Invalid hex character at position ${i}`)
      }
      byteArray[i / 2] = byte
    }

    return byteArray
  }
}
