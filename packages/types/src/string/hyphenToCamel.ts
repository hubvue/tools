
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

