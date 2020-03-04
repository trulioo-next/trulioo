/**
 * Set and export Next configurations with PWA optimizations (workbox/webpack)
 **/

const dotEnvResult = require("dotenv").config();
const Dotenv = require('dotenv-webpack')
const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const path = require("path");

if (process.env.NODE_ENV === "development") {
   process.traceDeprecation = true;
}

const nextConfig = {
  poweredByHeader: false,
  // target: 'serverless',
  webpack: (config, { buildId, dev, isServer }) => {
    config.node = { fs: "empty", net: "empty", tls: "empty" };

    config.resolve.alias["@"] = path.resolve(__dirname);

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [{ removeViewBox: false }]
            },
            titleProp: true
          }
        }
      ]
    });

    // Read the .env file
    config.plugins.push(new Dotenv({
        path: path.join(__dirname, 'sample.env'),
        systemvars: true
    }))

    // Here goes env that are available in the client side
    config.plugins.push(new webpack.EnvironmentPlugin(["VERSION", "ROOT_URL", "ENDPOINT_URL"]));

    return config;
  },

  env: {
    ...dotEnvResult
  }
};

module.exports = withCss(withSass(nextConfig));
