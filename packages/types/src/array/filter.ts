import { Length } from './length'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Filter out F-compatible types in array types
 * @param T unknown[]
 * @param F unknown
 */
 export type Filter<T extends unknown[], F extends unknown> = _Filter<T, F>
 export type _Filter<T extends unknown[], F extends unknown, R extends unknown[] = []> = 
   Length<T> extends 0
     ? R
     : TupleFirst<T> extends F
       ? _Filter<Tail<T>, F, [...R, TupleFirst<T>]>
       : _Filter<Tail<T>, T, R>
