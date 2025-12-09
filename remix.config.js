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

  serverModuleFormat: "esm",
    // Prevent CSS imports in server bundle
  ssr: true,
  serverBuildTarget: undefined,

  server: undefined,
  routes: undefined,
    // Vite output
  // assetsBuildDirectory: "public/build",
  publicPath: "/build/",

  future: {
    v3_singleFetch: true,
    v3_throwAbortReason: true,
    v3_relativeSplatPath: true,
    v3_fetcherPersist: true,
    v3_lazyRouteDiscovery: true,
    unstable_jsonModules: true,
  },
  serverDependenciesToBundle: [
    // Bundle server dependencies; CSS is handled separately by Vite plugin
    "@shopify/shopify-app-remix",
    "@shopify/shopify-app-remix/**",
     "@shopify/polaris",
    /^@shopify\/polaris.*/,
  ],
  browserNodeBuiltinsPolyfill: {
    modules: {
      module: true,
    },
  },
};

