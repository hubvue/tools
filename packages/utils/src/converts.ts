/**
 * @description Converting variables to characters via the toString method
 * @param value Variables to be processed
 * @returns 
 */
export const toString = (value: unknown) => Object.prototype.toString.call(value)
