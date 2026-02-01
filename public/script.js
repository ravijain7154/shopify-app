let currentPage = 1; // Track the current page
let pageSize = 25;   // Default number of diamonds per page
let diamonds = [];    // Store fetched diamonds data
let totalPages = 1;   // Total pages (from the API response)
let totalCount = 0;   // Total product count (from the API response)
let isColorApplied = false;
let SHOPIFY_APP_URL = process.env.SHOPIFY_APP_URL || "";
(function() {
    if (window.location.pathname.includes('/pages/diamond')) {
      const container = document.createElement('div');
      container.id = 'my-shopify-app';
        
       const target = document.querySelector('#MainContent .shopify-section .rte') || document.querySelector('main .shopify-section .rte');

  if (!target) {
    console.warn('Shopify MainContent not found');
    return;
  }

  target.prepend(container);

      fetch(`${SHOPIFY_APP_URL}/diamond-filter/index.html`)
        .then(res => res.text())
        .then(html => {
          container.innerHTML = html;
        //   document.body.prepend(container);
        });
    }
  })();
  
// Fetch and apply background color dynamically
async function fetchAndApplyBackgroundColor() {
    try {
        const response = await fetch(`${SHOPIFY_APP_URL}/api/get-color`);
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

document.getElementById('productsPerPage').addEventListener('change', function() {
    pageSize = parseInt(this.value, 25);  
    currentPage = 1;  
    // updateURL(); 
    fetchDiamonds();
});

// Fetch diamond data from the API (with dynamic pagination)
async function fetchDiamonds() {
    try {
        showLoader(); 

        const queryParams = new URLSearchParams(window.location.search);  // Get query parameters from the URL
        const selectedShapes = queryParams.get('Shape') ? decodeURIComponent(queryParams.get('Shape')).split(',') : [];

        const priceRange = queryParams.get('price');

        let priceMin = '';  // Change to 'let' instead of 'const'
        let priceMax = '';  // Change to 'let' instead of 'const'

        if (priceRange) {
            [priceMin, priceMax] = priceRange.split(';');  // Split the price range
        }

       // Get carat range from the URL
       const caratRange = queryParams.get('carat');
       let caratMin = '';
       let caratMax = '';
       if (caratRange) {
           [caratMin, caratMax] = caratRange.split(';');
       }

       const colorRange = queryParams.get('color');
       let colorMin = '';
       let colorMax = '';
       if (colorRange) {
        [colorMin, colorMax] = colorRange.split(';');
       } else {
        // Support explicit params set by the slider to avoid semicolon parsing issues
        colorMin = queryParams.get('color_min') || '';
        colorMax = queryParams.get('color_max') || '';
       }

       const clarityRange = queryParams.get('clarity');
       let clarityMin = '';
       let clarityMax = '';
       if (clarityRange) {
        [clarityMin, clarityMax] = clarityRange.split(';');
       }

       // Get cut range from the URL (e.g., VG;FR)
       const cutRange = queryParams.get('cut');
       let cutMin = '';
    //    let cutMax = '';
       if (cutRange) {
           [cutMin] = decodeURIComponent(cutRange).split(';');
       }


        const params = new URLSearchParams({
            page: currentPage,
            perPage: pageSize,
            Shape: selectedShapes.join(','),
            price_min: priceMin,
            price_max: priceMax,
            carat_min: caratMin,
            carat_max: caratMax,
            color_min: colorMin,
            color_max: colorMax,
            clarity_min: clarityMin,
            clarity_max: clarityMax,
            cut_min: cutMin,
            // cut_max: cutMax,
        }).toString();

        const response = await fetch(`${SHOPIFY_APP_URL}/api/products?${params}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        diamonds = data.products || [];  // Correctly assign products to diamonds array
        // console.log(diamonds);
        totalPages = data.pagination.totalPages;  // Update totalPages from API
        totalCount = data.pagination.totalCount;  // Update totalCount from API
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
    document.getElementById('loader').style.display = 'flex';
}

// Hide the loader
function hideLoader() {
    document.getElementById('loader').style.display = 'none';
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
  paginationContainer.innerHTML = '';  // Clear previous pagination

  // Create a container for product count info
  const productCountContainer = document.createElement('div');
  productCountContainer.classList.add('product-count');
  productCountContainer.textContent = `Showing ${((currentPage - 1) * pageSize) + 1} - ${Math.min(currentPage * pageSize, totalCount)} of ${totalCount} products`;
  paginationContainer.appendChild(productCountContainer);

  // Create First Page Button (<<)
  const firstPageButton = document.createElement('button');
  firstPageButton.textContent = '<<';
  firstPageButton.disabled = currentPage === 1;
  firstPageButton.addEventListener('click', () => {
      currentPage = 1;
      fetchDiamonds();  // Fetch new data when page changes
  });
  paginationContainer.appendChild(firstPageButton);

  // Create Previous Button
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          fetchDiamonds();  // Fetch new data when page changes
      }
  });
  paginationContainer.appendChild(prevButton);

  // Create range of page buttons (current, next, previous pages)
  const displayRange = 3;  // Show up to 3 page buttons at a time
  const startPage = Math.max(1, currentPage - 1); // Starting page for the range
  const endPage = Math.min(totalPages, currentPage + 0); // Ending page for the range

  // Add current page and neighboring pages
  for (let page = startPage; page <= endPage; page++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = page;
      pageButton.classList.toggle('active', page === currentPage);
      pageButton.addEventListener('click', () => {
          currentPage = page;
          fetchDiamonds();  // Fetch new data when page is clicked
      });
      paginationContainer.appendChild(pageButton);
  }

  // Add ellipses before the start page if necessary
  if (startPage) {
      const dotsButton = document.createElement('button');
      dotsButton.textContent = '...';
      dotsButton.disabled = true;
      paginationContainer.appendChild(dotsButton);
  }

  // Add Last Page Button
  const lastPageButton = document.createElement('button');
  lastPageButton.textContent = totalPages;
  lastPageButton.disabled = currentPage === totalPages;
  lastPageButton.addEventListener('click', () => {
      currentPage = totalPages;
      fetchDiamonds();  // Fetch new data when last page is clicked
  });
  paginationContainer.appendChild(lastPageButton);

  // Add Next Button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
      if (currentPage < totalPages) {
          currentPage++;
          fetchDiamonds();  // Fetch new data when page changes
      }
  });
  paginationContainer.appendChild(nextButton);

  // Add ellipses after the last page if necessary
  // if (endPage < totalPages - 1) {
  //     const dotsButton = document.createElement('button');
  //     dotsButton.textContent = '...';
  //     dotsButton.disabled = true;
  //     paginationContainer.appendChild(dotsButton);
  // }
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
        img.src = diamond.ImageLink || 'default-image.jpg';
        img.alt = `${diamond.Shape} diamond`;
        imageLink.appendChild(img);
        gridImage.appendChild(imageLink);
        gridDiv.appendChild(gridImage);

        const gridContent = document.createElement('div');
        gridContent.classList.add('grid-item__content');
        const gridLink = document.createElement('a');
        gridLink.href = `diamond-detail?product_id=${diamond.Stock_No}`;
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
        image.src = diamond.ImageLink || 'default-image.jpg';
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
        actionLink.href = `diamond-detail?product_id=${diamond.Stock_No}`;
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
    renderDiamonds();  // Re-render diamonds in grid view
}

// Switch to list view
function switchToListView() {
    document.getElementById('table-container').classList.remove('grid-view');
    document.getElementById('table-container').classList.add('list-view');
    document.getElementById('list-view-btn').classList.add('active');
    document.getElementById('grid-view-btn').classList.remove('active');
    localStorage.setItem('selectedView', 'list');
    renderDiamonds();  // Re-render diamonds in table view
}

// Event listeners for view switches
document.getElementById('grid-view-btn').addEventListener('click', switchToGridView);
document.getElementById('list-view-btn').addEventListener('click', switchToListView);


// Initialize the app
fetchDiamonds();
fetchAndApplyBackgroundColor();
