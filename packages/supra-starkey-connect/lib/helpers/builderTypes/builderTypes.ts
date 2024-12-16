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

/**
 * Base interface for TypeTag variants.
 */
interface BaseTypeTag {
  kind: string
}

/**
 * TypeTag Variants
 */
export interface TypeTagBool extends BaseTypeTag {
  kind: 'bool'
}

export interface TypeTagU8 extends BaseTypeTag {
  kind: 'u8'
}

export interface TypeTagU16 extends BaseTypeTag {
  kind: 'u16'
}

export interface TypeTagU32 extends BaseTypeTag {
  kind: 'u32'
}

export interface TypeTagU64 extends BaseTypeTag {
  kind: 'u64'
}

export interface TypeTagU128 extends BaseTypeTag {
  kind: 'u128'
}

export interface TypeTagU256 extends BaseTypeTag {
  kind: 'u256'
}

export interface TypeTagAddress extends BaseTypeTag {
  kind: 'address'
}

export interface TypeTagSigner extends BaseTypeTag {
  kind: 'signer'
}

export interface TypeTagVector extends BaseTypeTag {
  kind: 'vector'
  elementType: TypeTag
}

export interface TypeTagStruct extends BaseTypeTag {
  kind: 'struct'
  structTag: StructTag
}

/**
 * StructTag Interface
 */
export interface StructTag {
  address: string // Account address as a hex string, e.g., '0x1'
  module: string
  name: string
  typeArgs: TypeTag[]
}
