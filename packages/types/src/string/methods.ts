import { Pop } from '../'
/**
 * @description splitting strings into arrays by specific hyphens
 * @param T string
 * @param H string?
 */
export type Split<T extends string, H extends string = ''> = SplitHandler<T, H>
type SplitHandler<T extends string, H extends string = '', R extends string[] = []> = 
  T extends ''
    ? R
    : T extends `${infer F}${H}${infer RR}`
      ? SplitHandler<RR, H, [...R, F]>
      : [...R, T]

/**
 * @description determines if the type exists in string type
 * @param T unknown[]
 * @param V unknown
 */
export type StringIncludes<T extends string, V extends string> = T extends `${infer _}${V}${infer _}` ? true : false

/**
 * @description determines if the type exists in the string type, returns the index of the type if it exists, or -1 if it does not.
 * @param T unknown[]
 * @param V unknown
 */
export type StringIndex<T extends string, V extends string> = 
  T extends `${infer F}${V}${infer _}`
    ? [Split<F>['length'], Pop< Split<`${F}${V}`>>['length']]
    : -1

/**
 * @description removing spaces from the head of character types
 * @param T string
 */
export type TrimStart<T extends string> =
  T extends ` ${infer TT}`
    ? TrimStart<TT>
    : T

/**
 * @description removing trailing spaces from character types
 * @param T string
 */
export type TrimEnd<T extends string> =
  T extends `${infer TT} `
    ? TrimEnd<TT>
    : T

/**
 * @description removing spaces from the head and tail of character types
 * @param T string
 */
export type Trim<T extends string> = TrimStart<TrimEnd<T>>