import { StrictlyEqual } from '../comparisons'
import { Pop } from './pop'

/**
 * @description Determine whether the type is a union type
 * @param T
 */
export type IsUnion<T extends unknown> = StrictlyEqual<Pop<T>, never> extends true ? false : true
