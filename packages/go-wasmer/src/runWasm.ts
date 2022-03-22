import { proxyLog } from './defineLog'

export const runWasmByNode = async (wasmFilePath: string, args: unknown[] = []) => {
  const initEnv = await import('../internal/wasm_node_init')
  initEnv.default()
  const initGoWasm = await import('../internal/wasm_exec')
  initGoWasm.default()
  const fs = require('fs')
  const go = new Go()
  go.argv = [wasmFilePath, ...args]
  go.env = Object.assign({ TMPDIR: require('os').tmpdir() }, process.env)
  go.exit = process.exit

  const wasmFile = fs.readFileSync(wasmFilePath)
  return WebAssembly.instantiate(wasmFile, go.importObject)
    .then( async (result) => {
      process.on('exit', (code) => {
        if (code === 0 && !go.exited) {
          go._pendingEvent = { id: 0 }
          go._resume()
        }
      })
      let res: unknown
      const clear = proxyLog((arg) => {
        res = arg
      })
      await go.run(result.instance)
      clear()
      return res
    })
    .catch((err) => {
      console.log(`[Go Wasm]: ${err}`)
    })
}

interface BrowserWasmCache {
  module: WebAssembly.Module | null,
  instance: WebAssembly.Instance | null
}

const BrowserWasmCache: BrowserWasmCache = {
  module: null,
  instance: null
}

export const runWasmByBrowser = async (wasmFilePath: string, args: unknown[] = []) => {
  const initGoWasm = await import('../internal/wasm_exec')
  initGoWasm.default()
  if (!WebAssembly.instantiateStreaming) { // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer()
      return await WebAssembly.instantiate(source, importObject)
    }
  }

  const go = new Go()
  go.argv = [wasmFilePath, ...args]
  const fetchWasm = () => {
    return WebAssembly.instantiateStreaming(fetch(wasmFilePath), go.importObject).then((result) => {
      BrowserWasmCache.module = result.module
      BrowserWasmCache.instance = result.instance
    })
  }

  if (!BrowserWasmCache.instance || !BrowserWasmCache.module) {
    await fetchWasm().catch(err => console.error(`[Go Wasm]: ${err}`))
  }
  let res: unknown
  const clear = proxyLog((arg) => {
    res = arg
  })
  if (!BrowserWasmCache.instance || !BrowserWasmCache.module) {
    console.warn('[Go Wasm]: WebAssembly file failed to load')
  } else {
    await go.run(BrowserWasmCache.instance)
    BrowserWasmCache.instance = await WebAssembly.instantiate(BrowserWasmCache.module, go.importObject) // reset instance
  }
  clear()
  
  return res
}

