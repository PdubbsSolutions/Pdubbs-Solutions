import globals from "globals";


export default [
  { files: ["**/*.{js,mjs,ejs}"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
];

