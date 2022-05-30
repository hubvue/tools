import { AnyFunction, Primitive } from '../value'

export type DeepRequired<T> = T extends AnyFunction | Primitive
  ? T
  : T extends DeepRequiredObject<infer V>
  ? DeepRequiredObject<V>
  : 12

type DeepRequiredObject<T> = {
  [K in keyof T]-?: DeepRequired<T[K]> 
}


type A = DeepRequired<{
  a: number,
  b?: number
}>
