// let currentPage = 1; // Track the current page
let pageSize = 25;   // Default number of diamonds per page
let diamonds = [];    // Store fetched diamonds data
let totalPages = 1;   // Total pages (from the API response)
let totalCount = 0;   // Total product count (from the API response)
let isColorApplied = false;

function initMoreFilterToggle() {
  const btn = document.querySelector('.more_filter_btn');
  const panel = document.querySelector('.more-filter');

  if (!btn || !panel) {
    console.warn('More filter elements not found');
    return;
  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const isOpen = panel.style.display === 'block';

    if (isOpen) {
      panel.style.display = 'none';
      btn.querySelector('span').textContent = 'More Filter';
      btn.querySelector('svg')?.classList.remove('rotate-270');
      btn.querySelector('svg')?.classList.add('rotate-90');
    } else {
      panel.style.display = 'block';
      btn.querySelector('span').textContent = 'Less Filter';
      btn.querySelector('svg')?.classList.remove('rotate-90');
      btn.querySelector('svg')?.classList.add('rotate-270');
    }
  });
}

(function () {
//   if (!location.pathname.includes('/apps/diamond-filter')) return;

  const container = document.getElementById('diamond-app');
  if (!container) return;

  const APP_URL = 'https://shopify-app-pndl.onrender.com';

  // 1️⃣ Load CSS explicitly
  const styles = [
    `${APP_URL}/diamond-filter/assets/css/styles.css`,
    `${APP_URL}/diamond-filter/assets/css/datatables.min.css`,
    `${APP_URL}/diamond-filter/assets/css/ring_builder.css`,
    `${APP_URL}/diamond-filter/assets/css/diamond.css`,
    `${APP_URL}/diamond-filter/assets/css/ion.rangeSlider.css`,
    `${APP_URL}/diamond-filter/assets/css/ion.rangeSlider.skinNice.css`,
  ];

  styles.forEach(href => {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  });

  // 2️⃣ Inject HTML
  fetch(`${APP_URL}/diamond-filter/index.html`)
    .then(r => r.text())
    .then(html => {
      container.innerHTML = html;
    })
    .then(() => {
      // 3️⃣ Load JS AFTER HTML exists
      const scripts = [
        `${APP_URL}/diamond-filter/assets/js/jquery.min.js`,
        `${APP_URL}/diamond-filter/assets/js/datatables.min.js`,
        `${APP_URL}/diamond-filter/assets/js/ion.rangeSlider.js`,
        `${APP_URL}/diamond-filter/assets/js/app.js`,
        `${APP_URL}/diamond-filter/script.js`,
        `${APP_URL}/diamond-filter/assets/js/manage_diamond.js`,
      ];

      scripts.reduce((p, src) => {
        return p.then(() => new Promise(resolve => {
          const s = document.createElement('script');
          s.src = src;
          s.onload = resolve;
          document.body.appendChild(s);
        }));
      }, Promise.resolve()).then(() => {
        console.log('Diamond app loaded');
        initMoreFilterToggle();
        // Initialize the diamond UI after all scripts are loaded 
        document.getElementById('grid-view-btn')?.addEventListener('click', switchToGridView); 
        document.getElementById('list-view-btn')?.addEventListener('click', switchToListView);
        // Apply configured background color if available (safe to call)
        fetchAndApplyBackgroundColor().catch(err => console.warn('fetch color failed', err));
      });
    })
    .catch(err => console.error('Diamond app load error:', err));
})();

  
// Fetch and apply background color dynamically
async function fetchAndApplyBackgroundColor() {
    try {
        const response = await fetch('/apps/diamond-filter/api/get-color');
        if (!response.ok) {
            throw new Error('Failed to fetch color');
        }
        const data = await response.json();
        const cardBgColor = data.color || '#ffffff';
        console.log(cardBgColor);
        document.documentElement.style.setProperty('--card-bg-color', cardBgColor);
    } catch (error) {
        console.error('Error applying background color:', error);
    }
}

