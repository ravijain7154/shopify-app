import express from 'express';
// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
import cors from 'cors'; // Use ES6 import for consistency
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import bodyParser from 'body-parser';
import { installGlobals } from "@remix-run/node";

installGlobals();
// import { createRequestHandler } from '@remix-run/express';

import dotenv from 'dotenv';

const { PrismaClient } = pkg;
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3000; // Port for your API server
app.use(bodyParser.json());

// app.get('/diamond-filter', (req, res) => {
//     res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
// });

app.use('/diamond-filter', express.static(path.join(process.cwd(), 'public')));

import { createRequestHandler as createRemixHandler } from "@remix-run/express"; // Add this

app.all("*", createRemixHandler({
     build: await import("./build/server/index.js"), // <-- REQUIRED
    mode: process.env.NODE_ENV,
  getLoadContext(req, res) {
    return { prisma };
  },
}));


app.use('/assets', express.static(path.join(process.cwd(), 'public', 'assets'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
        if (filePath.endsWith('.svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
        }
    }
}));




const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const allowedOrigins = process.env.ALLOWED_ORIGINS || 'http://localhost:3000, https://shopify-app-pndl.onrender.com, https://quickstart-fad8588b.myshopify.com, http://192.168.1.136:3000,';
// Use the CORS middleware with the correct configuration
app.use(cors({
    origin: allowedOrigins.split(','),
    methods: ['GET', 'POST'], // Allow only specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as needed
    credentials: true // If your app uses credentials (like cookies)
}));

// Middleware to parse JSON request body
app.use(express.json()); // This line should be active for JSON parsing


// Endpoint to fetch products from the database
app.get('/api/products', async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 25;

        const shapes = req.query.Shape ? decodeURIComponent(req.query.Shape).split(',') : [];
        const priceMin = req.query.price_min ? parseFloat(req.query.price_min) : undefined;
        const priceMax = req.query.price_max ? parseFloat(req.query.price_max) : undefined;
        // Parsing the carat range from the URL
        const caratMin = req.query.carat_min ? parseFloat(req.query.carat_min) : undefined;
        const caratMax = req.query.carat_max ? parseFloat(req.query.carat_max) : undefined;
        // Parsing the color range from the URL
        const colorMin = req.query.color_min ? req.query.color_min : undefined;
        const colorMax = req.query.color_max ? req.query.color_max : undefined;
        // Parsing the color range from the URL
        const clarityMin = req.query.clarity_min ? req.query.clarity_min : undefined;
        const clarityMax = req.query.clarity_max ? req.query.clarity_max : undefined;

        const cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : undefined;
        const cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : undefined;


        // Calculate the pagination range
        const skip = (page - 1) * perPage;
        const take = perPage;

        const filterCriteria = {};

        // Add shape filter if present
        if (shapes.length > 0) {
            filterCriteria.shape = { in: shapes };  // Use `in` to filter for multiple shapes
        }
         // Filter by price range (if provided)
         if (priceMin !== null && priceMax !== null) {
            filterCriteria.finalPrice = {
                gte: priceMin,
                lte: priceMax,
            };
        } else if (priceMin !== null) {
            filterCriteria.finalPrice = {
                gte: priceMin,
            };
        } else if (priceMax !== null) {
            filterCriteria.finalPrice = {
                lte: priceMax,
            };
        }

       // Apply carat (weight) filter if present
        if (caratMin !== null && caratMax !== null) {
            filterCriteria.weight = { gte: caratMin, lte: caratMax };
        } else if (caratMin !== null) {
            filterCriteria.weight = { gte: caratMin };
        } else if (caratMax !== null) {
            filterCriteria.weight = { lte: caratMax };
        }
        
       
        if (colorMin !== null && colorMax !== null) {
            filterCriteria.color = { gte: colorMin, lte: colorMax };
        } else if (colorMin !== null) {
            filterCriteria.color = { gte: colorMin };
        } else if (colorMax !== null) {
            filterCriteria.color = { lte: colorMax };
        }
        
        if (clarityMin !== null && clarityMax !== null) {
            filterCriteria.clarity = { gte: clarityMin, lte: clarityMax };
        } else if (clarityMin !== null) {
            filterCriteria.clarity = { gte: clarityMin };
        } else if (clarityMax !== null) {
            filterCriteria.clarity = { lte: clarityMax };
        }
         // Apply cut (cut) filter if present
        if (cutMin !== null && cutMax !== null) {
            filterCriteria.cutGrade = { gte: cutMin, lte: cutMax };
        } else if (cutMin !== null) {
            filterCriteria.cutGrade = { gte: cutMin };
        } else if (cutMax !== null) {
            filterCriteria.cutGrade = { lte: cutMax };
        }


        
        // console.log('filterCriteria', filterCriteria);
        const products = await prisma.diamond_api.findMany({
            where: filterCriteria,
            skip: skip,  
            take: take   
        }); 
         // Get the total number of products in the database for pagination metadata
         const totalCount = await prisma.diamond_api.count({
            where: filterCriteria
        });

        const totalPages = Math.ceil(totalCount / perPage);
         
        // console.log(products);
        res.json({
            products,
            pagination: {
                currentPage: page,
                perPage: perPage,
                totalPages: totalPages,
                totalCount: totalCount 

            }
        }); // Send products as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products from the database' });
    }
});

