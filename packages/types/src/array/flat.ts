import { Length } from './length'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Array flattening
 * @param T unknown[]
 */
 export type Flat<T extends unknown[]> = _Flat<T>
 type _Flat<T extends unknown[], R extends unknown[] = []> = 
   Length<T> extends 0
     ? R
     : TupleFirst<T> extends unknown[]
       ? _Flat<Tail<T>, [...R, ..._Flat<TupleFirst<T>>]>
       : _Flat<Tail<T>, [...R, TupleFirst<T>]>
