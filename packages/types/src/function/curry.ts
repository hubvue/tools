import { Pop, Last } from '../array'
import { IntersectOf } from '../union'

type Accumulate<T extends unknown[], I, O extends unknown[] = T> = 
  `${T['length']}` extends I 
    ? O['length'] 
    : Accumulate<Pop<T>, I, T>

type DeepCurry<R extends unknown[], V extends unknown, I extends number, K extends unknown[] = []> = 
      R['length'] extends I 
      ? (r: R) => CurryingResult<(...args: K) => V> 
      : DeepCurry<Pop<R>, V, I, [Last<R>, ...K]>

type ParamsExpand<T> = 
  T extends (r: infer P) => infer V 
    ? P extends any[] 
      ? (...r: P) => V 
      : never 
    : never

type OverloadFn<R extends unknown[], V extends unknown> = {
  [P in keyof R]: ParamsExpand<DeepCurry<R, V, Accumulate<R, P>>>
}

export type CurryingResult<T extends (...args: any[]) => any> =  
  T extends (...r: infer R) => infer V 
    ? R['length'] extends 0
      ? V
        : R['length'] extends 1
          ?  T
          : IntersectOf<OverloadFn<R, V>[number]>
    : never

/**
 * @description Currying function
 * @param fn Function
 */
export type Currying = <T extends (...args: any[]) => any>(fn: T) => CurryingResult<T>
