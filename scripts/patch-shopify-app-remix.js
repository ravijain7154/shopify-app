const fs = require('fs');
const path = require('path');

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return false;
  let content = fs.readFileSync(filePath, 'utf8');
  const before = " with { type: 'json' };";
  const beforeDouble = ' with { type: "json" };';
  if (content.includes(before) || content.includes(beforeDouble)) {
    content = content.split(before).join(" assert { type: 'json' };");
    content = content.split(beforeDouble).join(' assert { type: "json" };');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched', filePath);
    return true;
  }
  return false;
}

const targets = [
  path.join('node_modules', '@shopify', 'shopify-app-remix', 'dist', 'esm', 'react', 'components', 'AppProvider', 'AppProvider.mjs')
];

let patchedAny = false;
for (const t of targets) {
  try {
    if (patchFile(t)) patchedAny = true;
  } catch (e) {
    // ignore
  }
}

if (!patchedAny) {
  console.log('No files patched (either already correct or not installed yet)');
}
