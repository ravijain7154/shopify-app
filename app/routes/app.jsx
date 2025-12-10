// app/routes/app.js
import { json } from "@remix-run/node";
import { Link, useLoaderData, useActionData, Form,   useFetcher } from "@remix-run/react";
import {
  Button,
  Card,
  BlockStack,
  Text,
  InlineStack
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
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
// -------------------------
// ACTION → Save color
// -------------------------
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
  // For diamond sync
  const fetcher = useFetcher();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  // Sync button click
  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage("Syncing diamonds...");

    fetcher.submit({}, { method: "post", action: "/api/sync" });
  };

  // Sync response management
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setIsSyncing(false);
      setSyncMessage(fetcher.data.message);

      setTimeout(() => setSyncMessage(null), 4000);
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <>
      <h1 className="title">Diamonds Management</h1>

      {/* -----------------------------
          DIAMOND SYNC SECTION
         ----------------------------- */}
      <Card>
        <BlockStack gap="300">
          <InlineStack align="space-between">
            <div>
              <h2>Database Status</h2>

              {syncMessage && (
                <Text
                  as="p"
                  variant="bodyMd"
                  color={fetcher.data?.success ? "success" : "critical"}
                >
                  {syncMessage}
                </Text>
              )}
            </div>

            <Button
              onClick={handleSync}
              disabled={isSyncing}
              variant="primary"
            >
              {isSyncing ? "Syncing..." : "Sync Diamonds"}
            </Button>
          </InlineStack>
        </BlockStack>
      </Card>

      <br />

      {/* -----------------------------
          COLOR SETTINGS
         ----------------------------- */}
      <Card>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h2">
            Theme Color Settings
          </Text>

          <Form method="post">
            <BlockStack gap="300">
              <InlineStack gap="400" align="start">
                <div>
                  <label
                    htmlFor="color"
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: 600
                    }}
                  >
                    Select Color
                  </label>

                  <input
                    type="color"
                    name="color"
                    id="color"
                    defaultValue={actionData?.color || color}
                    required
                    style={{ width: "60px", height: "40px", cursor: "pointer" }}
                  />
                </div>

                {/* Preview box */}
                <div>
                  <Text variant="bodyMd">Preview</Text>
                  <div
                    style={{
                      width: "60px",
                      height: "40px",
                      backgroundColor: actionData?.color || color,
                      border: "1px solid #000",
                      borderRadius: "6px",
                      marginTop: "6px"
                    }}
                  ></div>
                </div>
              </InlineStack>

              {/* Messages */}
              {actionData?.message && (
                <Text color="success">{actionData.message}</Text>
              )}
              {actionData?.error && (
                <Text color="critical">{actionData.error}</Text>
              )}

              <Button variant="primary" submit>
                Save Color
              </Button>
            </BlockStack>
          </Form>
        </BlockStack>
      </Card>
    </>
  );
}

export function ErrorBoundary() {
  return <div>Something went wrong in the app route!</div>;
}