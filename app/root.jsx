// root.jsx
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError, Links, Link, Meta, Outlet, Scripts, ScrollRestoration, useFetcher, useRevalidator } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
// import { AppProvider } from "@shopify/shopify-app-remix/react"; 
import {AppProvider, Button, Card, BlockStack, Text, InlineStack } from "@shopify/polaris";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";

import { PrismaClient } from "@prisma/client";
import React, { useState, useEffect } from 'react';

const prisma = new PrismaClient();

export const links = () => [ 
  { rel: "stylesheet", href: polarisStyles }, 
  { rel: "stylesheet", href: './custom/admin-style.css' }
];

export const loader = async () => {
  // On app load, just fetch diamonds from DB (no auto-sync on every load)
  const fetchDiamondsFromDB = await prisma.diamond.findMany();

  // Get or create color setting
  let colorSetting = await prisma.colorsetting.findFirst();
  if (!colorSetting) {
    colorSetting = await prisma.colorsetting.create({
      data: { color: '#ffffff' }
    });
  }

  return json({
    products: fetchDiamondsFromDB,
    color: colorSetting.color,
    message: `Total diamonds in database: ${fetchDiamondsFromDB.length}`,
    syncCount: null
  });
};

export default function App() {
  const loaderData = useLoaderData();
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  const { products, message, color, syncCount } = loaderData || {
    products: [],
    message: 'Loading...',
    color: '#ffffff',
    syncCount: null
  };



  if (!products || !Array.isArray(products)) {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <div>Error: Products data is not available</div>
          <Scripts />
        </body>
      </html>
    );
  }

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider>
          <div className="container">
            <div className="admin_dash">
              
              <Outlet />
            </div>
          </div>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h2>Something went wrong</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};