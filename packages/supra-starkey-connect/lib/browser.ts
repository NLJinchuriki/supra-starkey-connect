import ssc from './ssc'

declare global {
  interface Window {
    ssc: typeof ssc
  }
}

// Assign the ssc instance directly to window.ssc
if (typeof window !== 'undefined') {
  window.ssc = ssc
}
