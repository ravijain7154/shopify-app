// import fs from "fs";
// import path from "path";

function patchs(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Remove "with { type: 'json' }"
  const patched = content.replace(/ with\s*\{\s*type:\s*'json'\s*\}/g, "");

  fs.writeFileSync(filePath, patched);
  console.log("✔ Patched:", filePath);
}

const esmPath = path.resolve(
  "node_modules/@shopify/shopify-app-remix/dist/esm/react/components/AppProvider/AppProvider.mjs"
);

const cjsPath = path.resolve(
  "node_modules/@shopify/shopify-app-remix/dist/cjs/react/components/AppProvider/AppProvider.js"
);

patchs(esmPath);
patchs(cjsPath);

import fs from "fs";
import path from "path";

function patch(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found:", filePath);
    return;
  }

  let content = fs.readFileSync(filePath, "utf8");

  // Add: assert { type: "json" }
  const patched = content.replace(
    /from\s+["'](.+?\.json)["'];/g,
    (match, p1) => `from "${p1}" assert { type: "json" };`
  );

  fs.writeFileSync(filePath, patched);
  console.log("✔ Patched JSON import in:", filePath);
}

// Polaris locale imports
const filesToPatch = [
  "node_modules/@shopify/polaris/dist/index.esm.js",
  "node_modules/@shopify/polaris/dist/index.cjs.js",
  "node_modules/@shopify/polaris/locales/en.json",
  "node_modules/@shopify/polaris/locales/fr.json"
];

filesToPatch.forEach((file) => patch(path.resolve(file)));
