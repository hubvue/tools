#!/usr/bin/env node

const { json2type } = require('../dist/index.cjs')

const normalizeOptions = (args) => {
  return args.reduce((pre, item) => {
    const [key, value] = item.split('=')
    pre[key.slice(1)] = value
    return pre
  }, {})
}
const run = async () => {
  const options = normalizeOptions(process.argv.slice(2))
  const result = await json2type(options)
  console.log(result)
}

run().catch(err => {
  console.error(err)
})


