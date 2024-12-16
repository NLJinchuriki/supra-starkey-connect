import { Buffer } from 'buffer'
import { ssc } from './lib'
import { BCS } from './ssc'
import { HexString } from './ssc'
import { validateRawTxPayload } from './ssc'
import {
  remove0xPrefix,
  waitForTransactionCompletion,
  getTransactionStatus,
  sleep,
  generateNonce
} from './ssc'

declare global {
  interface Window {
    ssc: typeof ssc
    sscUtils: {
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
  }
}

;(async () => {
  if (typeof window !== 'undefined') {
    window.sscUtils = {
      Buffer,
      BCS,
      HexString,
      validateRawTxPayload,
      remove0xPrefix,
      waitForTransactionCompletion,
      getTransactionStatus,
      sleep,
      generateNonce
    }

    await ssc.init()
    window.ssc = ssc
    console.log('SSC initialized and attached to window.ssc')
    console.log('SSC Utils initialized and attached to window.sscUtils')
  }
})()
