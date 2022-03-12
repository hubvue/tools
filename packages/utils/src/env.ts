/**
 * @description Get browser UserAgent
 * @returns 
 */
export const getUA = () => isBrowser() && window.navigator.userAgent
/**
 * @description Determine if the current environment is platform specific
 * @param platformRegexp Determining the regular expressions needed for a particular environment
 * @returns 
 */
export const isSpecificPlatform = (platformRegexp: RegExp) => {
  const UA = getUA()
  if (UA) {
    return !!UA.match(platformRegexp)
  }
  return false
}
/**
 * @description Determining whether the platform environment is a browser
 * @returns 
 */
export const isBrowser = () => typeof window !== 'undefined'
/**
 * Determining whether the platform environment is a alipay
 * @returns 
 */
export const isAlipay = () => isSpecificPlatform(/AlipayClient/i)
