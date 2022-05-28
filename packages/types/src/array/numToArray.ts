/**
 * @description Converts numbers into an array of equal length and fills it with the appropriate type
 * @param T number
 * @param F unknown
 */
 export type NumToArray<T extends number, F extends unknown = ''> = _NumToArray<T, F>
 type _NumToArray<T extends number, F extends unknown, R extends F[] = []> = 
   R['length'] extends T
     ? R
     : _NumToArray<T, F, [...R, F]>
 