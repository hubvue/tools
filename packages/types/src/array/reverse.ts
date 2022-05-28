import { Length } from './length'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Array type inversion
 * @param T unknown[]
 */
 export type Reverse<T extends unknown[]> = Length<T> extends 0 ? [] : [...Reverse<Tail<T>>, TupleFirst<T>]
