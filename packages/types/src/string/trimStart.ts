/**
 * @description removing spaces from the head of character types
 * @param T string
 */
 export type TrimStart<T extends string> =
 T extends ` ${infer TT}`
   ? TrimStart<TT>
   : T
