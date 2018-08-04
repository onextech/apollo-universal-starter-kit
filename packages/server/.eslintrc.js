module.exports = {
  extends: "../../.eslintrc.base.js",
  settings: {
    "import/resolver": {
      webpack: { config: 'webpack.config.eslint.js' },
    }
  },
  "globals": {
    "__SERVER_PORT__": true
  }
}
