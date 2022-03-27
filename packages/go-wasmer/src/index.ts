import { isBrowser } from '@cckim/utils'
import { runWasmInNode } from './runWasmInNode'
import { runWasmInBrowser } from './runWasmInBrowser'

export const runWasm = (wasmFilePath: string, args: unknown[] = []) => {
  if (isBrowser()) {
    return runWasmInBrowser(wasmFilePath, args)
  }
  return runWasmInNode(wasmFilePath, args)
}
