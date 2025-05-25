// root.jsx
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, useSubmit, useRouteError, Links, Link, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient } from "@prisma/client";
import React, { useState, useEffect } from 'react';

const prisma = new PrismaClient();

export const links = () => [
  { rel: "stylesheet", href: polarisStyles }, 
  { rel: "stylesheet", href: './custom/admin-style.css' }
];

const url = 'https://webandappdevelopers.com/nikhil/task/api/getExcelData?limit=3000';
const options = {
  method: 'GET',
  headers: {
    Authorization: 'bJ7kZ3sL2F1qW9rV4mT8nE0xH5dY6aQ'
  }
};

export const loader = async () => {
  let fetchDiamonds = [];
  let insertedCount = 0;
  let updatedCount = 0;
  let fallbackUsed = false;

  try {
    const response = await fetch(url, options);

    if (!response.ok) throw new Error(`API responded with status ${response.status}`);

    const data = await response.json();
    const responseData = data.data || [];

    if (!Array.isArray(responseData)) {
      console.error("Data is not in expected array format:", responseData);
      throw new Error("Data is not in the expected array format.");
    }

    const insertedDiamonds = await Promise.all(
      responseData.map(async (item) => {
        return prisma.diamond_api.upsert({
          where: { certificateNumber: item.CertificateNumber || '' },
          update: {
            shape: item.Shape || '',
            weight: parseFloat(item.Weight) || 0,
            color: item.Color || '',
            clarity: item.Clarity || '',
            cutGrade: item.CutGrade || '',
            polish: item.Polish || '',
            symmetry: item.Symmetry || '',
            fluoIntensity: item.FluoIntensity || '',
            fluoColor: item.FluoColor || '',
            rapDiscount: parseFloat(item.RapDiscount) || 0,
            depthPercent: parseFloat(item.DepthPercent) || 0,
            tablePercent: parseFloat(item.TablePercent) || 0,
            measLength: parseFloat(item.MeasLength) || 0,
            measWidth: parseFloat(item.MeasWidth) || 0,
            measDepth: parseFloat(item.MeasDepth) || 0,
            girdleSizeMin: parseFloat(item.girdleSizeMin) || 0,
            location: item.Location || '',
            girdleSizeMax: parseFloat(item.girdleSizeMax) || 0,
            finalPrice: parseFloat(item.FinalPrice) || 0,
            culetSize: item.CuletSize || '',
            culetCondition: item.CuletCondition || '',
            imageUrl: item.image_url || '',
          },
          create: {
            certificateNumber: item.CertificateNumber || '',
            shape: item.Shape || '',
            weight: parseFloat(item.Weight) || 0,
            color: item.Color || '',
            clarity: item.Clarity || '',
            cutGrade: item.CutGrade || '',
            polish: item.Polish || '',
            symmetry: item.Symmetry || '',
            fluoIntensity: item.FluoIntensity || '',
            fluoColor: item.FluoColor || '',
            rapDiscount: parseFloat(item.RapDiscount) || 0,
            depthPercent: parseFloat(item.DepthPercent) || 0,
            tablePercent: parseFloat(item.TablePercent) || 0,
            measLength: parseFloat(item.MeasLength) || 0,
            measWidth: parseFloat(item.MeasWidth) || 0,
            measDepth: parseFloat(item.MeasDepth) || 0,
            girdleSizeMin: parseFloat(item.girdleSizeMin) || 0,
            location: item.Location || '',
            girdleSizeMax: parseFloat(item.girdleSizeMax) || 0,
            finalPrice: parseFloat(item.FinalPrice) || 0,
            culetSize: item.CuletSize || '',
            culetCondition: item.CuletCondition || '',
            imageUrl: item.image_url || '',
          }
        });
      })
    );

    // updatedCount = insertedDiamonds.filter(d => d.createdAt !== d.updatedAt).length;
    // insertedCount = insertedDiamonds.filter(d => d.createdAt === d.updatedAt).length;
  } catch (error) {
    console.error('API fetch failed. Falling back to existing database data:', error);
    fallbackUsed = true;
  }

  // Always fetch data from DB to serve it
  const fetchDiamondsFromDB = await prisma.diamond_api.findMany();

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
    message: fallbackUsed
      ? `Fetched from database. API not reachable.`
      : `Diamonds inserted into the database (${insertedCount})`,
    message_update: fallbackUsed
      ? null
      : `Diamonds updated into the database (${updatedCount})`
  });
};

export default function App() {
  const { products, message, message_update, color, error } = useLoaderData();
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(products)) {
    return <div>Error: Products data is not in the expected format.</div>;
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
              <h1 className="title">Products from database</h1>
              <p className="text">{message}</p>
              <p className="text">{message_update}</p>
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