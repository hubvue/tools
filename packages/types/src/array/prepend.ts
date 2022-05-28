/**
 * @description Add an element to the head of an array or tuple type
 */
 export type Prepend<T extends unknown[], P extends unknown> = [P, ...T]