// document.getElementById('productsPerPage').addEventListener('change', function() {
//     pageSize = parseInt(this.value, 25);  
//     currentPage = 1;  
//     // updateURL(); 
//     fetchDiamonds();
// });
const productsPerPageEl = document.getElementById('productsPerPage');
if (productsPerPageEl) {
  productsPerPageEl.addEventListener('change', function() {
    pageSize = parseInt(this.value, 10) || 25; // radix 10 + fallback
    currentPage = 1;
    fetchDiamonds();
  });
}
// Fetch diamond data from the API (with dynamic pagination)
async function fetchDiamonds(retry = true) {
    try {
        showLoader(); 

        const queryParams = new URLSearchParams(window.location.search);  // Get query parameters from the URL
        const selectedShapes = queryParams.get('Shape') ? decodeURIComponent(queryParams.get('Shape')).split(',') : [];

        const priceRange = queryParams.get('price');

        let priceMin = '';  // Change to 'let' instead of 'const'
        let priceMax = '';  // Change to 'let' instead of 'const'

        // if (priceRange) {
        //     [priceMin, priceMax] = priceRange.split(';');  // Split the price range
        // }

        if (priceRange && priceRange.includes(';')) {
        const parts = priceRange.split(';').map(v => v.trim());
            priceMin = parts[0] || '';
            priceMax = parts[1] || '';
        } 

       // Get carat range from the URL
       const caratRange = queryParams.get('carat');
       let caratMin = '';
       let caratMax = '';
        //    if (caratRange) {
        //        [caratMin, caratMax] = caratRange.split(';');
        //    }
       if (caratRange && caratRange.includes(';')) {
        const parts = caratRange.split(';').map(v => v.trim());
            caratMin = parts[0] || '';
            caratMax = parts[1] || '';
        } 

       // get color range from url  
       const colorParam = queryParams.get('color');
        let colorMin = '';
        let colorMax = '';

        if (colorParam && colorParam.includes(';')) {
            const parts = colorParam.split(';').map(v => v.trim());
            colorMin = parts[0] || '';
            colorMax = parts[1] || '';
        }


       const clarityRange = queryParams.get('clarity');
       let clarityMin = '';
       let clarityMax = '';
        if (clarityRange && clarityRange.includes(';')) {
            const parts = clarityRange.split(';').map(v => v.trim());
            clarityMin = parts[0] || '';
            clarityMax = parts[1] || '';
        }

    //    if (clarityRange) {
    //     [clarityMin, clarityMax] = clarityRange.split(';');
    //    }

       // Get cut range from the URL (e.g., VG;FR)
       const cutRange = queryParams.get('cut');
       let cutMin = '';
       let cutMax = '';
    //    if (cutRange) {
    //        [cutMin] = decodeURIComponent(cutRange).split(';');
    //    }
         if (cutRange && cutRange.includes(';')) {
            const parts = cutRange.split(';').map(v => v.trim());
            cutMin = parts[0] || '';
            cutMax = parts[1] || '';
        }

         // Get cut range from the URL (e.g., VG;FR)
            const polishRange = queryParams.get('polish');
            let polishMin = '';
            let polishMax = '';
            //    if (polishRange) {
            //        [polishMin] = decodeURIComponent(polishRange).split(';');
            //    }
                if (polishRange && polishRange.includes(';')) {
                    const parts = polishRange.split(';').map(v => v.trim());
                    polishMin = parts[0] || '';
                    polishMax = parts[1] || '';
                }

            // Get cut range from the URL (e.g., VG;FR)
            const fluorRange = queryParams.get('fluor');
            let fluorMin = '';
            let fluorMax = '';
            //    if (fluorRange) {
            //        [fluorMin] = decodeURIComponent(fluorRange).split(';');
            //    }
                if (fluorRange && fluorRange.includes(';')) {
                    const parts = fluorRange.split(';').map(v => v.trim());
                    fluorMin = parts[0] || '';
                    fluorMax = parts[1] || '';
                }
             
             // Get sym  range from the URL (e.g., VG;FR)
            const symRange = queryParams.get('sym');
            let symMin = '';
            let symMax = '';
            //    if (symRange) {
            //        [symMin] = decodeURIComponent(symRange).split(';');
            //    }
                if (symRange && symRange.includes(';')) {
                    const parts = symRange.split(';').map(v => v.trim());
                    symMin = parts[0] || '';
                    symMax = parts[1] || '';
                }
             
            


        // const params = new URLSearchParams({
        //     page: currentPage,
        //     perPage: pageSize,
        //     Shape: selectedShapes.join(','),
        //     price_min: priceMin,
        //     price_max: priceMax,
        //     carat_min: caratMin,
        //     carat_max: caratMax,
        //     color_min: colorMin,
        //     color_max: colorMax,
        //     clarity_min: clarityMin,
        //     clarity_max: clarityMax,
        //     cut_min: cutMin,
        //     // cut_max: cutMax,
        // }).toString();

        const apiParams = {
            page: currentPage,
            perPage: pageSize,
        };

if (selectedShapes.length) apiParams.Shape = selectedShapes.join(',');
// if (priceMin) apiParams.price_min = priceMin;
// if (priceMax) apiParams.price_max = priceMax;
// if (caratMin) apiParams.carat_min = caratMin;
// if (caratMax) apiParams.carat_max = caratMax;
// if (clarityMin) apiParams.clarity_min = clarityMin;
// if (clarityMax) apiParams.clarity_max = clarityMax;
// if (cutMin) apiParams.cut_min = cutMin;
// if (cutMax) apiParams.cut_max = cutMax;
// ✅ IMPORTANT: send color only if selected
if (priceMin && priceMax) {
  apiParams.price = `${priceMin};${priceMax}`;
}
if (caratMin && caratMax) {
  apiParams.carat = `${caratMin};${caratMax}`;
}
if (clarityMin && clarityMax) {
  apiParams.clarity = `${clarityMin};${clarityMax}`;
}
if (cutMin && cutMax) {
    apiParams.cut = `${cutMin};${cutMax}`;
}

if (colorMin && colorMax) {
  apiParams.color = `${colorMin};${colorMax}`;
}

if (symMin && symMax) {
  apiParams.sym = `${symMin};${symMax}`;
}
if (polishMin && polishMax) {
    apiParams.polish = `${polishMin};${polishMax}`;
}
if (fluorMin && fluorMax) {
    apiParams.fluor = `${fluorMin};${fluorMax}`;
}



const params = new URLSearchParams(apiParams).toString();
        const response = await fetch(`/apps/diamond-filter/api/products?${params}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        diamonds = data.products || [];  // Correctly assign products to diamonds array
        totalPages = data.pagination.totalPages || 0;  // Update totalPages from API
        totalCount = data.pagination.totalCount || 0;  // Update totalCount from API

        // If filters reduced results so current page is out of range, reset to first page and retry once
        const startIndex = ((currentPage - 1) * pageSize) + 1;
        if (totalCount > 0 && startIndex > totalCount && retry === true) {
            currentPage = 1;
            return fetchDiamonds(false);
        }

        // If there are no products, clear and render empty state
        if (totalCount === 0) {
            diamonds = [];
            renderDiamonds();
            renderPagination();
            updateSortArrow();
            hideLoader();
            return;
        }

        // Normal render flow
        renderDiamonds();  // Render diamonds after fetching
        renderPagination();  // Render pagination after fetching
        updateSortArrow();
        hideLoader(); 
    } catch (error) {
        console.error('Error fetching diamonds:', error);
        diamonds = [];  // Reset diamonds in case of error
        hideLoader(); 
    }
}
// Show the loader
function showLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'flex';
}
function hideLoader() {
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}
// function updateURL() {
//     const selectedShapes = getSelectedShapes(); 
//     const priceMin = document.getElementById('range_55_input_from').value || '';  // Get from price input
//     const priceMax = document.getElementById('range_55_input_to').value || '';    // Get to price input
   
//     const params = new URLSearchParams(); 

//     // Add 'Shape' parameter only if there are selected shapes
//     if (selectedShapes.length > 0) {
//         params.set('Shape', selectedShapes.join(','));  // Join selected shapes as comma-separated string
//     } else {
//         params.delete('Shape'); // Remove Shape parameter if no shapes are selected
//     }

//      if (priceMin && priceMax) {
//         params.set('price_min', priceMin);
//         params.set('price_max', priceMax);
//     } else {
//         params.delete('price_min');  // Remove price_min if not set
//         params.delete('price_max');  // Remove price_max if not set
//     }

//     window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    
//     // Trigger the fetchDiamonds function to get diamonds based on the updated URL
//     fetchDiamonds();
// }



function updateSortArrow() {
    document.querySelectorAll('.sortable').forEach((header) => {
        header.classList.remove('sorted-asc', 'sorted-desc');  // Remove previous sort styles
    });

    const sortedHeader = document.querySelector(`.sortable[data-column="${sortColumn}"]`);
    if (sortedHeader) {
        sortedHeader.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
}
// Function to get the selected shapes from the checkboxes
function getSelectedShapes() {
    const selectedShapes = [];
    // Iterate over all checkboxes and get the checked ones
    document.querySelectorAll('input[name="checkbox[]"]:checked').forEach((checkbox) => {
        selectedShapes.push(checkbox.value);  // Add the value (shape) to the array
    });
    return selectedShapes;
}

// Attach event listeners to all checkboxes
// document.querySelectorAll('input[name="checkbox[]"]').forEach((checkbox) => {
//     checkbox.addEventListener('change', updateURL);  // Call updateURL when a checkbox is checked/unchecked
// });


// Render pagination controls dynamically based on total pages and current page
function renderPagination() {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  // ----- Product Count -----
  const productCountContainer = document.createElement('div');
  productCountContainer.classList.add('product-count');

  if (totalCount === 0) {
    productCountContainer.textContent = 'No products found';
  } else {
    const startIndex = ((currentPage - 1) * pageSize) + 1;
    const endIndex = Math.min(currentPage * pageSize, totalCount);
    productCountContainer.textContent =
      `Showing ${startIndex} - ${endIndex} of ${totalCount} products`;
  }

  paginationContainer.appendChild(productCountContainer);

  // ----- Helper to create button -----
  function createButton(label, page, disabled = false, active = false) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.disabled = disabled;
    if (active) btn.classList.add('active');

    btn.addEventListener('click', () => {
      currentPage = page;
      fetchDiamonds();
    });

    return btn;
  }

  if (totalPages <= 1) return;

  const range = 2; // pages around current page

  // ----- First Page -----
  if (currentPage > 1) {
    paginationContainer.appendChild(
      createButton('<<', 1)
    );
  }

  // ----- Previous -----
  paginationContainer.appendChild(
    createButton('Previous', currentPage - 1, currentPage === 1)
  );

  // ----- Page Window Logic -----
  let startPage = Math.max(1, currentPage - range);
  let endPage = Math.min(totalPages, currentPage + range);

  if (startPage > 1) {
    paginationContainer.appendChild(createButton(1, 1));
    if (startPage > 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      paginationContainer.appendChild(dots);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationContainer.appendChild(
      createButton(i, i, false, i === currentPage)
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      paginationContainer.appendChild(dots);
    }
    paginationContainer.appendChild(
      createButton(totalPages, totalPages)
    );
  }

  // ----- Next -----
  paginationContainer.appendChild(
    createButton('Next', currentPage + 1, currentPage === totalPages)
  );
}
// Render diamonds in grid view
function renderGridView(diamonds) {
    const gridView = document.getElementById('grid-view');
    gridView.innerHTML = '';  // Clear any previous content

    diamonds.forEach(diamond => {
        const gridDiv = document.createElement('div');
        gridDiv.classList.add('grid-item', 'grid-product');
        gridDiv.setAttribute('data-product-handle', diamond.Stock_No);
        gridDiv.setAttribute('data-product-id', diamond.Stock_No);

        const gridImage = document.createElement('div');
        gridImage.classList.add('grid__image-ratio');
        const imageLink = document.createElement('a');
        const img = document.createElement('img');
        img.src = diamond.ImageLink || 'https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/default-image.jpg';
        img.alt = `${diamond.Shape} diamond`;
        imageLink.appendChild(img);
        gridImage.appendChild(imageLink);
        gridDiv.appendChild(gridImage);

        const gridContent = document.createElement('div');
        gridContent.classList.add('grid-item__content');
        const gridLink = document.createElement('a');
        gridLink.href = `diamond-filter/diamond-detail?Stock_id=${diamond.Stock_No}`;
        gridLink.classList.add('grid-item__link');

        const gridMeta = document.createElement('div');
        gridMeta.classList.add('grid-item__meta');
        const gridMetaMain = document.createElement('div');
        gridMetaMain.classList.add('grid-item__meta-main');
        const gridTitle = document.createElement('div');
        gridTitle.classList.add('grid-product__title');
        gridTitle.innerHTML = ` ${diamond.Shape || ''} - ${diamond.Stock_No} <br>`;

        // Additional fields (shape, carat, color, clarity, etc.)
        const shapeSpan = document.createElement('span');
        shapeSpan.textContent = `Shape: ${diamond.Shape}\n`;
        gridTitle.appendChild(shapeSpan);
       
        const caratSpan = document.createElement('span');
        caratSpan.textContent = `Weight: ${diamond.Weight} \n`;
        gridTitle.appendChild(caratSpan);
        const colorSpan = document.createElement('span');
        colorSpan.textContent = `Color: ${diamond.Color}  \n`;
        gridTitle.appendChild(colorSpan);

        gridMetaMain.appendChild(gridTitle);
        gridMeta.appendChild(gridMetaMain);
        gridLink.appendChild(gridMeta);
        gridContent.appendChild(gridLink);
        gridDiv.appendChild(gridContent);

        // Price section
        const gridMetaSecondary = document.createElement('div');
        gridMetaSecondary.classList.add('grid-item__meta-secondary');
        const gridPrice = document.createElement('div');
        gridPrice.classList.add('grid-product__price');
        const priceSpan = document.createElement('span');
        priceSpan.classList.add('regular_price');
        priceSpan.textContent = `$${diamond.Buy_Price || 'Price not available'}`;
        gridPrice.appendChild(priceSpan);
        gridMetaSecondary.appendChild(gridPrice);
        gridDiv.appendChild(gridMetaSecondary);

        gridView.appendChild(gridDiv);
    });
}

// Render diamonds in table view
function renderTableView(diamonds) {
    const productTableBody = document.getElementById('productContainer');
    productTableBody.innerHTML = '';  // Clear any previous content

    diamonds.forEach(diamond => {
        const tableRow = document.createElement('tr');

        const imageCell = document.createElement('td');
        const image = document.createElement('img');
        image.src = diamond.ImageLink || 'https://shopify-app-pndl.onrender.com/diamond-filter/assets/images/default-image.jpg';
        image.alt = `${diamond.Shape} diamond`;
        image.style.width = '50px';
        image.style.height = '50px';
        image.style.objectFit = 'contain';
        imageCell.appendChild(image);

        const stockCell = document.createElement('td');
        stockCell.textContent = diamond.Stock_No;

        const shapeCell = document.createElement('td');
        shapeCell.textContent = diamond.Shape || '';

        const caratCell = document.createElement('td');
        caratCell.textContent = diamond.Weight || '';

        const colorCell = document.createElement('td');
        colorCell.textContent = diamond.Color || '';

        const clarityCell = document.createElement('td');
        clarityCell.textContent = diamond.Clarity || '';

        const cutCell = document.createElement('td');
        // let cutGradeAbbr = diamond.cutGrade;

        // Replace full cutGrade values with abbreviations directly
        // if (cutGradeAbbr === 'Very good') {
        //     cutGradeAbbr = 'VG';
        // } else if (cutGradeAbbr === 'Fair') {
        //     cutGradeAbbr = 'FR';
        // } else if (cutGradeAbbr === 'Excellent') {
        //     cutGradeAbbr = 'EX';
        // } else if (cutGradeAbbr === 'Good') {
        //     cutGradeAbbr = 'GD';
        // }

        // cutCell.textContent = cutGradeAbbr || '';  // Use the abbreviated cutGrade or fallback to an empty string

        cutCell.textContent = diamond.Cut_Grade || '';

        const priceCell = document.createElement('td');
        priceCell.textContent = `$${diamond.Buy_Price || ''}`;

        const actionCell = document.createElement('td');
        const actionLink = document.createElement('a');
        actionLink.href = `diamond-filter/diamond-detail?Stock_id=${diamond.Stock_No}`;
        actionLink.textContent = "View Details";
        actionCell.appendChild(actionLink);

        tableRow.appendChild(imageCell);
        tableRow.appendChild(stockCell);
        tableRow.appendChild(shapeCell);
        tableRow.appendChild(caratCell);
        tableRow.appendChild(colorCell);
        tableRow.appendChild(clarityCell);
        tableRow.appendChild(cutCell);
        tableRow.appendChild(priceCell);
        tableRow.appendChild(actionCell);

        productTableBody.appendChild(tableRow);
    });
}

let sortColumn = 'Stock_No';  // Default sort column
let sortDirection = 'asc';  // Default sort direction

// Function to handle sorting when a column is clicked
function handleSort(column) {
    // Toggle direction for the same column
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';  // Reset to ascending when changing column
    }

    // Update the URL and fetch diamonds with sorting
    // updateURL();
}

// Attach event listeners to sortable column headers
document.querySelectorAll('.sortable').forEach((header) => {
    header.addEventListener('click', () => {
        const column = header.getAttribute('data-column'); // Get the column name from the attribute
        handleSort(column);
    });
});

// Render diamonds based on the selected view (grid or table)
function renderDiamonds() {
    const selectedView = localStorage.getItem('selectedView') || 'grid';
    if (selectedView === 'grid') {
        renderGridView(diamonds);
    } else {
        renderTableView(diamonds);
    }
}


// Switch to grid view
function switchToGridView() {
    document.getElementById('table-container').classList.remove('list-view');
    document.getElementById('table-container').classList.add('grid-view');
    document.getElementById('grid-view-btn').classList.add('active');
    document.getElementById('list-view-btn').classList.remove('active');
    localStorage.setItem('selectedView', 'grid');
    // renderDiamonds();  // Re-render diamonds in grid view
     renderGridView(diamonds);
}

// Switch to list view
function switchToListView() {
    document.getElementById('table-container').classList.remove('grid-view');
    document.getElementById('table-container').classList.add('list-view');
    document.getElementById('list-view-btn').classList.add('active');
    document.getElementById('grid-view-btn').classList.remove('active');
    localStorage.setItem('selectedView', 'list');
    // renderDiamonds();  // Re-render diamonds in table view
    renderTableView(diamonds);
}

// Event listeners for view switches
// document.getElementById('grid-view-btn').addEventListener('click', switchToGridView);
// document.getElementById('list-view-btn').addEventListener('click', switchToListView);


// Initialize the app
fetchDiamonds();
// fetchAndApplyBackgroundColor();