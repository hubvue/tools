const oldLog = console.log

export const proxyLog = (fn: (...args: any) => any) => {
  Object.defineProperty(console, 'log', {
    writable: true,
    value: fn
  })
  return () => {
    Object.defineProperty(console, 'log', {
      writable: true,
      value: oldLog
    })
  }
}
