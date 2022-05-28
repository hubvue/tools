import { Equal } from '../comparisons'
import { Tail } from './tail'
import { TupleFirst } from './tupleFirst'

/**
 * @description Get the array or tuple type [Start, End) section
 * @param T unknown[]
 * @param S number?
 * @param E number?
 */
 export type Slice<T extends unknown[], S extends number = 0, E extends number = T['length']> = _Slice<T, S, E>
 type _Slice<
   T extends unknown[],
   S extends number,
   E extends number,
   P extends unknown[] = [],
   R extends unknown[] = []
 > = Equal<P['length'], S> extends true
       ? Equal<P['length'], E> extends true
         ? R
         : _Slice<Tail<T>, S, E, [...P, TupleFirst<T>], [...R, TupleFirst<T>]>
       : Equal<R['length'], 0> extends true
         ? _Slice<Tail<T>, S, E, [...P, TupleFirst<T>], R>
         : Equal<P['length'], E> extends true
           ? R
           : _Slice<Tail<T>, S, E, [...P, TupleFirst<T>], [...R, TupleFirst<T>]>
 