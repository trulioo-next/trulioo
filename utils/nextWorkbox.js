const path = require('path')
const crypto = require('crypto')
const fs = require('fs-extra')
const findUp = require('find-up')

const {
  generateSWString,
  copyWorkboxLibraries,
  getModuleURL
} = require('workbox-build')


const getHash = ctx => crypto.createHash('sha1').update(ctx, 'utf8').digest('hex');

const defaultConfig = {
  globDirectory: './',
  globPatterns: [],
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^http[s|]?.*/,
      handler: 'StaleWhileRevalidate'
    }
  ],
  importScripts: [],
  distDir: '.next',
  importWorkboxFrom: 'local',
  precacheManifest: true,
  removeDir: true,
  buildId: null,
  uniqueId: false
}

class NextWorkbox {
  constructor(config) {
    const {
      distDir,
      importWorkboxFrom,
      precacheManifest,
      removeDir,
      buildId,
      uniqueId,
      swDestRoot,
      swURLRoot,
      ...swConfig
    } = {
      ...defaultConfig,
      ...config,
      swDest: config.swDest ? path.basename(config.swDest) : 'sw.js'
    }

    this.swConfig = swConfig
    this.options = {
      distDir,
      importWorkboxFrom,
      precacheManifest,
      removeDir,
      buildId,
      swDestRoot: swDestRoot || './static/workbox',
      swURLRoot: swURLRoot || '/static/workbox'
    }

    // build id come from next.js is exist
    if (!this.options.buildId) {
      throw 'Build id from next.js must be exist'
    }

    // clean up previous builts
    if (this.options.removeDir) {
      this.removeWorkboxDir(this.options)
    }
  }

  async importWorkboxLibraries({ importWorkboxFrom, swURLRoot, swDestRoot }) {
    if (this.options.importWorkboxFrom === 'local') {
      try {
        const workboxPkg = findUp.sync(
          'node_modules/workbox-sw/package.json',
          __dirname
        )
        const workboxName = path.basename(require(workboxPkg).main)
        return `${swURLRoot}/${await copyWorkboxLibraries(
          swDestRoot
        )}/${workboxName}`
      } catch (e) {
        throw e
      }
    } else {
      return getModuleURL('workbox-sw')
    }
  }

  globPrecacheManifest({ distDir, buildId }) {
    const precacheQuery = [
      {
        src: `${distDir}/static/runtime`,
        route: f => `/_next/static/runtime/${f}`,
        filter: f => /.js$/.test(f)
      },
      {
        src: `${distDir}/static/chunks`,
        route: f => `/_next/static/chunks/${f}`,
        filter: f => /.js$/.test(f)
      },
      {
        src: `${distDir}/static/${buildId}/pages`,
        route: f => `/_next/static/${buildId}/pages/${f}`,
        filter: f => f === '_app.js' || f === 'index.js'
      }
    ]

    return Promise.all(
      precacheQuery.map(query => {
        return new Promise(resolve => {
          fs.readdir(query.src, (err, files = []) => {
            resolve(files.filter(query.filter).map(f => query.route(f)))
          })
        })
      })
    ).then(files => files.reduce((c, p) => c.concat(p), []))
  }

  async importPrecacheManifest({ swDestRoot, swURLRoot }) {
    const manifest = await this.globPrecacheManifest(this.options)
    const context = `self.__precacheManifest = ${JSON.stringify(manifest)}`
    const output = `next-precache-manifest-${getHash(context)}.js`

    // dump out precached manifest for next pages, chunks
    fs.writeFileSync(path.join(swDestRoot, output), context)

    return `${swURLRoot}/${output}`
  }

  async generateSW(swDest, swConfig) {
    const { swString } = await generateSWString(swConfig)
    fs.writeFileSync(swDest, swString)
  }

  removeWorkboxDir({ swDestRoot }) {
    fs.removeSync(path.resolve(process.cwd(), swDestRoot))
  }

  createWorkboxDir({ swDestRoot }) {
    fs.mkdirpSync(path.resolve(process.cwd(), swDestRoot))
  }

  apply(compiler) {
    compiler.hooks.done.tap('done', async (stats) => {
      if (stats.toJson().errors.length > 0) return
      try {
        const { swDest, ...swConfig } = this.swConfig

        // create dest dir
        this.createWorkboxDir(this.options)

        // unshift workbox libs to the top of scripts
        swConfig.importScripts.unshift(
          await this.importWorkboxLibraries(this.options)
        )

        // push precached manifest to end of scripts
        if (this.options.precacheManifest) {
          swConfig.importScripts.push(
            await this.importPrecacheManifest(this.options)
          )
        }

        console.log(
          'Service worker file generated > ',
          path.join(this.options.swDestRoot, swDest)
        )

        await this.generateSW(
          path.join(this.options.swDestRoot, swDest),
          swConfig
        )
      } catch (e) {
        console.error(e)
      }
    })
  }
}

module.exports = NextWorkbox
