export type RandomGenerator = () => number
const DEFAULT_RANDOM_GENERATOR: RandomGenerator = Math.random
/**
 * @description Generate random numbers from [0, max]
 * @param max 
 * @param randomGenerator 
 * @returns 
 */
export const randomNumber = (max: number, randomGenerator = DEFAULT_RANDOM_GENERATOR) => {
  return Math.floor(randomGenerator() * (max + 1))
}
