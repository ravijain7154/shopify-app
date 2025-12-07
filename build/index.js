var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.jsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { isbot } from "isbot";

// app/shopify.server.js
import "@shopify/shopify-app-remix/adapters/node";
import {
  ApiVersion,
  AppDistribution,
  shopifyApp
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";

// app/db.server.js
import { PrismaClient } from "@prisma/client";
var prisma = global.prisma || new PrismaClient(), db_server_default = prisma;

// app/shopify.server.js
var shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(db_server_default),
  distribution: AppDistribution.AppStore,
  restResources,
  future: {
    unstable_newEmbeddedAuthStrategy: !0
  },
  ...process.env.SHOP_CUSTOM_DOMAIN ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] } : {}
});
var apiVersion = ApiVersion.July24, addDocumentResponseHeaders = shopify.addDocumentResponseHeaders, authenticate = shopify.authenticate, unauthenticated = shopify.unauthenticated, login = shopify.login, registerWebhooks = shopify.registerWebhooks, sessionStorage = shopify.sessionStorage;

// app/entry.server.jsx
import { jsx } from "react/jsx-runtime";
var ABORT_DELAY = 5e3;
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  addDocumentResponseHeaders(request, responseHeaders);
  let userAgent = request.headers.get("user-agent"), callbackName = isbot(userAgent ?? "") ? "onAllReady" : "onShellReady";
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        [callbackName]: () => {
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.jsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  headers: () => headers,
  links: () => links,
  loader: () => loader
});
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError, Links, Meta, Outlet, Scripts, ScrollRestoration, useFetcher, useRevalidator } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider, Button, Card, BlockStack, Text, InlineStack } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient as PrismaClient2 } from "@prisma/client";
import { useState, useEffect } from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var prisma2 = new PrismaClient2(), links = () => [
  { rel: "stylesheet", href: polarisStyles },
  { rel: "stylesheet", href: "./custom/admin-style.css" }
], loader = async () => {
  let fetchDiamondsFromDB = await prisma2.diamond.findMany(), colorSetting = await prisma2.colorsetting.findFirst();
  return colorSetting || (colorSetting = await prisma2.colorsetting.create({
    data: { color: "#ffffff" }
  })), json({
    products: fetchDiamondsFromDB,
    color: colorSetting.color,
    message: `Total diamonds in database: ${fetchDiamondsFromDB.length}`,
    syncCount: null
  });
};
function App() {
  let loaderData = useLoaderData(), fetcher = useFetcher(), revalidator = useRevalidator(), [isSyncing, setIsSyncing] = useState(!1), [syncMessage, setSyncMessage] = useState(null), { products, message, color, syncCount } = loaderData || {
    products: [],
    message: "Loading...",
    color: "#ffffff",
    syncCount: null
  };
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setIsSyncing(!1), setSyncMessage(fetcher.data.message), fetcher.data.success && revalidator.revalidate();
      let timer = setTimeout(() => setSyncMessage(null), 5e3);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, revalidator]);
  let handleSync = () => {
    setIsSyncing(!0), setSyncMessage("Syncing diamonds..."), fetcher.submit(
      { sync: "true" },
      { method: "post", action: "/api/sync" }
    );
  };
  return !products || !Array.isArray(products) ? /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2("div", { children: "Error: Products data is not available" }),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] }) : /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx2("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx2("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx2("link", { rel: "preconnect", href: "https://cdn.shopify.com/" }),
      /* @__PURE__ */ jsx2(
        "link",
        {
          rel: "stylesheet",
          href: "https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        }
      ),
      /* @__PURE__ */ jsx2(Meta, {}),
      /* @__PURE__ */ jsx2(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx2(AppProvider, { children: /* @__PURE__ */ jsx2("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "admin_dash", children: [
        /* @__PURE__ */ jsx2("h1", { className: "title", children: "Diamonds Management" }),
        /* @__PURE__ */ jsx2(Card, { children: /* @__PURE__ */ jsx2(BlockStack, { gap: "300", children: /* @__PURE__ */ jsxs(InlineStack, { align: "space-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx2("h2", { children: "Database Status" }),
            /* @__PURE__ */ jsx2("p", { className: "text", children: message }),
            syncMessage && /* @__PURE__ */ jsx2(Text, { as: "p", variant: "bodyMd", color: fetcher.data?.success ? "success" : "critical", children: syncMessage })
          ] }),
          /* @__PURE__ */ jsx2(
            Button,
            {
              onClick: handleSync,
              disabled: isSyncing,
              variant: "primary",
              children: isSyncing ? "Syncing..." : "Sync Diamonds"
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx2(Outlet, {})
      ] }) }) }),
      /* @__PURE__ */ jsx2(ScrollRestoration, {}),
      /* @__PURE__ */ jsx2(Scripts, {})
    ] })
  ] });
}
function ErrorBoundary() {
  let error = useRouteError();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx2("h2", { children: "Something went wrong" }),
    /* @__PURE__ */ jsx2("pre", { children: error.message })
  ] });
}
var headers = (headersArgs) => boundary.headers(headersArgs);

