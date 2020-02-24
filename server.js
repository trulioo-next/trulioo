const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')


const CONFIG = require('./next.config')
const APP_ENV = process.env

const PORT = APP_ENV.PORT || 8000
const IS_DEV_ENV = APP_ENV.NODE_ENV === 'development'
const QUITE_MODE = !IS_DEV_ENV
const PROJECT_DIR = './'


const App = next({
  dev: IS_DEV_ENV,
  dir: PROJECT_DIR,
  quiet: QUITE_MODE,
  conf: CONFIG
})

const handle = App.getRequestHandler()

App.prepare().then(() => {
  createServer((req, res) => {

    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)

  }).listen(PORT, err => {
    if (err) throw err
    console.log(`>  Server ready on http://localhost:${PORT} Env: ${APP_ENV.NODE_ENV}`)
  })
})
