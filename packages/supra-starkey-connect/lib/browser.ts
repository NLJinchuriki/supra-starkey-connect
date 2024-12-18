import { Buffer } from 'buffer'
import { getSupraStarkeyConnect } from './lib'
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

    const ssc = getSupraStarkeyConnect()

    if (ssc) {
      window.ssc = ssc
      console.log('SSC initialized and attached to window.ssc')
      console.log('SSC Utils initialized and attached to window.sscUtils')
    } else {
      console.warn('SupraStarkeyConnect is not available.')
    }
  }
})()
