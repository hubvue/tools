import { $, cd} from 'zx'
$.verbose = false

initErrHandler()
function initErrHandler() {
  process.on('unhandledRejection', (err, promise) => {
    console.log('err: ', err.toString())
  })
  process.on('uncaughtException', (err, origin) => {
    console.log('err: ', err.toString())
  })
}

async function deploy() {
  cd('docs')
  await $`rm -rf .git`
  await $`git init`
  await $`git add -A`
  await $`git commit -m'deploy'`
  await $`git push -f git@github.com:keverjs/kever-docs.git master:gh-pages`
}

deploy()