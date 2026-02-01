(function() {
  try {
    // Only run on the product collection page we expect; tweak as needed
    if (window.location.pathname.includes('/pages/diamond')) {
      var s = document.createElement('script');
      s.src = 'https://shopify-app-pndl.onrender.com/diamond-filter/script.js';
      s.async = false;
      document.head.appendChild(s);
    }
  } catch (e) {
    console.error('inject.js error', e);
  }
})();
