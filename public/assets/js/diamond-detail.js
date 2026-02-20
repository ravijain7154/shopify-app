document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const Stock_id = params.get("Stock_id");
  const container = document.querySelector(".diamond-container");

  if (!Stock_id) {
    if(container) container.innerHTML = "<h2>Invalid Diamond ID</h2>";
    return;
  }

  try {
    const apiUrl = `https://shopify-app-pndl.onrender.com`;
    const res = await fetch(`${apiUrl}/apps/diamond-filter/api/diamond-detail?Stock_id=${encodeURIComponent(Stock_id)}`);
    const data = await res.json();

    // Fix: Your backend sends { diamond: [ [Object] ] } because of findMany + []
    // Let's flatten it to be safe
    let d = Array.isArray(data.diamond) ? data.diamond[0] : null;
    if (Array.isArray(d)) d = d[0]; // Handles the double nesting [[{}]]

    if (!d) {
      document.getElementById("diamond-title").innerText = "Diamond Not Found";
      return;
    }

    // Mapping fields
    document.getElementById("diamond-title").innerText = `Diamond ${d.Stock_No || ''}`;
    document.getElementById("diamond-image").src = d.Image_URL || "https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/default-image.jpg";
    document.getElementById("diamond-price").innerText = d.Buy_Price ? `₹ ${Number(d.Buy_Price).toLocaleString()}` : "-";

    const fields = {
      "Stock No": d.Stock_No,
      "Shape": d.Shape,
      "Carat": d.Weight,
      "Color": d.Color,
      "Clarity": d.Clarity,
      "Cut": d.Cut_Grade,
      "Polish": d.Polish,
      "Symmetry": d.Symmetry,
      "Fluorescence": d.FluoIntensity,
      "Measurements": `${d.MeasLength || ''} × ${d.MeasWidth || ''} × ${d.MeasDepth || ''}`,
      "Certificate": d.CertificateNumber
    };

    const table = document.getElementById("diamond-details");
    table.innerHTML = Object.entries(fields)
      .map(([key, value]) => `<tr><th>${key}</th><td>${value ?? "-"}</td></tr>`)
      .join("");

  } catch (err) {
    console.error("Error:", err);
    // Don't use document.body.innerHTML here or you destroy the Shopify Header/Footer
    const title = document.getElementById("diamond-title");
    if(title) title.innerText = "Error loading diamond details";
  }
});