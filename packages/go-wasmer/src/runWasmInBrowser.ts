import { getCache, GoWasm, hasCache, setCache } from './cache'
import { proxyLog } from './defineLog'

/**
 * @description Loading go applications via WebAssembly in a nodejs environment
 * @param wasmFilePath
 * @param args
 * @returns
 */
export const runWasmInBrowser = async (
  wasmFilePath: string,
  args: unknown[] = []
) => {
  const initGoWasm = await import('../internal/wasm_exec')
  initGoWasm.default()
  
  initWasmPolyfill()

  let wasm: GoWasm | undefined

  if (hasCache(wasmFilePath)) {
    wasm = getCache(wasmFilePath)
  } else {
    wasm = await createBrowserGoWasm(wasmFilePath)
    if (wasm) {
      setCache(wasmFilePath, wasm)
    }
  }

  if (!wasm) {
    console.warn('[Go Wasm]: WebAssembly file failed to load')
    return
  }

  wasm.go.argv = [wasmFilePath, ...args]
  let res: unknown
  const clear = proxyLog((arg) => {
    res = arg
  })
  wasm.go.run(wasm.instance)
  wasm.instance = await WebAssembly.instantiate(
    wasm.module,
    wasm.go.importObject
  ) // reset instance
  clear()

  return res
}

const createBrowserGoWasm = (wasmFile: string): Promise<GoWasm | undefined> => {
  const go = new Go()
  return WebAssembly.instantiateStreaming(fetch(wasmFile), go.importObject)
    .then((result) => {
      return {
        go,
        module: result.module,
        instance: result.instance,
      }
    })
    .catch((err) => {
      console.error(`[Go Wasm]: ${err}`)
      return undefined
    })
}
const initWasmPolyfill = () => {
  if (!WebAssembly.instantiateStreaming) {
    // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer()
      return await WebAssembly.instantiate(source, importObject)
    }
  }
}