// Endpoint to save color to style.css
app.use(express.json());  // Middleware to parse JSON requests

// Endpoint to save color to style.css
app.get('/api/get-color', async (req, res) => {
    try {
        const colorSetting = await prisma.colorsetting.findFirst({
            orderBy: { createdAt: 'desc' },  // Get the most recent color setting
        });

        if (colorSetting) {
            res.json({ color: colorSetting.color });
        } else {
            res.json({ color: '#ffffff' }); // Default color if none is set
        }
    } catch (error) {
        console.error('Error fetching color:', error);
        res.status(500).json({ error: 'Failed to fetch color' });
    }
});

// Endpoint to save the color selected by the admin
app.post('/api/save-color', async (req, res) => {
    const { color } = req.body;
    if (!color) {
        return res.status(400).json({ error: 'No color provided' });
    }

    try {
        // Save the color in the database
        await prisma.colorsetting.create({
            data: {
                color
            }
        });

        // Send a success response
        res.status(200).json({ message: 'Color saved successfully' });
    } catch (error) {
        console.error('Error saving color:', error);
        res.status(500).json({ error: 'Failed to save color' });
    }
});
  // Start the Express server

// Start the API server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});


// -----------------------------
// COMMONJS VERSION (Render + Shopify Compatible)
// -----------------------------

// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const { promisify } = require("util");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const { installGlobals } = require("@remix-run/node");
// const { PrismaClient } = require("@prisma/client");

// // Install global fetch/Headers/etc required by Remix
// installGlobals();

// // Load .env
// dotenv.config();

// const app = express();
// const prisma = new PrismaClient();
// const PORT = process.env.PORT || 3000;

// // ---------------------------------------
// // MIDDLEWARES
// // ---------------------------------------
// app.use(bodyParser.json());
// app.use(express.json());

// // PUBLIC FRONTEND (Storefront UI)
// app.use("/diamond-filter", express.static(path.join(process.cwd(), "public")));

// // STATIC ASSETS
// app.use(
//   "/assets",
//   express.static(path.join(process.cwd(), "public", "assets"), {
//     setHeaders: (res, filePath) => {
//       if (filePath.endsWith(".css")) res.setHeader("Content-Type", "text/css");
//       if (filePath.endsWith(".js"))
//         res.setHeader("Content-Type", "application/javascript");
//       if (filePath.endsWith(".svg")) res.setHeader("Content-Type", "image/svg+xml");
//     },
//   })
// );

// // ---------------------------------------
// // CORS CONFIG
// // ---------------------------------------
// const allowedOrigins =
//   process.env.ALLOWED_ORIGINS ||
//   "http://localhost:3000, https://shopify-app-pndl.onrender.com, https://quickstart-fad8588b.myshopify.com";

