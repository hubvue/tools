import { getCache, GoWasm, hasCache, setCache } from './cache'
import { proxyLog } from './defineLog'

/**
 * @description Loading go applications via WebAssembly in a nodejs environment
 * @param wasmFilePath
 * @param args
 * @returns
 */
export const runWasmInNode = async (
  wasmFilePath: string,
  args: unknown[] = []
) => {
  const initEnv = await import('../internal/wasm_node_init')
  initEnv.default()
  const initGoWasm = await import('../internal/wasm_exec')
  initGoWasm.default()
  
  let wasm: GoWasm | undefined

  if (hasCache(wasmFilePath)) {
    wasm = getCache(wasmFilePath)
  } else {
    wasm = await createNodeGoWasm(wasmFilePath)
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
  await wasm.go.run(wasm.instance)
  wasm.instance = await WebAssembly.instantiate(
    wasm.module,
    wasm.go.importObject
  ) // reset instance
  clear()
  return res
}


const createNodeGoWasm = (wasmFilePath: string): Promise<GoWasm | undefined> => {
  const fs = require('fs')
  const go = new Go()
  
  go.env = Object.assign({ TMPDIR: require('os').tmpdir() }, process.env)
  go.exit = process.exit

  const wasmFile = fs.readFileSync(wasmFilePath)
  return WebAssembly.instantiate(wasmFile, go.importObject)
    .then(async (result) => {
      process.on('exit', (code) => {
        if (code === 0 && !go.exited) {
          go._pendingEvent = { id: 0 }
          go._resume()
        }
      })
      return {
        go,
        module: result.module,
        instance: result.instance
      }
    })
    .catch((err) => {
      console.log(`[Go Wasm]: ${err}`)
      return undefined
    })
}
