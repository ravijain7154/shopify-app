import { json } from "@remix-run/node";
import { authenticate } from "../../shopify.server";
import { syncDiamondsFromAPI } from "../../utils/syncDiamonds.server";

export const action = async ({ request }) => {
  // Only allow POST requests
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    // Authenticate the admin request
    await authenticate.admin(request);
    
    console.log("Starting diamond sync...");
    const { insertedCount, updatedCount, error } = await syncDiamondsFromAPI();
    console.log("Sync complete:", { insertedCount, updatedCount, error });

    if (error) {
      return json(
        {
          success: false,
          message: `Sync failed: ${error}`,
          insertedCount: 0,
          updatedCount: 0,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );
    }

    return json({
      success: true,
      message: `Sync completed! Inserted: ${insertedCount}, Updated: ${updatedCount}`,
      insertedCount,
      updatedCount,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("Sync action error:", err);
    return json(
      {
        success: false,
        message: `Sync error: ${err.message}`,
        insertedCount: 0,
        updatedCount: 0,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    );
  }
};
