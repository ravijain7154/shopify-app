import fs from "fs";
import path from "path";

const target = path.join(
  "node_modules",
  "@shopify",
  "shopify-app-remix",
  "dist",
  "esm",
  "react",
  "components",
  "AppProvider",
  "AppProvider.mjs"
);

if (!fs.existsSync(target)) {
  console.log("❌ AppProvider.mjs not found. Skipping.");
  process.exit(0);
}
let content = fs.readFileSync(target, "utf8");

const search = `import { RemixAppProvider as RemixAppProvider$1 } from "@shopify/remix-oxygen";`;
const replace = `import { RemixAppProvider as RemixAppProvider$1 } from "@shopify/remix-oxygen/dist/esm/react/components/RemixAppProvider/RemixAppProvider.mjs";`;
if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync(target, content, "utf8");
  console.log("✅ Patched AppProvider.mjs successfully.");
} else {
  console.log("❌ Pattern not found in AppProvider.mjs. No changes made.");
}
