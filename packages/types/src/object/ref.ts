/**
 * @description 
 * @param T Convert original type to composite type
 */
export type Ref<T extends unknown> = {
  value: T
}
