// app/routes/app.js
import { json } from "@remix-run/node";
import { Link, useLoaderData, useActionData, Form } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { NavMenu } from "@shopify/app-bridge-react";

const prisma = new PrismaClient();

export const loader = async () => {
  try {
    const colorSetting = await prisma.colorsetting.findFirst();
    return json({ 
      color: colorSetting?.color || '#ffffff'
    });
  } catch (error) {
    console.error('Loader error:', error);
    return json({ color: '#ffffff' });
  }
};

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const color = formData.get('color') || '#ffffff';
    
    await prisma.colorsetting.upsert({
      where: { id: 1 },
      update: { color },
      create: { color },
    });
    
    return json({ 
      message: "Color saved successfully!",
      color 
    });
  } catch (error) {
    console.error("Error saving color:", error);
    return json({ error: "Failed to save color" }, { status: 500 });
  }
};

export default function AppRoute() {
  const { color } = useLoaderData();
  const actionData = useActionData();

  return (
    <>
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/additional">Additional page</Link>
      </NavMenu>
      
      <h2>Customize Appearance</h2>
      <Form method="post">
        <div>
          <label htmlFor="color">Select Color</label>
          <input
            type="color"
            name="color"
            id="color"
            defaultValue={color}
            required
          />
        </div>
        
        {actionData?.error && <div style={{ color: 'red' }}>{actionData.error}</div>}
        {actionData?.message && <div style={{ color: 'green' }}>{actionData.message}</div>}
        
        <button type="submit">Save Color</button>
      </Form>

      <div>
        <p>Current Color:</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: actionData?.color || color,
            border: "1px solid #000"
          }}
        />
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return <div>Something went wrong in the app route!</div>;
}