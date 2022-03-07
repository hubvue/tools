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