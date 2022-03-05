import { kMeans } from '../../../src/cluster/k-means'

import assert from 'assert'

describe('k-means', () => {
  it('should divide the into two groups with k-means cluster', () => {
    const rawData = [[0, 0], [0, 1], [1, 3], [2, 0]]
    const result = kMeans(rawData, 2)
    assert.equal(2, result.size)
    for (let value of result.values()) {
      assert.equal(2, value.length)
    }
  })
})