module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "ArrayExpression": 1,
        "SwitchCase": 1,
      }
    ],
    "no-multi-spaces": [
      "error"
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "default-case": [
      "error"
    ],
    "no-unused-vars": [
      "error",
      {
        "args": "none",
        "caughtErrors": "none",
      }
    ],
    "no-empty": [
      "error",
      { "allowEmptyCatch": true }
    ]
  }
};
