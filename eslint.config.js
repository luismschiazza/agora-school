const prettierPlugin = require("eslint-plugin-prettier");

module.exports = {
  plugins: {
    prettier: prettierPlugin
  },
  rules: {
    "prettier/prettier": "error"
  },
  ignores: ["node_modules", "dist"]
};