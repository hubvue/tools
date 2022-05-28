/**
 * @description determine if the value is the string value
 * @param T unknown
 */
export type IsString<T extends unknown> = T extends string ? true : false
