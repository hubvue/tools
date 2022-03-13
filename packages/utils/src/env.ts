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
 * @description Determining whether the platform environment is a alipay
 * @returns 
 */
export const isAlipay = () => isSpecificPlatform(/AlipayClient/i)
/**
 * @description Determining whether the platform environment is a wechat
 * @returns 
 */
export const isWechat = () => isSpecificPlatform(/MicroMessenger/i)
/**
 * @description Determining whether the platform environment is a corporate weChat
 * @returns 
 */
export const isWechatWork = () => isSpecificPlatform(/wxwork/i)
/**
 * @description Determining whether the platform environment is a QQ
 * @returns 
 */
export const isQQ = () => isSpecificPlatform(/QQ/i)
/**
 * @description Determining whether the platform environment is a douyin
 * @returns 
 */
export const isDouyin = () => isSpecificPlatform(/aweme/i)
/**
 * @description Determining whether the platform environment is a android
 * @returns 
 */
export const isAndroid = () => isSpecificPlatform(/Android/i)
/**
 * @description Determining whether the platform environment is a ios
 * @returns 
 */
export const isIos = () => isSpecificPlatform(/iphone|ipad|ipod|ios/i)
/**
 * @description Determining whether the platform environment is a ipad
 * @returns 
 */
export const isPad = () => isSpecificPlatform(/ipad/i)
/**
 * @description Determining whether the platform environment is a windows
 * @returns 
 */
export const isWindows = () => isSpecificPlatform(/Windows/i)
/**
 * @description Determining whether the platform environment is a macos
 * @returns 
 */
export const isMacos = () => isSpecificPlatform(/Macintosh|Mac/i)
