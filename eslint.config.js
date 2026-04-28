const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    files: ["public/js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      globals: {
        ...globals.browser,
        module: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-var": "off",
      "eqeqeq": "off",
      "no-unused-vars": "off",
    },
  },
];
