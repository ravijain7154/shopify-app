// Shopify HOST fix
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ["**/.*"],

  appDirectory: "app",

  // MUST BE CJS FOR SHOPIFY + RENDER
  serverModuleFormat: "esm",
  serverBuildTarget: "node-cjs",

  // Let Remix build its own server
  server: undefined,

  // OPTIONAL: your custom API routes
  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/api/products", "routes/api/products.js");
    });
  },

  future: {
    v3_singleFetch: true,
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,

    // JSON import fix
    unstable_jsonModules: true,
  },

  // Fix for "module" polyfill error
  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,
    },
  },
};
