document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const Stock_id = params.get("Stock_id");

  if (!Stock_id) {
    document.body.innerHTML = "<h2>Invalid Diamond ID</h2>";
    return;
  }

  try {
    const apiUrl = `https://shopify-app-pndl.onrender.com/`;
    const res = await fetch(`${apiUrl}/apps/diamond-filter/api/diamond-detail?Stock_id=${encodeURIComponent(Stock_id)}`);
    const data = await res.json();
    console.log("Diamond details:", data);

    if (!data.diamond || data.diamond.length === 0) {
      document.body.innerHTML = "<h2>Diamond Not Found</h2>";
      return;
    }

    // API returns array
    const d = data.diamond[0];
    console.log("Diamond details:", d);

    // Title
    document.getElementById("diamond-title").innerText =
      `Diamond ${d.Stock_No}`;

    // Left image (fallback image)
    document.getElementById("diamond-image").src =
      d.Image_URL || "/apps/diamond-filter/default-image.jpg";

    // Price
    document.getElementById("diamond-price").innerText =
      d.Buy_Price ? `₹ ${Number(d.Buy_Price).toLocaleString()}` : "-";

    // Specification table
    const table = document.getElementById("diamond-details");
    table.innerHTML = "";

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
      "Depth %": d.DepthPercent,
      "Table %": d.TablePercent,
      "Measurements": `${d.MeasLength} × ${d.MeasWidth} × ${d.MeasDepth}`,
      "Certificate": d.CertificateNumber,
      "Location": d.Location
    };

    Object.entries(fields).forEach(([key, value]) => {
      const row = `
        <tr>
          <th>${key}</th>
          <td>${value ?? "-"}</td>
        </tr>`;
      table.insertAdjacentHTML("beforeend", row);
    });

  } catch (err) {
    console.error(err);
    document.body.innerHTML = "<h2>Failed to load diamond details</h2>";
  }
});
