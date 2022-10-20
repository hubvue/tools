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
