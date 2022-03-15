
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
/**
 * @description Determine if a string is a hexadecimal colour value
 * @param color color value
 * @returns 
 */
export const isHexColor = (color: string) => /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i.test(color)
