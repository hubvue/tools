import { runWasm } from '@cckim/go-wasmer'
import { resolve } from 'path'

interface Options {
  input: string
  language?: 'go' | 'typescript'
  name?: string
  output?: string
}

export const json2type = async (options: Options) => {
  const args = normalizeOptions(options)
  return runWasm(resolve(__dirname, '../wasm/json2type.wasm'), args)
}

const normalizeOptions = (options: Options) => {
  return Object.keys(options).map(key => {
    return `-${key}=${options[key as keyof Options]}`
  })
}



