import { TrimEnd } from './trimEnd'
import { TrimStart } from './trimStart'

/**
 * @description removing spaces from the head and tail of character types
 * @param T string
 */
export type Trim<T extends string> = TrimStart<TrimEnd<T>>
