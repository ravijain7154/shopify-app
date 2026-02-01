(function() {
  try {
    if (!window.location.pathname.includes('/pages/diamond')) return;

    // Avoid double-insertion
    if (document.getElementById('my-shopify-app-iframe')) return;

    // Create a container and an iframe that loads the filter UI from our domain.
    var container = document.createElement('div');
    container.id = 'my-shopify-app';
    container.style.position = 'relative';
    container.style.zIndex = '99999';

    var iframe = document.createElement('iframe');
    iframe.id = 'my-shopify-app-iframe';
    iframe.src = 'https://shopify-app-pndl.onrender.com/diamond-filter/index.html';
    iframe.style.width = '100%';
    iframe.style.border = '0';
    iframe.style.minHeight = '700px';
    iframe.style.display = 'block';
    iframe.setAttribute('title', 'Diamond Filter');
    // Optional sandbox attributes could be added here if needed, e.g., sandbox="allow-scripts allow-same-origin"

    container.appendChild(iframe);

    // Insert the container near the main content by prepending to body
    document.body.prepend(container);
  } catch (e) {
    console.error('inject.js error', e);
  }
})();
