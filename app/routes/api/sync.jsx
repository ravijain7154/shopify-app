// import { json } from "@remix-run/node";
// import { syncDiamondsFromAPI } from "../../utils/syncDiamonds.server";

// export const action = async ({ request }) => {
//   // Only allow POST requests
//   if (request.method !== "POST") {
//     console.log('[sync action] Invalid method:', request.method);
//     return json({ error: "Method not allowed" }, { status: 405 });
//   }

//   console.log('[sync action] POST request received at /api/sync');

//   try {
//     console.log('[sync action] Calling syncDiamondsFromAPI...');
//     const { insertedCount, updatedCount, error } = await syncDiamondsFromAPI();
//     console.log('[sync action] Sync complete:', { insertedCount, updatedCount, error });

//     if (error) {
//       return json(
//         {
//           success: false,
//           message: `Sync failed: ${error}`,
//           insertedCount: 0,
//           updatedCount: 0,
//           timestamp: new Date().toISOString()
//         },
//         { status: 200 }
//       );
//     }

//     return json({
//       success: true,
//       message: `Sync completed! Inserted: ${insertedCount}, Updated: ${updatedCount}`,
//       insertedCount,
//       updatedCount,
//       timestamp: new Date().toISOString()
//     });
//   } catch (err) {
//     console.error("[sync action] Sync action error:", err);
//     return json(
//       {
//         success: false,
//         message: `Sync error: ${err.message}`,
//         insertedCount: 0,
//         updatedCount: 0,
//         timestamp: new Date().toISOString()
//       },
//       { status: 200 }
//     );
//   }
// };
