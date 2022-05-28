/**
 * @description determines if the type exists in string type
 * @param T unknown[]
 * @param V unknown
 */
 export type Includes<T extends string, V extends string> = T extends `${infer _}${V}${infer _}` ? true : false
