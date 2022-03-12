import { kMeans } from '../../src/cluster/k-means'

describe('k-means', () => {
  test('should divide the into two groups with k-means cluster', () => {
    const rawData = [[0, 0], [0, 1], [1, 3], [2, 0]]
    const result = kMeans(rawData, 2)
    expect(result.size).toBe(2)
    for (let value of result.values()) {
      expect(value.length).toBe(2)
    }
  })
})
