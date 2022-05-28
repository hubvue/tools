import { Diff } from './diff'
import { Intersection } from './Intersection'

/**
 * @description Object.assign method simulation, merging two objects
 * @param T object
 * @param U object
 */
 export type Assign<T extends object, U extends object> = _Assign<T, U>
 type _Assign<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T> & Diff<U, T>> = Pick<I, keyof I>
