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

    const defaultImage = "https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/default-image.jpg";
    const imageUrl = getSafeUrl(d.ImageLink) || defaultImage;
    const videoUrl = getVideoUrl(d);
    const certificateUrl = getCertificateUrl(d);

    const mediaItems = [
      { type: "image", label: "Image", url: imageUrl },
      ...(videoUrl ? [{ type: "video", label: "Video", url: videoUrl }] : []),
      ...(certificateUrl ? [{ type: "certificate", label: "Certificate", url: certificateUrl }] : []),
    ];

    root.innerHTML = `
      <div class="diamond-container">

        <div class="diamond-left">
          <div class="gallery_block">
            <div class="main-image-container" id="main-media-container">
              ${renderMainMedia(mediaItems[0])}
            </div>
            <div class="thumbnail-container">
              ${mediaItems.map((item, index) => renderThumb(item, index === 0)).join("")}
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
              ${renderRow("Fluorescence", d.Fluorescence_Intensity)}
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

    bindMediaThumbEvents(root);

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

function getSafeUrl(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("//")) {
    return trimmed;
  }
  return "";
}

function isLikelyUrl(value) {
  return Boolean(getSafeUrl(value));
}

function extractIframeSrc(html) {
  if (!html || typeof html !== "string") return "";
  const match = html.match(/src\s*=\s*['\"]([^'\"]+)['\"]/i);
  return match ? getSafeUrl(match[1]) : "";
}

function getVideoUrl(diamond) {
  return getSafeUrl(diamond?.VideoLink) || extractIframeSrc(diamond?.Video_HTML) || "";
}

function getCertificateUrl(diamond) {
  return getSafeUrl(diamond?.CertificateLink) || (isLikelyUrl(diamond?.Certificate) ? diamond.Certificate : "");
}

function renderMainMedia(item) {
  if (!item) return "";

  if (item.type === "video") {
    const isEmbed = /youtube\.com|youtu\.be|vimeo\.com/i.test(item.url);
    if (isEmbed) {
      return `<iframe src="${item.url}" title="Diamond Video" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="width:100%;min-height:420px;"></iframe>`;
    }
    return `<video controls playsinline style="width:100%;" src="${item.url}"></video>`;
  }

  if (item.type === "certificate") {
    return `<iframe src="${item.url}" title="Diamond Certificate" frameborder="0" style="width:100%;min-height:420px;"></iframe>`;
  }

  return `<img src="${item.url}" alt="Diamond" />`;
}

function renderThumb(item, isActive) {
  const activeClass = isActive ? " active" : "";

  if (item.type === "image") {
    return `
      <button type="button" class="media-thumb${activeClass}" data-media-type="${item.type}" data-media-url="${item.url}">
        <img src="${item.url}" alt="Image thumbnail" />
      </button>
    `;
  }

  const icon = item.type === "video" ? "https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/vdobig.png" : "https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/notebook.svg";
  return `
    <button type="button" class="media-thumb media-thumb-icon${activeClass}" data-media-type="${item.type}" data-media-url="${item.url}">
      <span aria-hidden="true">${icon}</span>
      // <span>${item.label}</span>
    </button>
  `;
}

function bindMediaThumbEvents(root) {
  const mainMediaContainer = root.querySelector("#main-media-container");
  const thumbs = root.querySelectorAll(".media-thumb");

  if (!mainMediaContainer || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const type = thumb.getAttribute("data-media-type");
      const url = thumb.getAttribute("data-media-url");
      mainMediaContainer.innerHTML = renderMainMedia({ type, url });

      thumbs.forEach((btn) => btn.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}
