// app/routes/products.jsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server"; // Make sure this only runs on the server

export const loader = async ({ request }) => {
  await authenticate.admin(request); // Server-side authentication
  // const response = await fetch('https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d');
  const response = await fetch('https://fakestoreapi.com/products?limit=5');
  const products = await response.json();
  
  return json({ products });
};

export default function Products() {
  const { products } = useLoaderData();

  return (
    <div>
      <h1>Products from rr Belgium</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
