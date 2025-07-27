// root.jsx
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, useSubmit, useRouteError, Links, Link, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient } from "@prisma/client";
import React, { useState, useEffect } from 'react';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export const links = () => [
  { rel: "stylesheet", href: polarisStyles }, 
  { rel: "stylesheet", href: './custom/admin-style.css' }
];

// const url = 'https://belgiumdia.com/api/DeveloperAPI';
// const options = {
//   method: 'GET',
//   headers: {
//     APIKEY: '134981956a7be967bf4a198e5bfccf4059085cf9dd4d'
//   }
// };
    const url = await fetch('https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d');

export const loader = async () => {
  let fetchDiamonds = [];
  let insertedCount = 0;
  let updatedCount = 0;
  let fallbackUsed = false;

  try {
    // const response = await fetch(url, options);
    const response = await fetch(url);

    if (!response.ok) throw new Error(`API responded with status ${response.status}`);

    const data = await response.json();
    const responseData = data.data || [];

    if (!Array.isArray(responseData)) {
      console.error("Data is not in expected array format:", responseData);
      throw new Error("Data is not in the expected array format.");
    }

    const insertedDiamonds = await Promise.all(
      responseData.map(async (item) => {
        return prisma.diamond.upsert({
          where: { Stock_No: item.Stock_No || '' },
        update: {
          Availability: item.Availability,
          Shape: item.Shape,
          Weight: parseFloat(item.Weight) || 0,
          Color: item.Color,
          Clarity: item.Clarity,
          Cut_Grade: item.Cut_Grade,
          Polish: item.Polish,
          Symmetry: item.Symmetry,
          Fluorescence_Intensity: item.Fluorescence_Intensity,
          Fluorescence_Color: item.Fluorescence_Color,
          Measurements: item.Measurements,
          Lab: item.Lab,
          Treatment: item.Treatment,
          FancyColor: item.FancyColor,
          Fancy_Color_Intensity: item.Fancy_Color_Intensity,
          FancyColorOvertone: item.FancyColorOvertone,
          DEPTH_PER: parseFloat(item.DEPTH_PER) || 0,
          TABLE_PER: parseFloat(item.TABLE_PER) || 0,
          Girdle_Min: parseFloat(item.Girdle_Min) || 0,
          Girdle_Max: parseFloat(item.Girdle_Max) || 0,
          Girdle_Per: parseFloat(item.Girdle_Per) || 0,
          Girdle_Condition: item.Girdle_Condition,
          Culet_Size: item.Culet_Size,
          Culet_Condition: item.Culet_Condition,
          Crown_Height: parseFloat(item.Crown_Height) || 0,
          Crown_Angle: parseFloat(item.Crown_Angle) || 0,
          Pavilion_Depth: parseFloat(item.Pavilion_Depth) || 0,
          Pavilion_Angle: parseFloat(item.Pavilion_Angle) || 0,
          Cert_Comments: item.Cert_Comments,
          Country: item.Country,
          State: item.State,
          City: item.City,
          Country_Of_Origin: item.Country_Of_Origin,
          Key_To_Symbols: item.Key_To_Symbols,
          Shade: item.Shade,
          Star_Length: item.Star_Length,
          Report_Issue_Date: item.Report_Issue_Date ? new Date(item.Report_Issue_Date) : null,
          Report_Type: item.Report_Type,
          Milky: item.Milky,
          Eye_Clean: item.Eye_Clean,
          Gemprint_ID: item.Gemprint_ID,
          BGM: item.BGM,
          Ratio: parseFloat(item.Ratio) || 0,
          Diamond_Type: item.Diamond_Type,
          Member_Comments: item.Member_Comments,
          Time_to_Location: item.Time_to_Location,
          LsMatchedPairSeparable: item.LsMatchedPairSeparable,
          Pair_Stock: item.Pair_Stock,
          Allow_Raplink_Feed: item.Allow_Raplink_Feed,
          Parcel_Stones: item.Parcel_Stones,
          Center_Inclusion: item.Center_Inclusion,
          Black_Inclusion: item.Black_Inclusion,
          Lab_Location: item.Lab_Location,
          Brand: item.Brand,
          Sarine_Name: item.Sarine_Name,
          Internal_Clarity_Desc_Code: item.Internal_Clarity_Desc_Code,
          Clarity_Description: item.Clarity_Description,
          Modified_Rate: parseFloat(item.Modified_Rate) || 0,
          wire_discount_price: parseFloat(item.wire_discount_price) || 0,
          ImageLink: item.ImageLink,
          VideoLink: item.VideoLink,
          Video_HTML: item.Video_HTML,
          CertificateLink: item.CertificateLink,
          Rap_Price: parseFloat(item.Rap_Price) || 0,
          Memo_Price: parseFloat(item.Memo_Price) || 0,
          Memo_Discount_PER: parseFloat(item.Memo_Discount_PER) || 0,
          Buy_Price: parseFloat(item.Buy_Price) || 0,
          Buy_Price_Discount_PER: parseFloat(item.Buy_Price_Discount_PER) || 0,
          COD_Buy_Price: parseFloat(item.COD_Buy_Price) || 0,
          COD_Buy_Price_Discount_PER: parseFloat(item.COD_Buy_Price_Discount_PER) || 0,
          Certificate: item.Certificate
        },
        create: {
          Stock_No: item.Stock_No || '',
          Availability: item.Availability,
          Shape: item.Shape,
          Weight: parseFloat(item.Weight) || 0,
          Color: item.Color,
          Clarity: item.Clarity,
          Cut_Grade: item.Cut_Grade,
          Polish: item.Polish,
          Symmetry: item.Symmetry,
          Fluorescence_Intensity: item.Fluorescence_Intensity,
          Fluorescence_Color: item.Fluorescence_Color,
          Measurements: item.Measurements,
          Lab: item.Lab,
          Treatment: item.Treatment,
          FancyColor: item.FancyColor,
          Fancy_Color_Intensity: item.Fancy_Color_Intensity,
          FancyColorOvertone: item.FancyColorOvertone,
          DEPTH_PER: parseFloat(item.DEPTH_PER) || 0,
          TABLE_PER: parseFloat(item.TABLE_PER) || 0,
          Girdle_Min: parseFloat(item.Girdle_Min) || 0,
          Girdle_Max: parseFloat(item.Girdle_Max) || 0,
          Girdle_Per: parseFloat(item.Girdle_Per) || 0,
          Girdle_Condition: item.Girdle_Condition,
          Culet_Size: item.Culet_Size,
          Culet_Condition: item.Culet_Condition,
          Crown_Height: parseFloat(item.Crown_Height) || 0,
          Crown_Angle: parseFloat(item.Crown_Angle) || 0,
          Pavilion_Depth: parseFloat(item.Pavilion_Depth) || 0,
          Pavilion_Angle: parseFloat(item.Pavilion_Angle) || 0,
          Cert_Comments: item.Cert_Comments,
          Country: item.Country,
          State: item.State,
          City: item.City,
          Country_Of_Origin: item.Country_Of_Origin,
          Key_To_Symbols: item.Key_To_Symbols,
          Shade: item.Shade,
          Star_Length: item.Star_Length,
          Report_Issue_Date: item.Report_Issue_Date ? new Date(item.Report_Issue_Date) : null,
          Report_Type: item.Report_Type,
          Milky: item.Milky,
          Eye_Clean: item.Eye_Clean,
          Gemprint_ID: item.Gemprint_ID,
          BGM: item.BGM,
          Ratio: parseFloat(item.Ratio) || 0,
          Diamond_Type: item.Diamond_Type,
          Member_Comments: item.Member_Comments,
          Time_to_Location: item.Time_to_Location,
          LsMatchedPairSeparable: item.LsMatchedPairSeparable,
          Pair_Stock: item.Pair_Stock,
          Allow_Raplink_Feed: item.Allow_Raplink_Feed,
          Parcel_Stones: item.Parcel_Stones,
          Center_Inclusion: item.Center_Inclusion,
          Black_Inclusion: item.Black_Inclusion,
          Lab_Location: item.Lab_Location,
          Brand: item.Brand,
          Sarine_Name: item.Sarine_Name,
          Internal_Clarity_Desc_Code: item.Internal_Clarity_Desc_Code,
          Clarity_Description: item.Clarity_Description,
          Modified_Rate: parseFloat(item.Modified_Rate) || 0,
          wire_discount_price: parseFloat(item.wire_discount_price) || 0,
          ImageLink: item.ImageLink,
          VideoLink: item.VideoLink,
          Video_HTML: item.Video_HTML,
          CertificateLink: item.CertificateLink,
          Rap_Price: parseFloat(item.Rap_Price) || 0,
          Memo_Price: parseFloat(item.Memo_Price) || 0,
          Memo_Discount_PER: parseFloat(item.Memo_Discount_PER) || 0,
          Buy_Price: parseFloat(item.Buy_Price) || 0,
          Buy_Price_Discount_PER: parseFloat(item.Buy_Price_Discount_PER) || 0,
          COD_Buy_Price: parseFloat(item.COD_Buy_Price) || 0,
          COD_Buy_Price_Discount_PER: parseFloat(item.COD_Buy_Price_Discount_PER) || 0,
          Certificate: item.Certificate
        }
          // where: { certificateNumber: item.CertificateNumber || '' },
          // update: {
          //   shape: item.Shape || '',
          //   weight: parseFloat(item.Weight) || 0,
          //   color: item.Color || '',
          //   clarity: item.Clarity || '',
          //   cutGrade: item.CutGrade || '',
          //   polish: item.Polish || '',
          //   symmetry: item.Symmetry || '',
          //   fluoIntensity: item.FluoIntensity || '',
          //   fluoColor: item.FluoColor || '',
          //   rapDiscount: parseFloat(item.RapDiscount) || 0,
          //   depthPercent: parseFloat(item.DepthPercent) || 0,
          //   tablePercent: parseFloat(item.TablePercent) || 0,
          //   measLength: parseFloat(item.MeasLength) || 0,
          //   measWidth: parseFloat(item.MeasWidth) || 0,
          //   measDepth: parseFloat(item.MeasDepth) || 0,
          //   girdleSizeMin: parseFloat(item.girdleSizeMin) || 0,
          //   location: item.Location || '',
          //   girdleSizeMax: parseFloat(item.girdleSizeMax) || 0,
          //   finalPrice: parseFloat(item.FinalPrice) || 0,
          //   culetSize: item.CuletSize || '',
          //   culetCondition: item.CuletCondition || '',
          //   imageUrl: item.image_url || '',
          // },
          // create: {
          //   certificateNumber: item.CertificateNumber || '',
          //   shape: item.Shape || '',
          //   weight: parseFloat(item.Weight) || 0,
          //   color: item.Color || '',
          //   clarity: item.Clarity || '',
          //   cutGrade: item.CutGrade || '',
          //   polish: item.Polish || '',
          //   symmetry: item.Symmetry || '',
          //   fluoIntensity: item.FluoIntensity || '',
          //   fluoColor: item.FluoColor || '',
          //   rapDiscount: parseFloat(item.RapDiscount) || 0,
          //   depthPercent: parseFloat(item.DepthPercent) || 0,
          //   tablePercent: parseFloat(item.TablePercent) || 0,
          //   measLength: parseFloat(item.MeasLength) || 0,
          //   measWidth: parseFloat(item.MeasWidth) || 0,
          //   measDepth: parseFloat(item.MeasDepth) || 0,
          //   girdleSizeMin: parseFloat(item.girdleSizeMin) || 0,
          //   location: item.Location || '',
          //   girdleSizeMax: parseFloat(item.girdleSizeMax) || 0,
          //   finalPrice: parseFloat(item.FinalPrice) || 0,
          //   culetSize:  .CuletSize || '',
          //   culetCondition: item.CuletCondition || '',
          //   imageUrl: item.image_url || '',
          // }
        });
      })
    );

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