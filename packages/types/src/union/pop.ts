import { Last } from './last'

/**
 * @description Remove last item of union type
 * @param T union type
 */
export type Pop<T extends unknown> = Exclude<T, Last<T>>
