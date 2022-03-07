import { Pop } from '../'
/**
 * @description splitting strings into arrays by specific hyphens
 * @param T string
 * @param H string?
 */
export type Split<T extends string, H extends string = '', R extends string[] = []> = 
  T extends ''
    ? R
    : T extends `${infer F}${H}${infer RR}`
      ? Split<RR, H, [...R, F]>
      : [...R, T]

export type StringIncludes<T extends string, V extends string> = T extends `${infer _}${V}${infer _}` ? true : false

export type StringIndex<T extends string, V extends string> = 
  T extends `${infer F}${V}${infer _}`
    ? [Split<F>['length'], Pop< Split<`${F}${V}`>>['length']]
    : -1