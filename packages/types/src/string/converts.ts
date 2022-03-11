/**
 * @description Camel to any hyphen
 * @param T String to be converted
 * @param H Hyphen example: '-' | '_'
 */
export type CamelToHyphen<T extends string, H extends string, P extends string = ''> = 
  T extends `${infer F}${infer R}` 
    ? F extends Uppercase<F>
      ? R extends ''
        ? `${P}${H}${Lowercase<F>}`
        : P extends ''
          ? CamelToHyphen<R, H, `${Lowercase<F>}`>
          : CamelToHyphen<R, H, `${P}${H}${Lowercase<F>}`>
      : R extends ''
        ? `${P}${F}`
        : CamelToHyphen<R, H, `${P}${F}`>
    : never

/**
 * @description Camel to any underline
 * @param T String to be converted
 */
export type CamelToUnderline<T extends string> = CamelToHyphen<T, '_'>

/**
 * @description Camel to any kebab
 * @param T String to be converted
 */
export type CamelToKebab<T extends string> = CamelToHyphen<T, '-'>

/**
 * @description Any hyphen to camel
 * @param T String to be converted
 * @param H Hyphen example: '-' | '_'
 */
export type HyphenToCamel<T extends string, H extends string, P extends string = ''> = 
  T extends `${infer F}${infer R}`
    ? F extends H
      ? R extends ''
        ? P
        : R extends `${infer F1}${infer R1}`
          ? R1 extends ''
            ? `${P}${Uppercase<F1>}`
            : P extends ''
              ? HyphenToCamel<R1, H, `${F1}`>
              : HyphenToCamel<R1, H, `${P}${Uppercase<F1>}`>
          : HyphenToCamel<R, H, P>
      : R extends ''
        ? `${P}${F}`
        : HyphenToCamel<R, H, `${P}${F}`>
    : never

/**
 * @description Kebab to camel
 * @param T String to be converted
 */
export type KebabToCamel<T extends string> = HyphenToCamel<T, '-'>

/**
 * @description Underline to camel
 * @param T String to be converted
 */
export type UnderlineToCamel<T extends string> = HyphenToCamel<T, '_'>

/**
 * @description Kebab or underline to camel
 * @param T String to be converted
 */
export type KebabOrUnderlineToCamel<T extends string> = HyphenToCamel<T, '_' | '-'>
