// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the remix server. The CLI will eventually
// stop passing in HOST, so we can remove this workaround after the next major release.
if (
    process.env.HOST &&
    (!process.env.SHOPIFY_APP_URL ||
        process.env.SHOPIFY_APP_URL === process.env.HOST)
) {
    process.env.SHOPIFY_APP_URL = process.env.HOST;
    delete process.env.HOST;
}

/** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//   ignoredRouteFiles: ["**/.*"],
//   appDirectory: "app",
//   serverModuleFormat: "js",
//   serverBuildTarget: "vercel",
//   server: "./build/server/index.js",
//   dev: {
//     port: process.env.HMR_SERVER_PORT || 8002,
//   },
//   future: {
//     // Add any future configurations if neede
//   },
// };
// import pkg from '@remix-run/dev';
// const { defineConfig } = pkg;
// import { defineConfig } from '@remix-run/dev';

export default {
    ignoredRouteFiles: ["**/.*"],
    appDirectory: "app",
    serverModuleFormat: "esm", // Ensure this matches your module system
    serverBuildTarget: "node-cjs", // Ensure this matches your build target
    // server: "./build/server/index.js",
    server: "./build/server/root.js",
    routes(defineRoutes) {
        return defineRoutes(route => {
            route("/api/products", "routes/api/products.js");
        });
    },
    // future: {
    //     v2_routeConvention: true,
    // },
};