import { Primitive } from '../value'
import { HasTail } from './hasTail'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Linking Primitive types by a specific hyphen
 * @param T Primitive[]
 * @param H? string
 */
 export type Join<T extends Primitive[], H extends string = ''> = _Join<T, H>
 type _Join<T extends Primitive[], H extends string = '', R extends string = ''> = 
   T['length'] extends 0
     ? R
     : HasTail<T> extends true
       ? TupleFirst<T> extends Primitive
         ? _Join<Tail<T>, H, `${R}${TupleFirst<T>}${H}`>
         : _Join<Tail<T>, H, `${R}${H}`>
     : TupleFirst<T> extends Primitive
       ? `${R}${TupleFirst<T>}`
       : `${R}`
 