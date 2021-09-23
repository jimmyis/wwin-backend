module.exports = {
  "root": true,
  "env": {
    es6: true,
    node: true,
  },
  "parserOptions": {
    "ecmaVersion": 2017,
    "parser": "babel-eslint",
  },
  "extends": ["eslint:recommended", "plugin:promise/recommended", "google"],
  "rules": {
    quotes: ["error", "double"],
  },
  "plugins": ["promise"],
};
