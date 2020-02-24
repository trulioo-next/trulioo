/**
* Set and export Next configurations with next offline first (workbox/webpack)
**/

require('dotenv').config()
const withOffline = require('next-offline')
const withSass = require("@zeit/next-sass");
 
const nextConfig = {
  distDir: './build',
  generateSw: true,
  devSwSrc: './static/service-worker.js',
  workboxOpts: {},
  poweredByHeader: false,
}

module.exports = withOffline(withSass(nextConfig))