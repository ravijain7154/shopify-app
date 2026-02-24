document.addEventListener("DOMContentLoaded", async () => {

  const stockId = window.STOCK_ID;
  const root = document.getElementById("diamond-detail-root");

  if (!stockId) {
    root.innerHTML = "<h2>Invalid Diamond ID</h2>";
    return;
  }
  const APP_URL = 'https://shopify-app-pndl.onrender.com';

  // 1️⃣ Load CSS explicitly
  const styles = [
    `${APP_URL}/diamond-filter/assets/css/styles.css`,
  ];

  styles.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });

  try {

    const res = await fetch(
      `/apps/diamond-filter/api/diamond-detail?Stock_id=${encodeURIComponent(stockId)}`
    );

    const data = await res.json();
    const d = data?.diamond?.[0];
    console.log("Fetched diamond data:", d);
    if (!d) {
      root.innerHTML = "<h2>Diamond Not Found</h2>";
      return;
    }

    root.innerHTML = `
      <div class="diamond-container">

        <div class="diamond-left">
          <div class="gallery_block">
            <div class="main-image-container">
              <img src="${d.ImageLink || 'https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/default-image.jpg'}"
                  alt="Diamond">
            </div>
            <div class="thumbnail-container">
            </div>
          </div>
        </div>

        <div class="diamond-right">
          <h1>Diamond ${d.Stock_No || ''}</h1>
          <div class="price">
            ${d.Buy_Price ? `$${Number(d.Buy_Price).toLocaleString()}` : '-'}
          </div>

          <ul class="diamond-specs">
              ${renderRow("Stock No", d.Stock_No)}
              ${renderRow("Shape", d.Shape)}
              ${renderRow("Carat", d.Weight)}
              ${renderRow("Color", d.Color)}
              ${renderRow("Clarity", d.Clarity)}
              ${renderRow("Cut", d.Cut_Grade)}
              ${renderRow("Polish", d.Polish)}
              ${renderRow("Symmetry", d.Symmetry)}
              ${renderRow("Fluorescence", d.FluoIntensity)}
              ${renderRow("Certificate", d.CertificateNumber)}
              ${renderRow("Lab", d.Lab)}
              ${renderRow("Depth %", d.DEPTH_PER)}
              ${renderRow("Table %", d.TABLE_PER)}
              ${renderRow("Girdle", d.Girdle_Condition)}
              ${renderRow("Culet", d.Culet)}
              ${renderRow("Measurements", d.Measurements)}
             ${renderRow("Ratio", d.Ratio ? d.Ratio.toFixed(2) : '-')}
           
          </ul>

          <div class="actions">
            <button class="btn primary">Request Price</button>
            <button class="btn">Add to Wishlist</button>
          </div>
        </div>

      </div>
    `;

  } catch (err) {
    console.error(err);
    root.innerHTML = "<h2>Error loading diamond details</h2>";
  }

});

function renderRow(label, value) {
  return `
    <li>
      <span class="label">${label}:</span>
      <span class="value">${value ?? "-"}</span>
    </li>
  `;
}