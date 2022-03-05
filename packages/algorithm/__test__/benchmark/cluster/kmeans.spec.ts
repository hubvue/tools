import { kMeans } from '../../../src/cluster/k-means'
import Benchmark from 'benchmark'

const rawData = [[0, 0], [0, 1], [1, 3], [2, 0]]
const suite = new Benchmark.Suite()

suite
.add('k-means', () => {
  kMeans(rawData, 2)
})
.on('cycle', function(event: Event) {
  console.log(String(event.target))
})
.run({
  async: false
})