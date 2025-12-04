/**
 * ESM Loader for handling CSS and asset files
 * This allows the server to ignore CSS imports at runtime
 */

const ASSET_EXTENSIONS = ['.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ttf', '.woff', '.woff2'];

export async function resolve(specifier, context, nextResolve) {
  // Skip CSS and asset files - return a dummy module
  if (ASSET_EXTENSIONS.some(ext => specifier.endsWith(ext))) {
    return {
      url: 'data:text/javascript,export default {};',
      shortCircuit: true,
    };
  }
  
  return nextResolve(specifier, context);
}

export async function getFormat(url, context, nextGetFormat) {
  if (url.startsWith('data:')) {
    return {
      format: 'module',
      shortCircuit: true,
    };
  }
  
  return nextGetFormat(url, context);
}

export async function getSource(url, context, nextGetSource) {
  if (url.startsWith('data:')) {
    // Extract source from data URL
    const source = url.replace('data:text/javascript,', '');
    return {
      source: source,
      format: 'module',
      shortCircuit: true,
    };
  }
  
  return nextGetSource(url, context);
}
