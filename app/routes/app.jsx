// app/routes/app.js
import { json } from "@remix-run/node";
import { Link, useLoaderData, useActionData, Form, useFetcher, useRevalidator } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
import { NavMenu } from "@shopify/app-bridge-react";
import {Button, Card, BlockStack, Text, InlineStack } from "@shopify/polaris";
import React, { useState, useEffect } from 'react';

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
    const fetcher = useFetcher();
    const revalidator = useRevalidator();
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState(null);

    // Update sync status when fetcher completes
    useEffect(() => {
      if (fetcher.state === 'idle' && fetcher.data) {
        setIsSyncing(false);
        setSyncMessage(fetcher.data.message);
        // Revalidate the root loader to refresh the products list
        if (fetcher.data.success) {
          revalidator.revalidate();
        }
        // Clear message after 5 seconds
        const timer = setTimeout(() => setSyncMessage(null), 5000);
        return () => clearTimeout(timer);
      }
    }, [fetcher.state, fetcher.data, revalidator]);
  
  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage('Syncing diamonds...');
    fetcher.submit(
      { sync: 'true' },
      { method: 'post', action: 'api/sync' }
    );
  };
  return (
    <>
    <h1 className="title">Diamonds Management</h1>
                  
                  <Card>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <div>
                          <h2>Database Status</h2>
                          <p className="text">{message}</p>
                          {syncMessage && (
                            <Text as="p" variant="bodyMd" color={fetcher.data?.success ? 'success' : 'critical'}>
                              {syncMessage}
                            </Text>
                          )}
                        </div>
                        <Button
                          onClick={handleSync}
                          disabled={isSyncing}
                          variant="primary"
                        >
                          {isSyncing ? 'Syncing...' : 'Sync Diamonds'}
                        </Button>
                      </InlineStack>
                    </BlockStack>
                  </Card>
    
      <Card>
      <BlockStack gap="400">
        <Text variant="headingLg" as="h2">
          Theme Color Settings
        </Text>

        <Text variant="bodyMd">
          Set the primary color used inside your storefront diamond filter UI.
        </Text>

        {/* RESULT MESSAGE */}
        {actionData?.error && (
          <Text color="critical" variant="bodyMd">
            {actionData.error}
          </Text>
        )}

        {actionData?.message && (
          <Text color="success" variant="bodyMd">
            {actionData.message}
          </Text>
        )}

        <Form method="post">
          <BlockStack gap="300">

            {/* COLOR PICKER */}
            <InlineStack gap="400" align="start">
              <div>
                <label
                  htmlFor="color"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "600",
                  }}
                >
                  Select Color
                </label>

                <input
                  type="color"
                  id="color"
                  name="color"
                  defaultValue={actionData?.color || color}
                  style={{
                    width: "60px",
                    height: "40px",
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                  }}
                />
              </div>

              <div>
                <Text variant="bodyMd">Preview</Text>
                <div
                  style={{
                    width: "60px",
                    height: "40px",
                    backgroundColor: actionData?.color || color,
                    borderRadius: "6px",
                    border: "1px solid #d0d0d0",
                    marginTop: "6px",
                  }}
                ></div>
              </div>
            </InlineStack>

            {/* SAVE BUTTON */}
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