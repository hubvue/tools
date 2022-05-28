import { Equal } from '../comparisons'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Determines if the type exists in the array or tuple type, returns the index of the type if it exists, or -1 if it does not.
 * @param T unknown[]
 * @param V unknown
 */
 export type Index<T extends unknown[], V extends unknown> = _Index<T, V>
 type _Index<T extends unknown[], V extends unknown, P extends unknown[] = []> = 
   Equal<T['length'], 0> extends true
     ? -1
     : Equal<T[0], V> extends true
       ? P['length']
       : _Index<Tail<T>, V, [...P, TupleFirst<T>]>
 