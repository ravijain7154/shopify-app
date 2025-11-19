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

  /** 
   * IMPORTANT:
   * Shopify + Render require CommonJS format
   */
  serverModuleFormat: "mjs",
  serverBuildTarget: "node-mjs",

  /** Let Remix use its default server build */
  server: undefined,

  /** 
   * DO NOT add custom routes here — it breaks Shopify OAuth
   * Create API routes inside /app/routes/api/*.jsx
   */
  routes: undefined,

  future: {
    v3_singleFetch: true,
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,

    /** Allow JSON imports */
    unstable_jsonModules: true,
  },

  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,
    },
  },
};
