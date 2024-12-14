import { Buffer } from 'buffer'
import { ssc, BCS } from './ssc'

declare global {
  interface Window {
    ssc: typeof ssc
    Buffer: typeof Buffer
    BCS: typeof BCS
  }
}

;(async () => {
  if (typeof window !== 'undefined') {
    window.Buffer = Buffer
    window.BCS = BCS

    await ssc.init()
    window.ssc = ssc
    console.log('SSC initialized and attached to window')
  }
})()
