import { Length } from './length'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Returns true when any of the types in the array are compatible with the F type, otherwise false
 * @param T unknown[]
 * @param F unknown
 */
 export type Some<T extends unknown[], F extends unknown> = 
 Length<T> extends 0
   ? false
   : TupleFirst<T> extends F
     ? true
     : Some<Tail<T>, F>