// app/routes/app.additional.jsx
var app_additional_exports = {};
__export(app_additional_exports, {
  default: () => AdditionalPage
});
import {
  Box,
  Card as Card2,
  Layout,
  Link as Link2,
  List,
  Page,
  Text as Text2,
  BlockStack as BlockStack2
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function AdditionalPage() {
  return /* @__PURE__ */ jsxs2(Page, { children: [
    /* @__PURE__ */ jsx3(TitleBar, { title: "Additional page" }),
    /* @__PURE__ */ jsxs2(Layout, { children: [
      /* @__PURE__ */ jsx3(Layout.Section, { children: /* @__PURE__ */ jsx3(Card2, { children: /* @__PURE__ */ jsxs2(BlockStack2, { gap: "300", children: [
        /* @__PURE__ */ jsxs2(Text2, { as: "p", variant: "bodyMd", children: [
          "The app template comes with an additional page which demonstrates how to create multiple pages within app navigation using",
          " ",
          /* @__PURE__ */ jsx3(
            Link2,
            {
              url: "https://shopify.dev/docs/apps/tools/app-bridge",
              target: "_blank",
              removeUnderline: !0,
              children: "App Bridge"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsxs2(Text2, { as: "p", variant: "bodyMd", children: [
          "To create your own page and have it show up in the app navigation, add a page inside ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes" }),
          ", and a link to it in the ",
          /* @__PURE__ */ jsx3(Code, { children: "<NavMenu>" }),
          " component found in ",
          /* @__PURE__ */ jsx3(Code, { children: "app/routes/app.jsx" }),
          "."
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx3(Layout.Section, { variant: "oneThird", children: /* @__PURE__ */ jsx3(Card2, { children: /* @__PURE__ */ jsxs2(BlockStack2, { gap: "200", children: [
        /* @__PURE__ */ jsx3(Text2, { as: "h2", variant: "headingMd", children: "Resources" }),
        /* @__PURE__ */ jsx3(List, { children: /* @__PURE__ */ jsx3(List.Item, { children: /* @__PURE__ */ jsx3(
          Link2,
          {
            url: "https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav",
            target: "_blank",
            removeUnderline: !0,
            children: "App nav best practices"
          }
        ) }) })
      ] }) }) })
    ] })
  ] });
}
function Code({ children }) {
  return /* @__PURE__ */ jsx3(
    Box,
    {
      as: "span",
      padding: "025",
      paddingInlineStart: "100",
      paddingInlineEnd: "100",
      background: "bg-surface-active",
      borderWidth: "025",
      borderColor: "border",
      borderRadius: "100",
      children: /* @__PURE__ */ jsx3("code", { children })
    }
  );
}

// app/routes/app._index.jsx
var app_index_exports = {};
__export(app_index_exports, {
  action: () => action,
  default: () => Index,
  loader: () => loader2
});
import { useEffect as useEffect2 } from "react";
import { json as json2 } from "@remix-run/node";
import { useFetcher as useFetcher2 } from "@remix-run/react";
import {
  Page as Page2,
  Layout as Layout2,
  Text as Text3,
  Card as Card3,
  Button as Button2,
  BlockStack as BlockStack3,
  Box as Box2,
  List as List2,
  Link as Link3,
  InlineStack as InlineStack2
} from "@shopify/polaris";
import { TitleBar as TitleBar2, useAppBridge } from "@shopify/app-bridge-react";
import { Fragment, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var loader2 = async ({ request }) => (await authenticate.admin(request), null), action = async ({ request }) => {
  let { admin } = await authenticate.admin(request), color = ["Red", "Orange", "Yellow", "Green"][Math.floor(Math.random() * 4)], responseJson = await (await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`
        }
      }
    }
  )).json(), product = responseJson.data.productCreate.product, variantId = product.variants.edges[0].node.id, variantResponseJson = await (await admin.graphql(
    `#graphql
    mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }]
      }
    }
  )).json();
  return json2({
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants
  });
};
function Index() {
  let fetcher = useFetcher2(), shopify2 = useAppBridge(), isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST", productId = fetcher.data?.product?.id.replace(
    "gid://shopify/Product/",
    ""
  );
  useEffect2(() => {
    productId && shopify2.toast.show("Product created");
  }, [productId, shopify2]);
  let generateProduct = () => fetcher.submit({}, { method: "POST" });
  return /* @__PURE__ */ jsxs3(Page2, { children: [
    /* @__PURE__ */ jsx4(TitleBar2, { title: "Remix app template", children: /* @__PURE__ */ jsx4("button", { variant: "primary", onClick: generateProduct, children: "Generate a product" }) }),
    /* @__PURE__ */ jsx4(BlockStack3, { gap: "500", children: /* @__PURE__ */ jsxs3(Layout2, { children: [
      /* @__PURE__ */ jsx4(Layout2.Section, { children: /* @__PURE__ */ jsx4(Card3, { children: /* @__PURE__ */ jsxs3(BlockStack3, { gap: "500", children: [
        /* @__PURE__ */ jsxs3(BlockStack3, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text3, { as: "h2", variant: "headingMd", children: "Congrats on creating a new Shopify app \u{1F389}" }),
          /* @__PURE__ */ jsxs3(Text3, { variant: "bodyMd", as: "p", children: [
            "This embedded app template uses",
            " ",
            /* @__PURE__ */ jsx4(
              Link3,
              {
                url: "https://shopify.dev/docs/apps/tools/app-bridge",
                target: "_blank",
                removeUnderline: !0,
                children: "App Bridge"
              }
            ),
            " ",
            "interface examples like an",
            " ",
            /* @__PURE__ */ jsx4(Link3, { url: "/app/additional", removeUnderline: !0, children: "additional page in the app nav" }),
            ", as well as an",
            " ",
            /* @__PURE__ */ jsx4(
              Link3,
              {
                url: "https://shopify.dev/docs/api/admin-graphql",
                target: "_blank",
                removeUnderline: !0,
                children: "Admin GraphQL"
              }
            ),
            " ",
            "mutation demo, to provide a starting point for app development."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(BlockStack3, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text3, { as: "h3", variant: "headingMd", children: "Get started with products" }),
          /* @__PURE__ */ jsxs3(Text3, { as: "p", variant: "bodyMd", children: [
            "Generate a product with GraphQL and get the JSON output for that product. Learn more about the",
            " ",
            /* @__PURE__ */ jsx4(
              Link3,
              {
                url: "https://shopify.dev/docs/api/admin-graphql/latest/mutations/productCreate",
                target: "_blank",
                removeUnderline: !0,
                children: "productCreate"
              }
            ),
            " ",
            "mutation in our API references."
          ] })
        ] }),
        /* @__PURE__ */ jsxs3(InlineStack2, { gap: "300", children: [
          /* @__PURE__ */ jsx4(Button2, { loading: isLoading, onClick: generateProduct, children: "Generate a product" }),
          fetcher.data?.product && /* @__PURE__ */ jsx4(
            Button2,
            {
              url: `shopify:admin/products/${productId}`,
              target: "_blank",
              variant: "plain",
              children: "View product"
            }
          )
        ] }),
        fetcher.data?.product && /* @__PURE__ */ jsxs3(Fragment, { children: [
          /* @__PURE__ */ jsxs3(Text3, { as: "h3", variant: "headingMd", children: [
            " ",
            "productCreate mutation"
          ] }),
          /* @__PURE__ */ jsx4(
            Box2,
            {
              padding: "400",
              background: "bg-surface-active",
              borderWidth: "025",
              borderRadius: "200",
              borderColor: "border",
              overflowX: "scroll",
              children: /* @__PURE__ */ jsx4("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx4("code", { children: JSON.stringify(fetcher.data.product, null, 2) }) })
            }
          ),
          /* @__PURE__ */ jsxs3(Text3, { as: "h3", variant: "headingMd", children: [
            " ",
            "productVariantsBulkUpdate mutation"
          ] }),
          /* @__PURE__ */ jsx4(
            Box2,
            {
              padding: "400",
              background: "bg-surface-active",
              borderWidth: "025",
              borderRadius: "200",
              borderColor: "border",
              overflowX: "scroll",
              children: /* @__PURE__ */ jsx4("pre", { style: { margin: 0 }, children: /* @__PURE__ */ jsx4("code", { children: JSON.stringify(fetcher.data.variant, null, 2) }) })
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx4(Layout2.Section, { variant: "oneThird", children: /* @__PURE__ */ jsxs3(BlockStack3, { gap: "500", children: [
        /* @__PURE__ */ jsx4(Card3, { children: /* @__PURE__ */ jsxs3(BlockStack3, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text3, { as: "h2", variant: "headingMd", children: "App template specs" }),
          /* @__PURE__ */ jsxs3(BlockStack3, { gap: "200", children: [
            /* @__PURE__ */ jsxs3(InlineStack2, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text3, { as: "span", variant: "bodyMd", children: "Framework" }),
              /* @__PURE__ */ jsx4(
                Link3,
                {
                  url: "https://remix.run",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Remix"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack2, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text3, { as: "span", variant: "bodyMd", children: "Database" }),
              /* @__PURE__ */ jsx4(
                Link3,
                {
                  url: "https://www.prisma.io/",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "Prisma"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack2, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text3, { as: "span", variant: "bodyMd", children: "Interface" }),
              /* @__PURE__ */ jsxs3("span", { children: [
                /* @__PURE__ */ jsx4(
                  Link3,
                  {
                    url: "https://polaris.shopify.com",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "Polaris"
                  }
                ),
                ", ",
                /* @__PURE__ */ jsx4(
                  Link3,
                  {
                    url: "https://shopify.dev/docs/apps/tools/app-bridge",
                    target: "_blank",
                    removeUnderline: !0,
                    children: "App Bridge"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs3(InlineStack2, { align: "space-between", children: [
              /* @__PURE__ */ jsx4(Text3, { as: "span", variant: "bodyMd", children: "API" }),
              /* @__PURE__ */ jsx4(
                Link3,
                {
                  url: "https://shopify.dev/docs/api/admin-graphql",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphQL API"
                }
              )
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx4(Card3, { children: /* @__PURE__ */ jsxs3(BlockStack3, { gap: "200", children: [
          /* @__PURE__ */ jsx4(Text3, { as: "h2", variant: "headingMd", children: "Next steps" }),
          /* @__PURE__ */ jsxs3(List2, { children: [
            /* @__PURE__ */ jsxs3(List2.Item, { children: [
              "Build an",
              " ",
              /* @__PURE__ */ jsxs3(
                Link3,
                {
                  url: "https://shopify.dev/docs/apps/getting-started/build-app-example",
                  target: "_blank",
                  removeUnderline: !0,
                  children: [
                    " ",
                    "example app"
                  ]
                }
              ),
              " ",
              "to get started"
            ] }),
            /* @__PURE__ */ jsxs3(List2.Item, { children: [
              "Explore Shopify\u2019s API with",
              " ",
              /* @__PURE__ */ jsx4(
                Link3,
                {
                  url: "https://shopify.dev/docs/apps/tools/graphiql-admin-api",
                  target: "_blank",
                  removeUnderline: !0,
                  children: "GraphiQL"
                }
              )
            ] })
          ] })
        ] }) })
      ] }) })
    ] }) })
  ] });
}

// app/routes/auth.login/route.jsx
var route_exports = {};
__export(route_exports, {
  action: () => action2,
  default: () => Auth,
  links: () => links2,
  loader: () => loader3
});
import { useState as useState2 } from "react";
import { json as json3 } from "@remix-run/node";
import { Form, useActionData, useLoaderData as useLoaderData2 } from "@remix-run/react";
import {
  AppProvider as PolarisAppProvider,
  Button as Button3,
  Card as Card4,
  FormLayout,
  Page as Page3,
  Text as Text4,
  TextField
} from "@shopify/polaris";
import polarisStyles2 from "@shopify/polaris/build/esm/styles.css?url";

// app/routes/auth.login/error.server.jsx
import { LoginErrorType } from "@shopify/shopify-app-remix/server";
function loginErrorMessage(loginErrors) {
  return loginErrors?.shop === LoginErrorType.MissingShop ? { shop: "Please enter your shop domain to log in" } : loginErrors?.shop === LoginErrorType.InvalidShop ? { shop: "Please enter a valid shop domain to log in" } : {};
}

// app/routes/auth.login/route.jsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var links2 = () => [{ rel: "stylesheet", href: polarisStyles2 }], loader3 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json3({ errors });
}, action2 = async ({ request }) => {
  let errors = loginErrorMessage(await login(request));
  return json3({
    errors
  });
};
function Auth() {
  let loaderData = useLoaderData2(), actionData = useActionData(), [shop, setShop] = useState2(""), { errors } = actionData || loaderData;
  return (
    // <PolarisAppProvider i18n={loaderData.polarisTranslations}>
    /* @__PURE__ */ jsx5(PolarisAppProvider, { children: /* @__PURE__ */ jsx5(Page3, { children: /* @__PURE__ */ jsx5(Card4, { children: /* @__PURE__ */ jsx5(Form, { method: "post", children: /* @__PURE__ */ jsxs4(FormLayout, { children: [
      /* @__PURE__ */ jsx5(Text4, { variant: "headingMd", as: "h2", children: "Log in" }),
      /* @__PURE__ */ jsx5(
        TextField,
        {
          type: "text",
          name: "shop",
          label: "Shop domain",
          helpText: "example.myshopify.com",
          value: shop,
          onChange: setShop,
          autoComplete: "on",
          error: errors.shop
        }
      ),
      /* @__PURE__ */ jsx5(Button3, { submit: !0, children: "Log in" })
    ] }) }) }) }) })
  );
}

// app/routes/webhooks.jsx
var webhooks_exports = {};
__export(webhooks_exports, {
  action: () => action3
});
var action3 = async ({ request }) => {
  let { topic, shop, session, admin } = await authenticate.webhook(request), normalizedTopic = topic && topic.replace(/\//g, "_").toUpperCase();
  if (!admin && normalizedTopic !== "SHOP_REDACT")
    throw new Response();
  switch (normalizedTopic) {
    case "APP_UNINSTALLED":
      session && await db_server_default.session.deleteMany({ where: { shop } });
      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response();
};

// app/routes/auth.$.jsx
var auth_exports = {};
__export(auth_exports, {
  loader: () => loader4
});
var loader4 = async ({ request }) => (await authenticate.admin(request), null);

// app/routes/_index/route.jsx
var route_exports2 = {};
__export(route_exports2, {
  default: () => App2,
  loader: () => loader5
});
import { json as json4, redirect } from "@remix-run/node";
import { Form as Form2, useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/routes/_index/styles.module.css
var styles_module_default = { index: "LQCYp", heading: "bVg-E", text: "_5LEJl", content: "IjJz7", form: "sI1Wg", label: "py2aZ", input: "k8y5b", button: "DcRe8", list: "qyGLW" };

// app/routes/_index/route.jsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var loader5 = async ({ request }) => {
  let url = new URL(request.url);
  if (url.searchParams.get("shop"))
    throw redirect(`/app?${url.searchParams.toString()}`);
  return json4({ showForm: Boolean(login) });
};
function App2() {
  let { showForm } = useLoaderData3();
  return /* @__PURE__ */ jsx6("div", { className: styles_module_default.index, children: /* @__PURE__ */ jsxs5("div", { className: styles_module_default.content, children: [
    /* @__PURE__ */ jsx6("h1", { className: styles_module_default.heading, children: "A short heading about [your app]" }),
    /* @__PURE__ */ jsx6("p", { className: styles_module_default.text, children: "A tagline about [your app] that describes your value proposition." }),
    showForm && /* @__PURE__ */ jsxs5(Form2, { className: styles_module_default.form, method: "post", action: "/auth/login", children: [
      /* @__PURE__ */ jsxs5("label", { className: styles_module_default.label, children: [
        /* @__PURE__ */ jsx6("span", { children: "Shop domain" }),
        /* @__PURE__ */ jsx6("input", { className: styles_module_default.input, type: "text", name: "shop" }),
        /* @__PURE__ */ jsx6("span", { children: "e.g: my-shop-domain.myshopify.com" })
      ] }),
      /* @__PURE__ */ jsx6("button", { className: styles_module_default.button, type: "submit", children: "Log in" })
    ] }),
    /* @__PURE__ */ jsxs5("ul", { className: styles_module_default.list, children: [
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] }),
      /* @__PURE__ */ jsxs5("li", { children: [
        /* @__PURE__ */ jsx6("strong", { children: "Product feature" }),
        ". Some detail about your feature and its benefit to your customer."
      ] })
    ] })
  ] }) });
}

// app/routes/app.jsx
var app_exports = {};
__export(app_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  action: () => action4,
  default: () => AppRoute,
  loader: () => loader6
});
import { json as json5 } from "@remix-run/node";
import { useLoaderData as useLoaderData4, useActionData as useActionData2, Form as Form3 } from "@remix-run/react";
import { PrismaClient as PrismaClient3 } from "@prisma/client";
import "@shopify/app-bridge-react";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var prisma3 = new PrismaClient3(), loader6 = async () => {
  try {
    let colorSetting = await prisma3.colorsetting.findFirst();
    return json5({
      color: colorSetting?.color || "#ffffff"
    });
  } catch (error) {
    return console.error("Loader error:", error), json5({ color: "#ffffff" });
  }
}, action4 = async ({ request }) => {
  try {
    let color = (await request.formData()).get("color") || "#ffffff";
    return await prisma3.colorsetting.upsert({
      where: { id: 1 },
      update: { color },
      create: { color }
    }), json5({
      message: "Color saved successfully!",
      color
    });
  } catch (error) {
    return console.error("Error saving color:", error), json5({ error: "Failed to save color" }, { status: 500 });
  }
};
function AppRoute() {
  let { color } = useLoaderData4(), actionData = useActionData2();
  return /* @__PURE__ */ jsxs6(Fragment2, { children: [
    /* @__PURE__ */ jsx7("h2", { children: "Customize Appearance" }),
    /* @__PURE__ */ jsxs6(Form3, { method: "post", children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("label", { htmlFor: "color", children: "Select Color: " }),
        /* @__PURE__ */ jsx7(
          "input",
          {
            type: "color",
            name: "color",
            id: "color",
            defaultValue: color,
            required: !0
          }
        )
      ] }),
      actionData?.error && /* @__PURE__ */ jsx7("div", { style: { color: "red" }, children: actionData.error }),
      actionData?.message && /* @__PURE__ */ jsx7("div", { style: { color: "green" }, children: actionData.message }),
      /* @__PURE__ */ jsx7("button", { type: "submit", children: "Save Color" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { children: [
      /* @__PURE__ */ jsx7("p", { children: "Current Color:" }),
      /* @__PURE__ */ jsx7(
        "div",
        {
          style: {
            width: "50px",
            height: "50px",
            backgroundColor: actionData?.color || color,
            border: "1px solid #000"
          }
        }
      )
    ] })
  ] });
}
function ErrorBoundary2() {
  return /* @__PURE__ */ jsx7("div", { children: "Something went wrong in the app route!" });
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-GPHPYLJS.js", imports: ["/build/_shared/chunk-TTPYNCTF.js", "/build/_shared/chunk-TQC3RT7F.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-ILJ6MXTR.js", imports: ["/build/_shared/chunk-J47K56SK.js", "/build/_shared/chunk-GDERO7BA.js", "/build/_shared/chunk-4NWZINHR.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-JMEY2S4E.js", imports: ["/build/_shared/chunk-WK3XIJ7S.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app": { id: "routes/app", parentId: "root", path: "app", index: void 0, caseSensitive: void 0, module: "/build/routes/app-5KA6VHRC.js", imports: ["/build/_shared/chunk-P3J47CQI.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !0 }, "routes/app._index": { id: "routes/app._index", parentId: "routes/app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/app._index-VWEWUNCM.js", imports: ["/build/_shared/chunk-4NWZINHR.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/app.additional": { id: "routes/app.additional", parentId: "routes/app", path: "additional", index: void 0, caseSensitive: void 0, module: "/build/routes/app.additional-UANKBRS4.js", imports: ["/build/_shared/chunk-4NWZINHR.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.$": { id: "routes/auth.$", parentId: "root", path: "auth/*", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.$-JID2MVQG.js", imports: void 0, hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/auth.login": { id: "routes/auth.login", parentId: "root", path: "auth/login", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.login-Z47NSTWJ.js", imports: ["/build/_shared/chunk-WK3XIJ7S.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/webhooks": { id: "routes/webhooks", parentId: "root", path: "webhooks", index: void 0, caseSensitive: void 0, module: "/build/routes/webhooks-U3VAOICH.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "3d0450d0", hmr: void 0, url: "/build/manifest-3D0450D0.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "production", assetsBuildDirectory = "public\\build", future = { v3_fetcherPersist: !0, v3_relativeSplatPath: !0, v3_throwAbortReason: !0, v3_routeConfig: !1, v3_singleFetch: !0, v3_lazyRouteDiscovery: !0, unstable_optimizeDeps: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/app.additional": {
    id: "routes/app.additional",
    parentId: "routes/app",
    path: "additional",
    index: void 0,
    caseSensitive: void 0,
    module: app_additional_exports
  },
  "routes/app._index": {
    id: "routes/app._index",
    parentId: "routes/app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_index_exports
  },
  "routes/auth.login": {
    id: "routes/auth.login",
    parentId: "root",
    path: "auth/login",
    index: void 0,
    caseSensitive: void 0,
    module: route_exports
  },
  "routes/webhooks": {
    id: "routes/webhooks",
    parentId: "root",
    path: "webhooks",
    index: void 0,
    caseSensitive: void 0,
    module: webhooks_exports
  },
  "routes/auth.$": {
    id: "routes/auth.$",
    parentId: "root",
    path: "auth/*",
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: route_exports2
  },
  "routes/app": {
    id: "routes/app",
    parentId: "root",
    path: "app",
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
