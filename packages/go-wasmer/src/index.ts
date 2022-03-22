import { isBrowser } from '@cckim/utils'
import { runWasmByBrowser, runWasmByNode } from './runWasm'

export const runWasm = (wasmFilePath: string, args: unknown[] = []) => {
  if (isBrowser()) {
    return runWasmByBrowser(wasmFilePath, args)
  }
  return runWasmByNode(wasmFilePath, args)
}
