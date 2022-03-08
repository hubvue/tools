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
  try {
    cd('docs')
    await $`rm -rf .git`
    await $`git init`
    await $`git add -A`
    await $`git commit -m'deploy'`
    await $`git remote add origin git@github.com:hubvue/tools.git`
    await $`git push -f git@github.com:hubvue/tools.git main:gh-pages`
  } catch(err) {
    console.log('err:', err)
  }
  
}

deploy()