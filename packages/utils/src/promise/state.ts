enum PromiseState {
  Pending,
  Fulfilled,
  Rejected
}

/**
 * @description Get Promise state
 * @param p Promise
 * @returns PromiseState
 */
const getState = <T extends unknown>(p: Promise<T>) => {
  const tmp = {}
  return Promise.race([p, tmp]).then(
    value => value === tmp ? PromiseState.Pending : PromiseState.Fulfilled,
    () => PromiseState.Rejected
  )
}

/**
 * @description Determining whether a Promise is in the pending state
 * @param p Promise
 * @returns boolean
 */
export const isPending = async <T extends unknown>(p: Promise<T>) => (await getState(p)) === PromiseState.Pending
/**
 * @description Determining whether a Promise is in the fulfilled state
 * @param p Promise
 * @returns boolean
 */
export const isResolve = async <T extends unknown>(p: Promise<T>) => (await getState(p)) === PromiseState.Fulfilled
/**
 * @description Determining whether a Promise is in the rejected state
 * @param p Promise
 * @returns boolean
 */
export const isReject = async <T extends unknown>(p: Promise<T>) => (await getState(p)) === PromiseState.Rejected
