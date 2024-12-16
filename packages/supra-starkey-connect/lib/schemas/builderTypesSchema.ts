import { z } from 'zod'
import { TypeTag, StructTag } from '../helpers/builderTypes/builderTypes'

const StructTagSchema: z.ZodType<StructTag> = z.object({
  address: z.string().regex(/^0x[0-9a-fA-F]+$/, 'Invalid address'),
  module: z.string().min(1, 'module cannot be empty'),
  name: z.string().min(1, 'name cannot be empty'),
  typeArgs: z.array(z.lazy(() => TypeTagSchema))
})

const TypeTagBoolSchema = z.object({
  kind: z.literal('bool')
})

const TypeTagU8Schema = z.object({
  kind: z.literal('u8')
})

const TypeTagU16Schema = z.object({
  kind: z.literal('u16')
})

const TypeTagU32Schema = z.object({
  kind: z.literal('u32')
})

const TypeTagU64Schema = z.object({
  kind: z.literal('u64')
})

const TypeTagU128Schema = z.object({
  kind: z.literal('u128')
})

const TypeTagU256Schema = z.object({
  kind: z.literal('u256')
})

const TypeTagAddressSchema = z.object({
  kind: z.literal('address')
})

const TypeTagSignerSchema = z.object({
  kind: z.literal('signer')
})

const TypeTagVectorSchema = z.object({
  kind: z.literal('vector'),
  elementType: z.lazy(() => TypeTagSchema)
})

const TypeTagStructSchema = z.object({
  kind: z.literal('struct'),
  structTag: StructTagSchema
})

export const TypeTagSchema: z.ZodType<TypeTag> = z.discriminatedUnion('kind', [
  TypeTagBoolSchema,
  TypeTagU8Schema,
  TypeTagU16Schema,
  TypeTagU32Schema,
  TypeTagU64Schema,
  TypeTagU128Schema,
  TypeTagU256Schema,
  TypeTagAddressSchema,
  TypeTagSignerSchema,
  TypeTagVectorSchema,
  TypeTagStructSchema
])
