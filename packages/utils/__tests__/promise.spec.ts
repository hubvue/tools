import { isPending, isReject, isResolve } from '../src/promise'

describe('promise', () => {
  describe('state', () => {
    const pendingPromise = new Promise(() => {})
    test('isPending', async () => {
      expect(await isPending(Promise.resolve())).toBe(false)
      expect(await isPending(Promise.reject())).toBe(false)
      expect(await isPending(pendingPromise)).toBe(true)
    })

    test('isResolve', async () => {
      expect(await isResolve(Promise.resolve())).toBe(true)
      expect(await isResolve(Promise.reject())).toBe(false)
      expect(await isResolve(pendingPromise)).toBe(false)

      let resolveFn: (value: unknown) => void
      const p = new Promise((resolve) => {
        resolveFn = resolve
      })
      setTimeout(async () => {
        resolveFn && resolveFn('')
        expect(await isResolve(p)).toBe(true)
      }, 2000)
    })

    test('isReject', async () => {
      expect(await isReject(Promise.reject())).toBe(true)
      expect(await isReject(Promise.resolve())).toBe(false)
      expect(await isReject(pendingPromise)).toBe(false)

      let rejectFn: (reason?: any) => void
      const p = new Promise((_, reject) => {
        rejectFn = reject
      })
      setTimeout(async () => {
        rejectFn && rejectFn()
        expect(await isReject(p)).toBe(true)
      })
    })
  })
})
