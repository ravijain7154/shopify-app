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
    const diamondCount = await prisma.diamond.count();
    return json({ 
      color: colorSetting?.color || '#ffffff',
      diamondCount: diamondCount || 0
    });
  } catch (error) {
    console.error('Loader error:', error);
    return json({ color: '#ffffff', diamondCount: 0 });
  }
};
// -------------------------
// ACTION → Save color
// -------------------------
export const action = async ({ request }) => {
  try {
    const toDiamondPayload = (item) => ({
      Availability: item.Availability,
      Shape: item.Shape,
      Weight: parseFloat(item.Weight) || 0,
      Color: item.Color,
      Clarity: item.Clarity,
      Cut_Grade: item.Cut_Grade,
      Polish: item.Polish,
      Symmetry: item.Symmetry,
      Fluorescence_Intensity: item.Fluorescence_Intensity,
      Fluorescence_Color: item.Fluorescence_Color,
      Measurements: item.Measurements,
      Lab: item.Lab,
      Treatment: item.Treatment,
      FancyColor: item.FancyColor,
      Fancy_Color_Intensity: item.Fancy_Color_Intensity,
      FancyColorOvertone: item.FancyColorOvertone,
      DEPTH_PER: parseFloat(item.DEPTH_PER) || 0,
      TABLE_PER: parseFloat(item.TABLE_PER) || 0,
      Girdle_Min: parseFloat(item.Girdle_Min) || 0,
      Girdle_Max: parseFloat(item.Girdle_Max) || 0,
      Girdle_Per: parseFloat(item.Girdle_Per) || 0,
      Girdle_Condition: item.Girdle_Condition,
      Culet_Size: item.Culet_Size,
      Culet_Condition: item.Culet_Condition,
      Crown_Height: parseFloat(item.Crown_Height) || 0,
      Crown_Angle: parseFloat(item.Crown_Angle) || 0,
      Pavilion_Depth: parseFloat(item.Pavilion_Depth) || 0,
      Pavilion_Angle: parseFloat(item.Pavilion_Angle) || 0,
      Cert_Comments: item.Cert_Comments,
      Country: item.Country,
      State: item.State,
      City: item.City,
      Country_Of_Origin: item.Country_Of_Origin,
      Key_To_Symbols: item.Key_To_Symbols,
      Shade: item.Shade,
      Star_Length: item.Star_Length,
      Report_Issue_Date: item.Report_Issue_Date ? new Date(item.Report_Issue_Date) : null,
      Report_Type: item.Report_Type,
      Milky: item.Milky,
      Eye_Clean: item.Eye_Clean,
      Gemprint_ID: item.Gemprint_ID,
      BGM: item.BGM,
      Ratio: parseFloat(item.Ratio) || 0,
      Diamond_Type: item.Diamond_Type,
      Member_Comments: item.Member_Comments,
      Time_to_Location: item.Time_to_Location,
      LsMatchedPairSeparable: item.LsMatchedPairSeparable,
      Pair_Stock: item.Pair_Stock,
      Allow_Raplink_Feed: item.Allow_Raplink_Feed,
      Parcel_Stones: item.Parcel_Stones,
      Center_Inclusion: item.Center_Inclusion,
      Black_Inclusion: item.Black_Inclusion,
      Lab_Location: item.Lab_Location,
      Brand: item.Brand,
      Sarine_Name: item.Sarine_Name,
      Internal_Clarity_Desc_Code: item.Internal_Clarity_Desc_Code,
      Clarity_Description: item.Clarity_Description,
      Modified_Rate: parseFloat(item.Modified_Rate) || 0,
      wire_discount_price: parseFloat(item.wire_discount_price) || 0,
      ImageLink: item.ImageLink,
      VideoLink: item.VideoLink,
      Video_HTML: item.Video_HTML,
      CertificateLink: item.CertificateLink,
      Rap_Price: parseFloat(item.Rap_Price) || 0,
      Memo_Price: parseFloat(item.Memo_Price) || 0,
      Memo_Discount_PER: parseFloat(item.Memo_Discount_PER) || 0,
      Buy_Price: parseFloat(item.Buy_Price) || 0,
      Buy_Price_Discount_PER: parseFloat(item.Buy_Price_Discount_PER) || 0,
      COD_Buy_Price: parseFloat(item.COD_Buy_Price) || 0,
      COD_Buy_Price_Discount_PER: parseFloat(item.COD_Buy_Price_Discount_PER) || 0,
      Certificate: item.Certificate
    });

    const formData = await request.formData();
    const actionType = formData.get('_action');

    // Sync diamonds action
    if (actionType === 'sync') {
      console.log('[app action] Syncing diamonds...');
      const apiUrl = 'https://belgiumdia.com/api/DeveloperAPI?APIKEY=134981956a7be967bf4a198e5bfccf4059085cf9dd4d';
      const BATCH_SIZE = 100;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }

      const data = await response.json();
      console.log('[app action] API response data:', data);
      let diamonds = data.Stock || [];
      diamonds = diamonds.filter((item) => typeof item?.Stock_No === "string" && item.Stock_No.trim().length > 0);

      if (!Array.isArray(diamonds) || diamonds.length === 0) {
        throw new Error('No diamonds data received from API');
      }

      let insertedCount = 0;
      let updatedCount = 0;
      let errorCount = 0;

      for (let i = 0; i < diamonds.length; i += BATCH_SIZE) {
        const batch = diamonds.slice(i, i + BATCH_SIZE);
        const stockNos = batch.map((item) => item.Stock_No.trim());

        const existing = await prisma.diamond.findMany({
          where: { Stock_No: { in: stockNos } },
          select: { Stock_No: true }
        });
        const existingSet = new Set(existing.map((row) => row.Stock_No));

        await Promise.all(
          batch.map(async (item) => {
            try {
              const stockNo = item.Stock_No.trim();
              const payload = toDiamondPayload(item);

              await prisma.diamond.upsert({
                where: { Stock_No: stockNo },
                update: payload,
                create: { Stock_No: stockNo, ...payload }
              });

              if (existingSet.has(stockNo)) {
                updatedCount++;
              } else {
                insertedCount++;
              }
            } catch (itemError) {
              console.error(`[app action] Error syncing ${item.Stock_No}:`, itemError.message);
              errorCount++;
            }
          })
        );
      }

      return json({
        success: true,
        message: `✅ Sync completed! Inserted: ${insertedCount}, Updated: ${updatedCount}, Errors: ${errorCount}`,
        insertedCount,
        updatedCount,
        errorCount,
        total: diamonds.length
      });
    }

    // Save color action (original logic)
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
    console.error("Error in action:", error);
    return json({ error: error.message || "Failed to process request" }, { status: 500 });
  }
};

