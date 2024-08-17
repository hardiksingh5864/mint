import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ethers: "readonly",
        process: "readonly",
        require: "readonly",
        module: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];
