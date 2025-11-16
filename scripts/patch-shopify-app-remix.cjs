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

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else if (file.endsWith('.mjs') || file.endsWith('.js')) {
      callback(filePath);
    }
  }
}

const targets = [
  path.join('node_modules', '@shopify', 'shopify-app-remix', 'dist')
];

let patchedAny = false;
for (const targetDir of targets) {
  try {
    walkDir(targetDir, (filePath) => {
      if (patchFile(filePath)) patchedAny = true;
    });
  } catch (e) {
    // ignore
  }
}

if (!patchedAny) {
  console.log('No files patched (either already correct or not installed yet)');
}
