const path = require('path')

const root = path.join(__dirname, '../..')
const packages = path.join(__dirname, '..')

const config = {
  builders: {
    server: {
      entry: './src/index.ts',
      stack: ['server'],
      defines: {
        __SERVER__: true
      },
      enabled: true
    },
    test: {
      stack: ['server'],
      roles: ['test'],
      defines: {
        __TEST__: true
      }
    }
  },
  options: {
    stack: ['apollo', 'react', 'styled-components', 'css', 'sass', 'less', 'es6', 'js', 'ts', 'webpack', 'i18next'],
    cache: '../../.cache',
    ssr: true,
    webpackDll: true,
    reactHotLoader: false,
    persistGraphQL: false,
    frontendRefreshOnBackendChange: true,
    defines: {
      __DEV__: process.env.NODE_ENV !== 'production',
      __SERVER_PORT__: 8080,
      __API_URL__: '"/graphql"', // Use full URL if API is external, e.g. https://example.com/graphql
      __WEBSITE_URL__: '"http://localhost:3000"'
    },
    webpackConfig: {
      resolve: {
        alias: {
          root,
          packages,
          client: path.resolve(packages, 'client'),
          server: path.resolve(packages, 'server'),
          // 'styled-components': path.resolve(root, 'node_modules/styled-components'),
          'styled-components': require.resolve('styled-components'),
        },
      },
    },
  }
}

config.options.devProxy = config.options.ssr

if (process.env.NODE_ENV === 'production') {
  config.options.defines.__WEBSITE_URL__ = '"https://apollo-universal-starter-kit.herokuapp.com"'
  // Generating source maps for production will slowdown compilation for roughly 25%
  config.options.sourceMap = false
}

const extraDefines = {
  __SSR__: config.options.ssr,
  __FRONTEND_BUILD_DIR__: `"../client/build"`,
  __DLL_BUILD_DIR__: `"../client/build/dll"`
}

config.options.defines = Object.assign(config.options.defines, extraDefines)

module.exports = config
