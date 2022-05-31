import { Pop } from '../array'
import { Split } from './split'

/**
 * @description determines if the type exists in the string type, returns the index of the type if it exists, or -1 if it does not.
 * @param T unknown[]
 * @param V unknown
 */
 export type Index<T extends string, V extends string> = 
 T extends `${infer F}${V}${infer _}`
   ? [Split<F>['length'], Pop< Split<`${F}${V}`>>['length']]
   : -1
