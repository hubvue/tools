declare interface PendingEvent { 
  id: number 
  this?: unknown
  args?: IArguments 
}
declare interface Go {
  new(...args: unknown[]): Go
  argv: unknown[]
  env: NodeJS.ProcessEnv
  exit: NodeJS.Process['exit']
  importObject: WebAssembly.Imports
  exited: boolean
  run: (instance: WebAssembly.Instance) => Promise<unknown>
  _pendingEvent: PendingEvent
  _resume: () => void

}

declare const Go: Go
