import type { StarkeyObject } from './types'
import type { SupraStarkeyConnect } from './ssc'

declare global {
  interface Window {
    starkey?: StarkeyObject
    ssc: SupraStarkeyConnect
  }
}
