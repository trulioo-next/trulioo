module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    "quote-props": ["error", "consistent-as-needed"],
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ['@', __dirname]
        ]
      }
    }
  }
}
