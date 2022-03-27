const { runWasm } = require('../dist/index.cjs')

const run = async () => {
  console.time('wasm1')
  process.stdout.on('data', (...args) => {
    console.log('data', args)
  })
  process.stdin.on('data', (...args) => {
    console.log('data', args)
  })
  const result = await runWasm('./add.wasm', [1, 2])
  console.log('result1', result)
  console.timeEnd('wasm1')

  console.time('wasm2')
  const result2 = await runWasm('./add.wasm', [3, 4])
  console.log('result2', result2)
  console.timeEnd('wasm2')
}

run()
