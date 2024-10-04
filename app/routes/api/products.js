// app/routes/api/products.js
import { json } from '@remix-run/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const loader = async () => {
  try {
    const products = await prisma.product.findMany();
    return json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return json({ error: 'Failed to fetch products' }, { status: 500 });
  }
};
