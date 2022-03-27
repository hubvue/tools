export interface GoWasm {
  go: Go
  module: WebAssembly.Module
  instance: WebAssembly.Instance
}

const cacheMap = new Map<string, GoWasm>()

export const getCache = (key: string) => cacheMap.get(key)

export const hasCache = (key: string) => cacheMap.has(key)

export const setCache = (key: string, cache: GoWasm) => cacheMap.set(key, cache)

export const deleteCache = (key: string) => cacheMap.delete(key)

export const clearCache = () =>  cacheMap.clear()

