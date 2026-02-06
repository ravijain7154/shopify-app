document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const Stock_id = params.get("Stock_id");

  if (!Stock_id) {
    alert("Invalid Diamond ID");
    return;
  }

  try {
    const res = await fetch(`/api/diamond-detail?Stock_id=${Stock_id}`);
    const data = await res.json();

    if (!data.diamond) {
      document.getElementById("diamond-title").innerText = "Diamond Not Found";
      return;
    }

    const d = data.diamond;

    document.getElementById("diamond-title").innerText =
      `Diamond ${d.CertificateNumber}`;

    const table = document.getElementById("diamond-details");

    const fields = {
      Shape: d.Shape,
      Carat: d.Weight,
      Color: d.Color,
      Clarity: d.Clarity,
      Cut: d.Cut_Grade,
      Polish: d.Polish,
      Symmetry: d.Symmetry,
      Fluorescence: d.FluoIntensity,
      Price: `₹ ${d.Buy_Price}`
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
    alert("Failed to load diamond details");
  }
});
