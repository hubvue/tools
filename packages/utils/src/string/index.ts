/**
 * @description tests whether the string s begins with prefix.
 * @param s origin string
 * @param prefix match string
 * @returns boolean
 */
export const hasPrefix = (s: string, prefix: string) => {
  return s.length >= prefix.length && s.substring(0, prefix.length) === prefix
}
