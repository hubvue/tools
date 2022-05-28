/**
 * @description removing trailing spaces from character types
 * @param T string
 */
 export type TrimEnd<T extends string> =
 T extends `${infer TT} `
   ? TrimEnd<TT>
   : T
