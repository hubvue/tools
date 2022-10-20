/**
 * @description sleep
 * @param time 
 * @returns 
 */
export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))


const deadlineSleepHandler = async <T>(time: number, target: T) => {
  await sleep(time)
  return target
}

/**
 * @description deadline promise
 * @param p  Promise
 * @param time number
 * @param value unknown
 * @returns Promise
 */
export const withDeadline = <T extends unknown, V extends unknown = unknown>(p: Promise<T>, time: number, value?: V) => {
  return Promise.race([p, deadlineSleepHandler(time, value)]).then(v => v)
}

interface CancelContext<T> {
  promise: Promise<T | undefined>
  cancel: () => void
}
/**
 * @description cancel promise
 * @param p Promise
 * @returns CancelContext
 */
export const withCancel = <T extends unknown>(p: Promise<T>): CancelContext<T> => {
  type Resolve = (value?: T) => void
  let resolveFn: Resolve| null = null
  const cancel = () => {
    resolveFn && resolveFn()
  }
  const newp = new Promise<T | undefined>((resolve, reject) => {
    resolveFn = resolve
    p.then(resolve, reject)
  })
  return {
    promise: newp,
    cancel
  }
}

/**
 * @description parent promise
 * @param parent Promise
 * @returns Promise
 */
export const withParent = <T extends unknown>(parent: Promise<T>): Promise<T> => {
  return new Promise<T>((resolve, reject) => parent.then(resolve, reject))
}
