import fs from "fs";
import path from "path";

const file = path.resolve(
  "node_modules/@shopify/shopify-app-remix/dist/esm/react/components/AppProvider/AppProvider.mjs"
);

let content = fs.readFileSync(file, "utf8");

// Remove broken JSON import
content = content.replace(
  /import .*?locales\/en\.json.*?;/,
  `import englishI18n from "@shopify/polaris/locales/en.json";`
);

// Remove duplicate createRequire imports
content = content.replace(/import { createRequire }.*?;/g, "");

// Remove "const require = ..." if found
content = content.replace(/const require = createRequire\(.*?\);/g, "");

fs.writeFileSync(file, content, "utf8");

console.log("✅ Shopify AppProvider.mjs patched successfully.");
