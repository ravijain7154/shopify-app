(function () {

  const root = document.getElementById("diamond-detail-root");
  if (!root) return;

  const stockId = window.STOCK_ID;
  if (!stockId) {
    root.innerHTML = "<h2>Invalid Diamond ID</h2>";
    return;
  }

  fetch(`/apps/diamond-filter/api/diamond-detail?Stock_id=${encodeURIComponent(stockId)}`)
    .then(res => res.json())
    .then(data => {

      const d = data?.diamond?.[0];
      if (!d) {
        root.innerHTML = "<h2>Diamond Not Found</h2>";
        return;
      }

      root.innerHTML = `
        <div class="diamond-container">
          <div class="diamond-left">
            <img src="${d.Image_URL || ''}" alt="Diamond">
          </div>
          <div class="diamond-right">
            <h1>Diamond ${d.Stock_No || ''}</h1>
            <div class="price">
              ${d.Buy_Price ? `₹ ${Number(d.Buy_Price).toLocaleString()}` : '-'}
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      root.innerHTML = "<h2>Error loading diamond details</h2>";
    });

})();