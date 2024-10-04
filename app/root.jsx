// root.jsx
import { json } from "@remix-run/node";
import { useLoaderData, useRouteError, Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient } from "@prisma/client";

import React from 'react';
import adminstyle from './custom/admin-style.css';




// import 'bootstrap/dist/css/bootstrap.min.css';





const prisma = new PrismaClient();

export const links = () => [
  { rel: "stylesheet", href: polarisStyles }, 
  { rel: "stylesheet", href: adminstyle }
];


export const loader = async () => {
  try {
  
    // const response = await fetch('https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d');
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log("Fetched data:", data);
    // Clear existing products
      // Validate if the data is an array
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return json({
      products: [],
      message: "Fetched data is not in the expected array format."
    });
  }

    await prisma.product.deleteMany();

    // Insert new products into the database
    const products = Array.isArray(data) ? data : [];
    const insertedProducts = await prisma.product.createMany({
      data: products.map(product => ({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image
      }))
    });

    // Return success message and inserted data
    // Fetch all products from the database
    const fetchproducts = await prisma.product.findMany();
    return { 
      products: fetchproducts,
      message: `${insertedProducts.count} products inserted into the database`
    };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [] };
  }
};

export default function Products() {
  const { products, message } = useLoaderData();

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
    <div className="container">
      <h1>Products from database</h1>
      <p>{message}</p>
      <div className="cardbox">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.image} alt={product.title} />
            <h2 className="card-title">{product.title}</h2>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
    </body>
    </html>
  );
}



export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