export default function AppRoute() {
  const { color, diamondCount } = useLoaderData();
  const actionData = useActionData();
  // For diamond sync
  const syncFetcher = useFetcher();
  const colorFetcher = useFetcher();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState(null);

  // Sync button click
  const handleSync = () => {
    setIsSyncing(true);
    setSyncMessage("Syncing diamonds...");
    syncFetcher.submit({ _action: 'sync' }, { method: "post" });
    console.log("Sync initiated");
  };

  // Sync response management
  useEffect(() => {
    if (syncFetcher.state === "idle" && syncFetcher.data) {
      console.log("Sync response:", syncFetcher.data);
      setIsSyncing(false);
      setSyncMessage(syncFetcher.data.message);

      setTimeout(() => setSyncMessage(null), 5000);
    }
  }, [syncFetcher.state, syncFetcher.data]);

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
                 <Text as="p" variant="bodyMd">
                💎 <strong>Total Diamonds in Database:</strong> {diamondCount || 0}
              </Text>
              {syncMessage && (
                <Text
                  as="p"
                  variant="bodyMd"
                  color={syncFetcher.data?.success ? "success" : "critical"}
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

          <colorFetcher.Form method="post" onSubmit={() => console.log('Color save submitted via fetcher')}>
            <input type="hidden" name="_action" value="save-color" />
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
                    defaultValue={colorFetcher.data?.color || actionData?.color || color}
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
                      backgroundColor: colorFetcher.data?.color || actionData?.color || color,
                      border: "1px solid #000",
                      borderRadius: "6px",
                      marginTop: "6px"
                    }}
                  ></div>
                </div>
              </InlineStack>

              {/* Messages */}
              {colorFetcher.data?.message && (
                <Text color="success">{colorFetcher.data.message}</Text>
              )}
              {colorFetcher.data?.error && (
                <Text color="critical">{colorFetcher.data.error}</Text>
              )}
              {actionData?.message && (
                <Text color="success">{actionData.message}</Text>
              )}
              {actionData?.error && (
                <Text color="critical">{actionData.error}</Text>
              )}

              <Button variant="primary" submit disabled={colorFetcher.state === "submitting"}>
                {colorFetcher.state === "submitting" ? "Saving..." : "Save Color"}
              </Button>
            </BlockStack>
          </colorFetcher.Form>
        </BlockStack>
      </Card>
    </>
  );
}

export function ErrorBoundary() {
  return <div>Something went wrong in the app route!</div>;
}
