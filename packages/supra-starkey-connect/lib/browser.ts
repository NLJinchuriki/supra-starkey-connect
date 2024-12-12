import { Buffer } from 'buffer'
import ssc from './ssc'

declare global {
  interface Window {
    ssc: typeof ssc
    Buffer: typeof Buffer
  }
}

;(async () => {
  if (typeof window !== 'undefined') {
    window.Buffer = Buffer

    await ssc.init()
    window.ssc = ssc
    console.log('SSC initialized and attached to window')
  }
})()
