import { json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { Link } from "@remix-run/react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({});
};

export default function AppLayout() {
  return (
    <AppProvider>
      <NavMenu>
        <Link to="/app" rel="home">
          Home
        </Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Authentication Required</h2>
      <p>Please log in to access this app.</p>
    </div>
  );
}
