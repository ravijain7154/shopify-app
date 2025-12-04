/**
 * Custom ESM loader to handle CSS and other asset imports
 * Allows Node.js to ignore CSS, images, and other assets at runtime
 */

const ASSET_EXTENSIONS = ['.css', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];

export async function resolve(specifier, context, nextResolve) {
  // Check if specifier ends with an asset extension
  if (ASSET_EXTENSIONS.some(ext => specifier.endsWith(ext))) {
    // Return a data URL that exports an empty object
    return {
      url: 'data:text/javascript;charset=utf-8,export default {}',
      shortCircuit: true,
    };
  }
  
  return nextResolve(specifier, context);
}

export async function getFormat(url, context, nextGetFormat) {
  // Handle data URLs
  if (url.startsWith('data:')) {
    return { format: 'module', shortCircuit: true };
  }
  return nextGetFormat(url, context);
}

export async function getSource(url, context, nextGetSource) {
  // Handle data URLs
  if (url.startsWith('data:')) {
    // Extract the source from data URL
    const source = decodeURIComponent(url.replace('data:text/javascript;charset=utf-8,', ''));
    return { source, format: 'module', shortCircuit: true };
  }
  return nextGetSource(url, context);
}
