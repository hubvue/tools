
import { isBrowser } from './env'

/**
 * @description Determine if the user is in dark mode
 * @returns 
 */
export const isDarkMode = () => {
  if (isBrowser() && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

/**
 * @description Generate random hexadecimal colour values
 * @returns 
 */
export const genHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
