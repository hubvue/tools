type Point = Array<number>

/**
 * @description k-means clustering algorithm typescript implementation
 * @param data original data
 * @param k number of prime points, also number of categories
 * @param threshold comparison threshold for prime iterations
 * @returns the result of the clustering, the mapping of prime points to the category array Hello world test
 */
export const kMeans = <T extends Point>(data: T[], k = 1, threshold = 0.1) => {
  const centroids = data.slice(0, k)
  const distances = Array.from({ length: data.length}, () => Array.from({length: k}, () => 0))
  const classes = new Map<T, T[]>()
  
  let iterator = true
  while(iterator) {
    iterator = false
    classes.clear()
    for (let idx in centroids) {
      classes.set(centroids[idx], [])
    }

    for (let idx in data) {
      for (let c = 0; c < k; c ++) {
        distances[idx][c] = Math.hypot(
          ...Object.keys(data[idx]).map(key => data[idx][key as unknown as number] - centroids[c][key as unknown as number])
        )
      }
      const min = distances[idx].indexOf(Math.min(...distances[idx]))
      const points = classes.get(centroids[min])
      points && points.push(data[idx])
    }
    let oldCentroids = [...new Set(centroids)]
    for (let c = 0; c < k; c ++) {
      centroids[c] = Array.from({length: data[0].length}, () => 0) as T
      const size = data.reduce((acc, point, idx) => {
        const points = classes.get(oldCentroids[c])
        if (points && points.includes(point)) {
          acc ++
          for (let idx in point) {
            centroids[c][idx] += point[idx]
          }
        }
        return acc
      }, 0)

      for (let key in centroids[c]) {
        centroids[c][key] = parseFloat(Number(centroids[c][key] / size).toFixed(2))
      }

    }
    for (let c = 0; c < k; c ++) {
      const diff = Math.hypot(
        ...Object.keys(oldCentroids[c]).map(key => oldCentroids[c][key as unknown as number] - centroids[c][key as unknown as number])
      )
      if (diff > threshold) {
        iterator = true
        break
      }
    }
  }
  return classes
}