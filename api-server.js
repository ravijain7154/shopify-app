import express from 'express';

// import { PrismaClient } from '@prisma/client';
import pkg from '@prisma/client';
import cors from 'cors'; // Use ES6 import for consistency
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const { PrismaClient } = pkg;
const app = express();
const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const PORT = process.env.PORT || 3000; // Port for your API server
app.use(bodyParser.json());

// Logging middleware to debug incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - Origin: ${req.get('origin')}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'API server is running' });
});

// Static files for diamond filter UI
app.use('/diamond-filter', express.static(path.join(process.cwd(), 'public')));


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

// ===== FALLBACK 404 HANDLER =====
// NOTE: The Remix admin UI needs to be served separately to avoid ESM CSS import issues
// For production on Render, configure two services:
// 1. API server (api-server.js) - handles /api/* and /diamond-filter routes
// 2. Remix server (remix-serve ./build/index.js or npm run start) - handles admin UI routes
app.all("*", (req, res) => {
    console.log(`→ Unhandled: ${req.method} ${req.path}`);
    res.status(404).json({ 
        message: "Not Found - API Server Only",
        path: req.path,
        method: req.method,
        note: "Admin UI is served separately",
        availableEndpoints: [
            'GET /health',
            'GET /api/products',
            'GET /api/get-color',
            'POST /api/save-color',
            'GET /diamond-filter',
        ]
    });
});

// Start the API server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});