
import { createDebounce }  from '../src/function/debounce'

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))
describe('function', () => {

  describe('debounce', () => {
    test('Frequent calls to dobounce, function called 0 times immediately', () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn)
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.debounced()
      expect(fn).toHaveBeenCalledTimes(0)
    })
    test('Frequent calls to dobounce, function called only once', async () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn)
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.debounced()
      await sleep(1000)
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('Frequent calls to dobounce, function called 2 times after 1 second interval', async () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn)
      fnDebounce.debounced()
      fnDebounce.debounced()
      await sleep(1000)
      fnDebounce.debounced()
      fnDebounce.debounced()
      await sleep(1000)
      expect(fn).toHaveBeenCalledTimes(2)  
    })
    test('Set time options, debounce works as normal', async () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn, {
        time: 2000
      })
      fnDebounce.debounced()
      fnDebounce.debounced()
      await sleep(2000)
      expect(fn).toHaveBeenCalledTimes(1)
    })
    test('Set immediate options, debounce is executed immediately', async () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn, {
        immediate: true
      })
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.debounced()
      await sleep(1000)
      fnDebounce.debounced()
      expect(fn).toHaveBeenCalledTimes(2)
    })
    test('Set immediate options, debounce is executed immediately and has a return value', () => {
      const fn = jest.fn().mockReturnValue('debounce')
      const fnDebounce = createDebounce(fn, {
        immediate: true
      })
      const result = fnDebounce.debounced()
      expect(result).toBe('debounce')
    })
    test('debounce is executed without immediate options and does not have a return value', () => {
      const fn = jest.fn().mockReturnValue('debounce')
      const fnDebounce = createDebounce(fn)
      const result = fnDebounce.debounced()
      expect(result).toBeUndefined()
    })
    test('Use the cancel method to end debounce early', () => {
      const fn = jest.fn()
      const fnDebounce = createDebounce(fn)
      fnDebounce.debounced()
      fnDebounce.debounced()
      fnDebounce.cancel()
      expect(fn).toHaveBeenCalledTimes(0)
    })
  })
})
