import express from 'express';
import path from 'path';
import { createRequestHandler } from '@remix-run/express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
const prisma = new PrismaClient(); // Initialize Prisma client

// Middleware to serve static files from the public directory
app.use(express.static(path.join(path.resolve(), 'public')));

// Set up Remix request handler
app.all(
    '*',
    createRequestHandler({
        getLoadContext({ req }) {
            // Create and return the context object
            return {
                prisma,
                // Add more context if needed
            };
        },
    })
);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});