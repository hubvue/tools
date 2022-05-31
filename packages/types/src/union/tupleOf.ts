import { Pop } from './pop'
import { Last } from './last'
import { IsUnion } from './isUnion'

/**
 * @description Union type to tuple type
 */
export type TupleOf<T extends unknown, R extends unknown[] = []> = 
  IsUnion<T> extends true ? TupleOf<Pop<T>, [Last<T>, ...R]> : [Last<T>, ...R]
