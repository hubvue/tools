/**
 * @description Add an element to the end of an array or tuple type
 */
 export type Push<T extends unknown[], P extends unknown> = [...T, P]
