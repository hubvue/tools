import { shuffle, unique } from '../src/array'

describe('array', () => {
  describe('shuffle', () => {

    test('The disordered array should be inconsistent with the original array', () => {
      const arr = [1, 2, 3, 4, 5, 6]
      expect(shuffle(arr)).not.toEqual(arr)
    })

    test('The shuffle method should not change the original array', () => {
      const arr = [1, 2, 3, 4, 5, 6]
      const arr1 = [1, 2, 3, 4, 5 ,6]
      shuffle(arr)
      expect(arr).toEqual(arr1)
    })
  })

  describe('unique', () => {

    test('Arrays with identical elements should be de-duplicated', () => {
      const arr = [1,2,3,4,4]
      expect(unique(arr).length).toBe(4)
    })

    test('The number de-duplication method should not affect the original array', () => {
      const arr = [1,2,3,4,4]
      unique(arr)
      expect(arr.length).toBe(5)
    })
  })
})
