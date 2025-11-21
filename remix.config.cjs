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
module.exports = {
  ignoredRouteFiles: ["**/.*"],

  appDirectory: "app",

  // IMPORTANT for Shopify + Render
  serverModuleFormat: "cjs",
  serverBuildTarget: "node-cjs",

  // Let Remix build server
  server: undefined,

  // Don't override routes (Shopify OAuth will break)
  routes: undefined,

  future: {
    v3_singleFetch: true,
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,

    unstable_jsonModules: true,
  },

  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,
    },
  },
};
