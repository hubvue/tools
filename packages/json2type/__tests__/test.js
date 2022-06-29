const  { json2type } = require('../dist/index.cjs')

async function run() {
  const result = await json2type({
    input: __dirname + 'tmp.json',
    language: 'go'
  })
  console.log('result', result)
}

run().catch(err => {
  console.log('err', err)
})
