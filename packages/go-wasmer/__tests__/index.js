const { runWasm } = require('../dist/index.cjs')

runWasm('./add.wasm', [1, 2]).then(res => console.log(res))
