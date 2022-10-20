import { isPending, isReject, isResolve, sleep, withDeadline, withCancel, withParent } from '../src/promise'

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

  test('withParent', async () => {
    const resolveParent = new Promise<string>(async (resolve) => {
      await sleep(1000)
      resolve('resolveParent')
    })

    const childP1 = withParent(resolveParent)
    expect(await isPending(resolveParent)).toBe(true)
    expect(await isPending(childP1)).toBe(true)
    await sleep(1000)
    expect(await isResolve(resolveParent)).toBe(true)
    expect(await isResolve(childP1)).toBe(true)
    resolveParent.then(v => expect(v).toBe('resolveParent'))
    childP1.then(v => expect(v).toBe('resolveParent'))

    const rejectParent = new Promise<string>(async (_, reject) => {
      await sleep(1000)
      reject('rejectParent')
    })
    const childP2 = withParent(rejectParent)
    expect(await isPending(rejectParent)).toBe(true)
    expect(await isPending(childP2)).toBe(true)
    await sleep(1000)
    expect(await isReject(rejectParent)).toBe(true)
    expect(await isReject(childP2)).toBe(true)

    const p1 = new Promise<string>(async (resolve) => {
      await sleep(1000)
      resolve('resolve')
    })
    const deadlineParent = withDeadline(p1, 500, 'deadline')
    const childP3 = withParent(deadlineParent)
    expect(await isPending(deadlineParent)).toBe(true)
    expect(await isPending(childP3)).toBe(true)
    expect(await isPending(p1)).toBe(true)
    await sleep(500)
    expect(await isResolve(deadlineParent)).toBe(true)
    expect(await isResolve(childP3)).toBe(true)
    expect(await isPending(p1)).toBe(true)

    const p2 = new Promise<string>(async (resolve) => {
      await sleep(1000)
      resolve('resolve')
    })
    const { promise: cancelParent, cancel} = withCancel(p2)
    const childP4 = withParent(cancelParent)
    expect(await isPending(cancelParent)).toBe(true)
    expect(await isPending(childP4)).toBe(true)
    expect(await isPending(p2)).toBe(true)
    cancel()
    expect(await isResolve(cancelParent)).toBe(true)
    expect(await isResolve(childP4)).toBe(true)
  })
})
