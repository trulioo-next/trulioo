/**
 * Set and export Next configurations with PWA optimizations (workbox/webpack)
 **/

const dotEnvResult = require('dotenv').config();
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const withCss = require('@zeit/next-css');
const path = require('path');

if (process.env.NODE_ENV === 'development') {
  process.traceDeprecation = true;
}

// exportTrailingSlash: true,
const nextConfig = {
  poweredByHeader: false,
  exportTrailingSlash: true,

  // target: 'serverless',
  webpack: (config, { buildId, dev, isServer }) => {
    config.node = { fs: 'empty', net: 'empty', tls: 'empty' };

    config.resolve.alias['@'] = path.resolve(__dirname);

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ removeViewBox: false }],
            },
            titleProp: true,
          },
        },
      ],
    });

    // Here goes env that are available in the client side
    config.plugins.push(
      new webpack.EnvironmentPlugin(['VERSION', 'ROOT_URL', 'ENDPOINT_URL']),
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    );

    return config;
  },

  // BEFORE DEPLOY, ADD THESE
  //  ...dotEnvResult

  env: {
    // ROOT_URL: 'https://ir-trulioo-react.herokuapp.com',
    // ENDPOINT_URL: 'https://irtrulioo4.wpengine.com/wp-json',
    // VERSION:'1.0.5',
     ...dotEnvResult,
  },

  sassLoaderOptions: {
    includePaths: ['static', 'styles'],
  },
};

module.exports = withSass(nextConfig);
