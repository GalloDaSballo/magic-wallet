module.exports = {
  extends: "airbnb-typescript-prettier",
  parser: "@typescript-eslint/parser",
  parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      sourceType: "module",
  },
  rules: {
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "import/extensions": [
          "error",
          "ignorePackages",
          {
              js: "never",
              ts: "never",
              tsx: "never",
          },
      ],
      "import/prefer-default-export": "off",
      "react/destructuring-assignment": "off",
      "react/react-in-jsx-scope": "off",
      "react/button-has-type": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "jsx-a11y/anchor-is-valid": "off",
  },
};
