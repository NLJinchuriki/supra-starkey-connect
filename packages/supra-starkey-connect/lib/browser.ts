import { Buffer } from 'buffer'
import { ssc } from './lib'
import { BCS } from './ssc'
import { HexString } from './ssc'
import { validateRawTxPayload } from './ssc'
import { remove0xPrefix } from './ssc'

declare global {
  interface Window {
    ssc: typeof ssc
    Buffer: typeof Buffer
    BCS: typeof BCS
    HexString: typeof HexString
    validateRawTxPayload: typeof validateRawTxPayload
    remove0xPrefix: typeof remove0xPrefix
  }
}

;(async () => {
  if (typeof window !== 'undefined') {
    window.Buffer = Buffer
    window.BCS = BCS
    window.HexString = HexString
    window.validateRawTxPayload = validateRawTxPayload
    window.remove0xPrefix = remove0xPrefix

    await ssc.init()
    window.ssc = ssc
    console.log('SSC initialized and attached to window')
  }
})()
