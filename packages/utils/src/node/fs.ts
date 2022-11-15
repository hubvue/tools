import { stat } from 'node:fs/promises'

/**
 * @description Determine whether the path exists
 * @param path string
 * @returns boolean
 */
export const exists = async (path: string) => {
  try {
    await stat(path)
    return true
  } catch(e) {
    return false
  }
}

/**
 * @description Determine whether the path is a directory
 * @param path string
 * @returns boolean
 */
export const isDir = async (path: string) => {
  try {
    return (await stat(path)).isDirectory()
  } catch(e) {
    return false
  }
}

/**
 * @description Determine whether the path is a file
 * @param path 
 * @returns 
 */
export const isFile = async (path: string) => {
  try {
    return (await (stat(path))).isFile()
  } catch(e) {
    return false
  }
}