// app.use(
//   cors({
//     origin: allowedOrigins.split(","),
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // ---------------------------------------
// // REMIX SERVER HANDLER (CommonJS)
// // ---------------------------------------
// const { createRequestHandler } = require("@remix-run/express");
// const remixBuild = require("./build/server/index.js");

// app.all(
//   "*",
//   createRequestHandler({
//     build: remixBuild,
//     mode: process.env.NODE_ENV,
//     getLoadContext() {
//       return { prisma };
//     },
//   })
// );

// // ---------------------------------------
// // API ROUTES
// // ---------------------------------------

// // GET PRODUCTS
// app.get("/api/products", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const perPage = parseInt(req.query.perPage) || 25;

//     const shapes = req.query.Shape
//       ? decodeURIComponent(req.query.Shape).split(",")
//       : [];

//     const priceMin = req.query.price_min ? parseFloat(req.query.price_min) : undefined;
//     const priceMax = req.query.price_max ? parseFloat(req.query.price_max) : undefined;

//     const caratMin = req.query.carat_min
//       ? parseFloat(req.query.carat_min)
//       : undefined;
//     const caratMax = req.query.carat_max
//       ? parseFloat(req.query.carat_max)
//       : undefined;

//     const colorMin = req.query.color_min || undefined;
//     const colorMax = req.query.color_max || undefined;

//     const clarityMin = req.query.clarity_min || undefined;
//     const clarityMax = req.query.clarity_max || undefined;

//     const cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : undefined;
//     const cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : undefined;

//     const skip = (page - 1) * perPage;
//     const take = perPage;

//     const filterCriteria = {};

//     if (shapes.length > 0) filterCriteria.shape = { in: shapes };

//     // Price filter
//     if (priceMin || priceMax)
//       filterCriteria.finalPrice = {
//         ...(priceMin && { gte: priceMin }),
//         ...(priceMax && { lte: priceMax }),
//       };

//     // Carat filter
//     if (caratMin || caratMax)
//       filterCriteria.weight = {
//         ...(caratMin && { gte: caratMin }),
//         ...(caratMax && { lte: caratMax }),
//       };

//     // Color filter
//     if (colorMin || colorMax)
//       filterCriteria.color = {
//         ...(colorMin && { gte: colorMin }),
//         ...(colorMax && { lte: colorMax }),
//       };

//     // Clarity filter
//     if (clarityMin || clarityMax)
//       filterCriteria.clarity = {
//         ...(clarityMin && { gte: clarityMin }),
//         ...(clarityMax && { lte: clarityMax }),
//       };

//     // Cut filter
//     if (cutMin || cutMax)
//       filterCriteria.cutGrade = {
//         ...(cutMin && { gte: cutMin }),
//         ...(cutMax && { lte: cutMax }),
//       };

//     const products = await prisma.diamond_api.findMany({
//       where: filterCriteria,
//       skip,
//       take,
//     });

//     const totalCount = await prisma.diamond_api.count({ where: filterCriteria });
//     const totalPages = Math.ceil(totalCount / perPage);

//     res.json({
//       products,
//       pagination: {
//         currentPage: page,
//         perPage,
//         totalPages,
//         totalCount,
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).json({ message: "Error fetching products" });
//   }
// });

// // GET COLOR
// app.get("/api/get-color", async (req, res) => {
//   try {
//     const colorSetting = await prisma.colorsetting.findFirst({
//       orderBy: { createdAt: "desc" },
//     });

//     res.json({ color: colorSetting?.color || "#ffffff" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch color" });
//   }
// });

// // SAVE COLOR
// app.post("/api/save-color", async (req, res) => {
//   try {
//     const { color } = req.body;
//     if (!color) return res.status(400).json({ error: "No color provided" });

//     await prisma.colorsetting.create({ data: { color } });

//     res.status(200).json({ message: "Color saved successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to save color" });
//   }
// });

// // ---------------------------------------
// // START SERVER
// // ---------------------------------------
// app.listen(PORT, () => {
//   console.log(`API server running on port ${PORT}`);
// });
