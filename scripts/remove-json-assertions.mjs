import fs from "fs";
import path from "path";

function patch(filePath) {
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

patch(esmPath);
patch(cjsPath);
