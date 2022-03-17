type Fn = (...args: any) => any

interface Debouncer<T extends Fn> {
  debounced(...args: Parameters<T>): ReturnType<T> | undefined
  cancel(): void
}

interface Options {
  time: number
  immediate: boolean
}

const OPTIONS_DEFAULT: Options = {
  time: 1000,
  immediate: true
}

/**
 * @description Create Debounce and convert the original function to a debounce function
 * @param fn Functions that require the debounce feature
 * @param options 
 * @returns 
 * @example
 *   ```ts
 *   const box = document.getElementById('div')
 *   const test = () => console.log(123)
 *   
 *   const testDebounce = createDebounce(test)
 *   box.onclick = testDebounce.debounced
 *   // cancel
 *   testDebounce.cancel()
 *   ```
 *   
 */
export const createDebounce = <T extends Fn>(fn: T, options?: Partial<Options>): Debouncer<T> => {
  let timeout: NodeJS.Timeout | null = null

  if (options) {
    options = Object.assign({}, OPTIONS_DEFAULT, options)
  }

  const debounced = (...args: Parameters<T>): ReturnType<T> | undefined => {
    let result: ReturnType<T> | undefined

    if (timeout) {
      clearTimeout(timeout)
    }

    if (options?.immediate) {
      const callNow = !timeout

      timeout = setTimeout(() => {
        timeout = null
      },options.time)
      
      if (callNow) {
        result = fn.apply(null, args)
      }
    } else {
      timeout = setTimeout(() => {
        fn.apply(null, args)
      })
    }
    return result
  }

  const cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return {
    debounced,
    cancel
  }
}
