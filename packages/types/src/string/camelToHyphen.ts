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
