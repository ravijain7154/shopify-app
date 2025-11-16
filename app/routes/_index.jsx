import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "../db.server";

export const loader = async ({ request }) => {
  // Fetch all diamonds from database for storefront
  const diamonds = await prisma.diamond.findMany();
  
  // Fetch color setting
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
    diamonds: diamonds || [],
    colorSetting,
  });
};

export default function Storefront() {
  const { diamonds, colorSetting } = useLoaderData();

  return (
    <div>
      <h1>Diamond Products - Storefront</h1>
      <div style={{ backgroundColor: colorSetting?.primaryColor || "#000", color: colorSetting?.secondaryColor || "#fff", padding: "20px", borderRadius: "8px" }}>
        <p>Diamonds Available: {diamonds?.length || 0}</p>
        {diamonds && diamonds.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px", marginTop: "20px" }}>
            {diamonds.slice(0, 12).map((diamond) => (
              <div key={diamond.Stock_No} style={{ border: "1px solid #555", padding: "10px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.05)" }}>
                <strong>{diamond.Stock_No}</strong>
                <p>Shape: {diamond.Shape}</p>
                <p>Weight: {diamond.Weight} ct</p>
                <p>Color: {diamond.Color}</p>
                <p>Clarity: {diamond.Clarity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No diamonds found. Please contact admin to sync data.</p>
        )}
      </div>
    </div>
  );
}
