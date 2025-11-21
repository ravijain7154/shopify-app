// // import fs from "fs";
// // import path from "path";

// const fs = require("fs");
// const path = require("path");

// const file = path.resolve(
//   "node_modules/@shopify/shopify-app-remix/dist/esm/react/components/AppProvider/AppProvider.mjs"
// );

// let code = fs.readFileSync(file, "utf8");

// // Remove the “with { type: 'json' }”
// code = code.replace(
//   /import englishI18n(.*)with\s*\{\s*type:\s*'json'\s*\}\s*;/,
//   `import englishI18n from "@shopify/polaris/locales/en.json";`
// );

// // OR force require()
// code = code.replace(
//   `import englishI18n from "@shopify/polaris/locales/en.json";`,
//   `const englishI18n = require("@shopify/polaris/locales/en.json");`
// );

// fs.writeFileSync(file, code, "utf8");

// console.log("✅ Shopify AppProvider patched!");


const fs = require("fs");
const path = require("path");

const file = path.resolve(
  "node_modules/@shopify/shopify-app-remix/dist/cjs/react/components/AppProvider/AppProvider.js"
);

let code = fs.readFileSync(file, "utf8");

code = code.replace(
  /import englishI18n(.*)with\s*\{\s*type:\s*'json'\s*\}\s*;/,
  `const englishI18n = require("@shopify/polaris/locales/en.json");`
);

fs.writeFileSync(file, code, "utf8");

console.log("✅ Shopify AppProvider patched!");

