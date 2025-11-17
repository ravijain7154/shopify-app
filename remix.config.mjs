// Shopify HOST fix
if (
  process.env.HOST &&
  (!process.env.SHOPIFY_APP_URL ||
    process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
  delete process.env.HOST;
}

export default {
  ignoredRouteFiles: ["**/.*"],
  appDirectory: "app",

  serverModuleFormat: "cjs",
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
    v3_routeConfig: true,
    unstable_jsonModules: true,
  },

  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,
    },
  },
};
