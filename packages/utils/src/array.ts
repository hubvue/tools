/**
 * @description Disorder the elements of an array
 * @param arr Arrays that need to be disordered
 * @returns 
 */
export const shuffle = (arr: unknown[]) => [...arr].sort(() => Math.random() - 0.5)

/**
 * @description De-duplicate array elements
 * @param arr Arrays to be de-duplicated
 * @returns 
 */
export const unique = (arr: unknown[]) => [...new Set(arr)]
