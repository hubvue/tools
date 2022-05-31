import { Ref } from './ref'

/**
 * @description Unpack ref type
 * @param T object
 */
export type Raw<T extends Ref<unknown>> = T extends Ref<infer V> ? V : never
