import * as Types from './types'
import * as Serializer from './serializer'
import * as Deserializer from './deserializer'
import * as Helpers from './helpers'

/**
 * BCS (Binary Canonical Serialization) utilities.
 */
export const BCS = {
  ...Types,
  ...Serializer,
  ...Deserializer,
  ...Helpers
}

export type { Serializable } from './helpers'
