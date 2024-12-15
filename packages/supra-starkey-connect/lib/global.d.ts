import type { StarkeyObject } from './types'
import type { SupraStarkeyConnect } from './lib'
declare global {
  interface Window {
    starkey?: StarkeyObject
    ssc: SupraStarkeyConnect
  }
}
