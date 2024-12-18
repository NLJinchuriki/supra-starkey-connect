import type { StarkeyObject, SupraStarkeyConnect } from './types'
import { Buffer } from 'buffer'
import {
  BCS,
  HexString,
  validateRawTxPayload,
  remove0xPrefix,
  waitForTransactionCompletion,
  getTransactionStatus,
  sleep,
  generateNonce
} from './ssc'

declare global {
  interface Window {
    starkey?: StarkeyObject
    ssc?: SupraStarkeyConnect
    sscUtils?: {
      Buffer: typeof Buffer
      BCS: typeof BCS
      HexString: typeof HexString
      validateRawTxPayload: typeof validateRawTxPayload
      remove0xPrefix: typeof remove0xPrefix
      waitForTransactionCompletion: typeof waitForTransactionCompletion
      getTransactionStatus: typeof getTransactionStatus
      sleep: typeof sleep
      generateNonce: typeof generateNonce
    }
    __SupraStarkeyConnectInstance__?: SupraStarkeyConnect
  }
}

export {}
