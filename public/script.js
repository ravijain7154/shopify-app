// app/public/script.js

// Sample diamond data
const diamonds = [
    { id: 1, title: 'Diamond A', clarity: 'VS1', cut: 'Ideal', carat: 1.0, color: 'G' },
    { id: 2, title: 'Diamond B', clarity: 'SI1', cut: 'Excellent', carat: 1.5, color: 'H' },
    { id: 3, title: 'Diamond C', clarity: 'VVS2', cut: 'Very Good', carat: 2.0, color: 'F' },
    // Add more products as needed
];

// Function to display diamonds
function displayDiamonds(filter = {}) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing list

    const filteredDiamonds = diamonds.filter(diamond => {
        return Object.keys(filter).every(key => {
            return diamond[key] && diamond[key] === filter[key];
        });
    });

    filteredDiamonds.forEach(diamond => {
        const li = document.createElement('li');
        li.textContent = `${diamond.title} - Clarity: ${diamond.clarity}, Cut: ${diamond.cut}, Carat: ${diamond.carat}, Color: ${diamond.color}`;
        productList.appendChild(li);
    });
}

// Event listener for filter changes
document.getElementById('filter').addEventListener('change', (event) => {
    const value = event.target.value;
    const filter = {};

    if (value) {
        filter[value] = prompt(`Enter value for ${value}`); // Prompt user for value
    }

    displayDiamonds(filter);
});

// Initial display
displayDiamonds();
