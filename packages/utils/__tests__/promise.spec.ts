import { isPending, isReject, isResolve, sleep, withDeadline, withCancel } from '../src/promise'

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
  describe('time', () => {
    test('sleep', () => {
      const p = new Promise((resolve) => {
        sleep(1000).then(() => {
          resolve('')
        })
      })
      setTimeout(async () => {
        expect(await isResolve(p)).toBe(true)
      }, 1000)
    })

    test('withDeadline', () => {
      const p1 = withDeadline(Promise.resolve('p'), 1000)
      p1.then(v => {
        expect(v).toBe('p')
      })

      const p2 = new Promise<string>(async (resolve) => {
        await sleep(1000)
        resolve('p2')
      })
      withDeadline(p2, 500, '500').then(v => {
        expect(v).toBe('500')
      })
      withDeadline(p2, 500).then(v => {
        expect(v).toBe(undefined)
      })
      withDeadline(p2, 1500).then(v => {
        expect(v).toBe('p2')
      })
      withDeadline(p2, 1000).then(v => {
        expect(v).toBe('p2')
      })
    })

    test('withCancel', async () => {
      
      const p1 = new Promise<string>(async (resolve) => {
        await sleep(1000)
        resolve('p1')
      })
      const { promise, cancel } = withCancel(p1)
      cancel()
      expect((await isResolve(promise))).toBe(true)
      promise.then(v => {
        expect(v).toBe(undefined)
      })

      const p2 = new Promise<string>(async (resolve) => {
        await sleep(1000)
        resolve('p2')
      })
      const { promise: pp1, cancel: c1 } = withCancel(p2)
      await sleep(1000)
      expect((await isResolve(pp1))).toBe(true)
      c1()
      expect((await isResolve(pp1))).toBe(true)
      pp1.then(v => {
        expect(v).toBe('p2')
      })
    })
  })
})
