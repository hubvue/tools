/**
 * @description Array or tuple types delete the last child element type
 */
 export type Pop<T extends unknown[]> = T extends [...infer R, infer _] ? R : never
