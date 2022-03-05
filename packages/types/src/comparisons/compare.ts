import { First, Tail } from '../'

type NSymbol = 0 | 1

const enum Res {
  Victory,
  Failure,
  Tie
}

interface NumberObject<S extends NSymbol, I extends string[], F extends string[]> {
  symbol: S
  integer: I
  fractional: F
}

type IsNegative<T extends number> = `${T}` extends `-${string}` ? true : false
type IsFractional<T extends number> = `${T}` extends `${string}.${string}` ? true : false

type Split<T extends string, P extends string[] = []> = 
  T extends ''
    ? P
    : T extends `${infer F}${infer R}` 
      ? Split<R, [...P, F]>
      : never

type NumberObjectByNF<T extends number> = 
  `${T}` extends `${infer _}${infer I}.${infer F}`
    ? NumberObject<1, Split<I>, Split<F>>
    : never
type NumberObjectByPF<T extends number> = 
  `${T}` extends `${infer I}.${infer F}`
    ? NumberObject<0, Split<I>, Split<F>>
    : never

type NumberObjectByN<T extends number> =
  `${T}` extends `${infer _}${infer I}`
    ? NumberObject<1, Split<I>, []>
    : never

type NumberObjectByP<T extends number> = NumberObject<0, Split<`${T}`>, []>

type CreateNumberObject<T extends number, N = IsNegative<T>, F = IsFractional<T>> = 
  N extends true 
    ? F extends true
      ? NumberObjectByNF<T>
      : NumberObjectByN<T>
    : F extends true
      ? NumberObjectByPF<T>
      : NumberObjectByP<T>

type NumberCompare<A extends string, B extends string, T extends string[] = [], L = `${T['length']}`> = 
  L extends A
    ? L extends B
      ? Res.Tie
      : Res.Failure
    : L extends B
      ? Res.Victory
      : NumberCompare<A, B, [...T, '_']>

type NumberArrayCompareHandler<
  A extends string[],
  B extends string[],
  FA extends string = First<A>,
  FB extends string = First<B>,
  RA extends string[] = Tail<A>,
  RB extends string[] = Tail<B>
> = 
  A['length'] extends 0
    ? B['length'] extends 0
      ? Res.Tie
      : Res.Failure
    : NumberCompare<FA, FB> extends Res.Tie
      ? NumberArrayCompareHandler<RA, RB>
      : NumberCompare<First<A>, First<B>>

type NumberArrayCompare<
  A extends string[],
  B extends string[],
  CK extends boolean,
  LR = NumberCompare<`${A['length']}`, `${B['length']}`>
> = 
  CK extends true
    ? NumberArrayCompareHandler<A, B>
    : LR extends Res.Tie
      ? NumberArrayCompareHandler<A, B>
      : LR


type SymbolCompareResMap = {
  '00': Res.Tie,
  '11': Res.Tie,
  '01': Res.Victory,
  '10': Res.Failure
}
type SymbolCompare<A extends 0 | 1, B extends 0 | 1> = SymbolCompareResMap[`${A}${B}`]

type CompareHandler<
  AO extends NumberObject<NSymbol, [], []>,
  BO extends NumberObject<NSymbol, [], []>,
  I = NumberArrayCompare<AO['integer'], BO['integer'], true>,
  F = NumberArrayCompare<AO['fractional'], BO['fractional'], false>
> = 
  I extends Res.Failure ? false :
  I extends Res.Victory ? true :
  F extends Res.Victory ? true :
  false

/**
 * @description compare the size of numbers
 */
export type Compare<
    A extends number, 
    B extends number, 
    AO extends NumberObject<NSymbol, [], []> = CreateNumberObject<A>, 
    BO extends NumberObject<NSymbol, [], []> = CreateNumberObject<B>,
    IN extends boolean = IsNegative<A>,
    S =  SymbolCompare<AO['symbol'], BO['symbol']>,
    C = CompareHandler<AO, BO>
  > = 
    S extends Res.Failure ? false :
    S extends Res.Victory ? true :
      IN extends true
        ? C extends true ? false : true
        : C