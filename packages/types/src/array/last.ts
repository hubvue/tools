import { HasTail } from './hasTail'
import { Tail } from './tail'
import { ArrayFirst } from './arrayFirst'
/**
 * @description Get the type of the last child element of an array or tuple type
 */
 export type Last<T extends unknown[]> = HasTail<T> extends true ? Last<Tail<T>> : ArrayFirst<T>
