import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useRevalidator } from "@remix-run/react";
import {
  Page,
  Card,
  Button,
  BlockStack,
  Text,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { prisma } from "../db.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  
  // Fetch all diamonds from database
  const diamonds = await prisma.diamond.findMany({
    select: {
      Stock_No: true,
      Shape: true,
      Weight: true,
      Color: true,
      Clarity: true,
    },
    take: 100,
  });

  // Fetch or create color setting
  let colorSetting = await prisma.colorSetting.findUnique({
    where: { id: "default" },
  });
  if (!colorSetting) {
    colorSetting = await prisma.colorSetting.create({
      data: {
        id: "default",
        primaryColor: "#000000",
        secondaryColor: "#FFFFFF",
      },
    });
  }

  return json({
    diamondCount: diamonds.length,
    diamonds: diamonds.slice(0, 10),
    colorSetting,
  });
};

export default function Index() {
  const { diamondCount, diamonds, colorSetting } = useLoaderData();
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage("Syncing diamonds...");
    fetcher.submit(
      { sync: "true" },
      { method: "post", action: "/api/sync" }
    );
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      setIsSyncing(false);
      setSyncMessage(fetcher.data.message);
      if (fetcher.data.success) {
        revalidator.revalidate();
      }
      const timer = setTimeout(() => setSyncMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [fetcher.state, fetcher.data, revalidator]);

  return (
    <Page>
      <TitleBar title="Diamond Products Admin" />
      <BlockStack gap="500">
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Database Status
            </Text>
            <InlineStack align="space-between" blockAlign="center">
              <Text variant="bodyMd">
                Total Diamonds in Database: <strong>{diamondCount}</strong>
              </Text>
              <Button variant="primary" onClick={handleSync} loading={isSyncing}>
                Sync Diamonds from API
              </Button>
            </InlineStack>
            {syncMessage && (
              <Box padding="300" background="bg-surface-success-subdued" borderRadius="200">
                <Text variant="bodyMd" as="p">
                  {syncMessage}
                </Text>
              </Box>
            )}
          </BlockStack>
        </Card>

        {diamonds.length > 0 && (
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Sample Diamonds (First 10)
              </Text>
              <Box borderRadius="200" borderColor="border" borderWidth="025" padding="300" overflowX="auto">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #e1e3e5" }}>
                      <th style={{ padding: "8px", textAlign: "left" }}>Stock #</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Shape</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Weight (ct)</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Color</th>
                      <th style={{ padding: "8px", textAlign: "left" }}>Clarity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diamonds.map((diamond) => (
                      <tr key={diamond.Stock_No} style={{ borderBottom: "1px solid #e1e3e5" }}>
                        <td style={{ padding: "8px" }}>{diamond.Stock_No}</td>
                        <td style={{ padding: "8px" }}>{diamond.Shape || "—"}</td>
                        <td style={{ padding: "8px" }}>{diamond.Weight || "—"}</td>
                        <td style={{ padding: "8px" }}>{diamond.Color || "—"}</td>
                        <td style={{ padding: "8px" }}>{diamond.Clarity || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </BlockStack>
          </Card>
        )}

        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">
              Theme Colors
            </Text>
            <InlineStack align="space-between">
              <BlockStack gap="200">
                <Text variant="bodyMd">Primary Color</Text>
                <Box
                  width="100px"
                  height="100px"
                  background="bg-surface"
                  borderRadius="200"
                  borderWidth="025"
                  borderColor="border"
                  style={{ backgroundColor: colorSetting.primaryColor }}
                />
                <Text variant="bodySm" as="p">
                  {colorSetting.primaryColor}
                </Text>
              </BlockStack>
              <BlockStack gap="200">
                <Text variant="bodyMd">Secondary Color</Text>
                <Box
                  width="100px"
                  height="100px"
                  background="bg-surface"
                  borderRadius="200"
                  borderWidth="025"
                  borderColor="border"
                  style={{ backgroundColor: colorSetting.secondaryColor }}
                />
                <Text variant="bodySm" as="p">
                  {colorSetting.secondaryColor}
                </Text>
              </BlockStack>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}
