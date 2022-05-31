import { TupleOf } from './tupleOf'
import { Assign } from '../object'
import { TupleFirst, Tail } from '../array'

/**
 * @description 
 * @param T object union
 */
export type Merge<T extends object> = _Merge<TupleOf<T>>

type _Merge<TT extends unknown[], R extends object = {}> = 
  TT['length'] extends 0
    ? R
    : _Merge<Tail<TT>, Assign<R, TupleFirst<TT>>>
