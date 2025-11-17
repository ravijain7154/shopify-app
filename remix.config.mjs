// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server.
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
  serverModuleFormat: "esm",
  serverBuildTarget: "node-cjs",
  server: "./build/server/root.js",

  routes(defineRoutes) {
    return defineRoutes((route) => {
      route("/api/products", "routes/api/products.js");
    });
  },

  future: {
    v3_singleFetch: true,
    v3_throwAbortReason: true,
  },

  // 🔥 IMPORTANT FIX FOR SHOPIFY REMIX ERROR
  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,   // ⬅ enables polyfill for "module"
    },
  },
};
