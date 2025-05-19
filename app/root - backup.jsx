// root.jsx
import { json } from "@remix-run/node";
import { useLoaderData, useActionData, useSubmit, useFetcher,  useRouteError, Links, Link, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { NavMenu } from "@shopify/app-bridge-react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { PrismaClient } from "@prisma/client";
// import Colors from './routes/colors'

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
export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const color = formData.get("color");

    // Validate color input
    if (!color || !/^#[0-9A-F]{6}$/i.test(color)) {
      return json(
        { error: "Please enter a valid hex color code" },
        { status: 400 }
      );
    }

    // Update or create color setting
    const colorSetting = await prisma.colorsetting.upsert({
      where: { id: 1 }, // Using fixed ID for single setting
      update: { color },
      create: { color },
    });

    return json({ 
      message: "Color saved successfully!",
      color: colorSetting.color 
    });

  } catch (error) {
    console.error("Failed to save color:", error);
    return json(
      { error: "Failed to save color. Please try again." },
      { status: 500 }
    );
  }
};
export const loader = async () => {
  try {
  
    // const response = await fetch('https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d');
    const response = await fetch(url, options);


    // const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    // Clear existing products
      // Validate if the data is an array
  // if (!Array.isArray(data)) {
  //   console.error("Data is not an array:", data);
  //   return json({
  //     products: [],
  //     message: "Fetched data is not in the expected array format."
  //   });
  // }

  

  // if (!data.data || !Array.isArray(data.data)) {
  //   console.error("Data is not in the expected format:", data);
  //   return json({
  //     products: [],
  //     message: "Fetched data is not in the expected array format."
  //   });
  // }
  
      const responseData = data.data || []; // Failsafe in case of missing data
    if (!Array.isArray(responseData)) {
      console.error("Data is not in expected array format:", responseData);
      return json({
        products: [],
        message: "Data is not in the expected array format."
      });
    }

  //  await prisma.product.deleteMany();

  //   // Insert new products into the database
  //   const products = Array.isArray(data) ? data : [];
  //   const insertedProducts = await prisma.product.createMany({
  //     data: products.map(product => ({
  //       title: product.title,
  //       price: product.price,
  //       description: product.description,
  //       category: product.category,
  //       image: product.image
  //     }))
  //   });

    await prisma.diamond_api.deleteMany();

    // Insert new diamonds into the database
    // const insertedDiamonds = await prisma.diamond_api.createMany({
    //   data: data.data.map(item => ({
    //     certificateNumber: item.CertificateNumber || '',
    //     shape: item.Shape || '',
    //     weight: parseFloat(item.Weight) || 0,
    //     color: item.Color || '',
    //     clarity: item.Clarity || '',
    //     cutGrade: item.CutGrade || '',
    //     polish: item.Polish || '',
    //     symmetry: item.Symmetry || '',
    //     fluoIntensity: item.FluoIntensity || '',
    //     fluoColor: item.FluoColor || '',
    //     rapDiscount: parseFloat(item.RapDiscount) || 0,
    //     depthPercent: parseFloat(item.DepthPercent) || 0,
    //     tablePercent: parseFloat(item.TablePercent) || 0,
    //     measLength: parseFloat(item.MeasLength) || 0,
    //     measWidth: parseFloat(item.MeasWidth) || 0,
    //     measDepth: parseFloat(item.MeasDepth) || 0,
    //     girdleSizeMin: parseFloat(item.girdleSizeMin) || 0,
    //     location: item.Location || '',
    //     girdleSizeMax: parseFloat(item.girdleSizeMax) || 0,
    //     finalPrice: parseFloat(item.FinalPrice) || 0,
    //     culetSize: item.CuletSize || '',
    //     culetCondition: item.CuletCondition || '',
    //     imageUrl: item.image_url || '',
    //   }))
    // });
    const insertedDiamonds = await Promise.all(data.data.map(async (item) => {
      return prisma.diamond_api.upsert({
        where: {
          certificateNumber: item.CertificateNumber || '', // This will ensure uniqueness
        },
        update: {
          // If a diamond with this certificateNumber already exists, update the fields
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
          // If no diamond with the given certificateNumber exists, create a new record
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
        // Log if the record was created or updated
          if (result.createdAt === result.updatedAt) {
            console.log(`Inserted new diamond: ${item.CertificateNumber}`);
          } else {
            console.log(`Updated diamond: ${item.CertificateNumber}`);
          }

          return result; // Return the result of the upsert operation for later logging
    }));
    const updatedCount = insertedDiamonds.filter(d => d.createdAt !== d.updatedAt).length;
    const insertedCount = insertedDiamonds.filter(d => d.createdAt === d.updatedAt).length;

    console.log(`Total inserted: ${insertedCount}`);
    console.log(`Total updated: ${updatedCount}`);

    // Fetch all diamonds from the database
    const fetchDiamonds = await prisma.diamond_api.findMany();

    // console.log(fetchDiamonds);
    let colorSetting = await prisma.colorsetting.findFirst();
    if (!colorSetting) {
      colorSetting = await prisma.colorsetting.create({
        data: { color: '#000000' }
      });
    }
    console.log("Fetched data:", insertedDiamonds.count);
    
    return { 
      products: fetchDiamonds,
      message: `diamonds inserted into the database (${insertedCount})`,
      message_update: `diamonds updated into the database (${updatedCount}) `,
      color: colorSetting?.color || '#000000' 
    };
   

    // Return success message and inserted data
    // Fetch all products from the database
    // const fetchproducts = await prisma.product.findMany();
    // return { 
    //   products: fetchproducts,
    //   message: `${insertedProducts.count} products inserted into the database`,
    //   color: colorSetting?.color || '#000000' 
    // };
  } catch (error) {
    console.error('Failed to fetch color:', error);
    console.error('Failed to fetch products:', error);
    return { products: [],  color: '#000000' };
  }
};

export default function Products() {
  const { products, message, message_update, color } = useLoaderData();
  const actionData = useActionData();
  
  const [selectedColor, setSelectedColor] = useState(color || '#000000'); 
    
  
   const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  if (!products) {
    return <div>Loading...</div>; // Show a loading state while data is fetched
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
    <AppProvider >
          <NavMenu >
            <Link to="/app" rel="home">Home</Link>
            <Link to="/app/additional">Additional page</Link>
          </NavMenu>
       
    <div className="container">
      <div className="admin_dash">
      <h1 className="title">Products from database</h1>
      <p className="text" >{message}</p>
      <p className="text" >{message_update}</p>
      <h2>Customize Appearance</h2>
             {/* Form to customize appearance (color change) */}
             <form method="post" >
              <div>
                <label htmlFor="color">Select Color</label>
                <input
                  type="color"
                  name="color"
                  id="color"
                  value={selectedColor}
                  onChange={handleColorChange}
                  required
                />
              </div>

              {/* Display success or error messages */}
              {actionData?.error && <div style={{ color: "red" }}>{actionData.error}</div>}
              {actionData?.message && <div style={{ color: "green" }}>{actionData.message}</div>}

              <button type="submit">Save Color</button>
            </form>

            {/* Display the selected color */}
            <div>
              <p>Selected Color:</p>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: selectedColor,
                }}
              />
            </div>
          
       
      {/* <div className="cardbox">
        {products.map((product, index) => (
          <div className="card" key={index}>
            <img src={product.imageUrl} alt={product.shape} />
            <h2 className="card-title">{product.certificateNumber}</h2>
            <p className="card-text">Price: ${product.finalPrice}</p>
            <p className="card-text">Polish: {product.polish},Symmetry: {product.symmetry},Clarity :{product.clarity}</p>
            <p className="card-text">Color: {product.color}</p>
          </div>
        ))}
      </div> */}
    </div>
    </div>
    </AppProvider>
    </body>
    </html>
  );
}



// Error boundary to handle errors
// Error boundary to handle errors
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
