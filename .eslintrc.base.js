module.exports = {
  "extends": [
    "airbnb/base",
    "plugin:import/errors",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parser": "babel-eslint",
  "env": {
    "mocha": true
  },
  "plugins": [
    "react",
    "json"
  ],
  "rules": {
    "import/no-extraneous-dependencies": ["error", { "optionalDependencies": true }],
    "no-use-before-define": 0,
    "arrow-body-style": 0,
    "dot-notation": 0,
    "no-console": 0,
    "react/jsx-key": 0,
    "react/sort-comp": 1,
    "arrow-parens": [1, "always"],
    "semi": [1, "never"],
    "max-len": 0,
    "no-shadow": 0,
    "jsx-quotes": [1, "prefer-single"],
    "function-paren-newline": ["error", "consistent"],
    "object-curly-newline": 0,
    "object-curly-spacing": 1,
    "comma-dangle": ["error", "always-multiline"],
  },
  "globals": {
    "fetch": true,
    "window": true,
    "document": true,
    "__DEV__": true,
    "__TEST__": true,
    "__CLIENT__": true,
    "__SERVER__": true,
    "__SSR__": true,
    "__PERSIST_GQL__": true,
    "__API_URL__": true,
    "__WEBSITE_URL__": true,
    "__FRONTEND_BUILD_DIR__": true,
    "__DLL_BUILD_DIR__": true
  }
}
