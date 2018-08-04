module.exports = {
  extends: '../../.eslintrc.base.js',
  settings: {
    'import/resolver': {
      webpack: { config: 'webpack.config.eslint.js', },
    }
  },
}
