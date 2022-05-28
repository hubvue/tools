import { Length } from './length'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Returns true when the types in the array are all F-compatible, otherwise false
 * @param T unknown[]
 * @param F unknown
 */
 export type Every<T extends unknown[], F extends unknown> = 
 Length<T> extends 0
   ? true
   : TupleFirst<T> extends F
     ? Every<Tail<T>, F>
     : false
