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

export type StringIndex<T extends string, V extends string> = 
  T extends `${infer F}${V}${infer _}`
    ? [Split<F>['length'], Pop< Split<`${F}${V}`>>['length']]
    : -1

