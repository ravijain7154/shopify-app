document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:4000/api/products')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length) {
          const container = document.createElement('div');
          container.className = 'custom-products-container';
          document.body.appendChild(container);
          
          data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
              <img src="${product.image}" alt="${product.title}" />
              <h2>${product.title}</h2>
              <p>Price: $${product.price}</p>
              <p>${product.description}</p>
              <p>Category: ${product.category}</p>
            `;
            container.appendChild(productCard);
          });
        }
      })
      .catch(error => console.error('Error fetching products:', error));
  });
  