import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'; // Use ES6 import for consistency

const app = express();
const prisma = new PrismaClient();

const PORT = 4000; // Port for your API server

// Use the CORS middleware with the correct configuration
app.use(cors({
    origin: 'https://abcdfdgsse.myshopify.com', // Replace with your specific Shopify domain
    methods: ['GET', 'POST'], // Allow only specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as needed
    credentials: true // If your app uses credentials (like cookies)
}));

// Endpoint to fetch products from the database
app.get('/api/products', async(req, res) => {
    try {
        const products = await prisma.product.findMany(); // Fetch products from the database
        res.json(products); // Send products as JSON
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products from the database' });
    }
});

// Start the API server
app.listen(PORT, () => {
    console.log(`API server is running on http://localhost:${PORT}`);
});