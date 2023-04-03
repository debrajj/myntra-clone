const cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProduct(product) {
  const productContainer = document.getElementById('product-details');

  const productDiv = document.createElement('div');
  productDiv.classList.add('product');

  const productImageContainer = document.createElement('div');
  productImageContainer.classList.add('product-image-container');

  const productImage = document.createElement('img');
  productImage.setAttribute('src', product.Image);
  productImageContainer.appendChild(productImage);

  const productName = document.createElement('h2');
  productName.textContent = product.Name;

  const productPrice = document.createElement('p');
  productPrice.textContent = `Price: ${product.Price} INR`;

  const productCategory = document.createElement('p');
  productCategory.textContent = `Category: ${product.category}`;

  const productId = document.createElement('p');
  productId.textContent = `ID: ${product.id}`;

  const productRating = document.createElement('p');
  productRating.textContent = `Rating: ${product.rating}`;

  const productSize = document.createElement('p');
  productSize.textContent = `Size: ${product.size}`;

  const productDescription = document.createElement('p');
  productDescription.textContent = product.Discripation;

  const quantityAddToCartDiv = document.createElement('div');
  quantityAddToCartDiv.classList.add('quantity-add-to-cart');

  const productQuantityLabel = document.createElement('label');
  productQuantityLabel.textContent = "Quantity: ";

  const productQuantityInput = document.createElement('input');
  productQuantityInput.setAttribute('type', 'number');
  productQuantityInput.setAttribute('min', '1');
  productQuantityInput.setAttribute('max', '10');
  productQuantityInput.setAttribute('value', '1');

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', () => {
    let filtered = cart.filter((ele, i) => {
      if (product._id == ele._id) {
        return true
      } else {
        return false
      }
    });
    if (filtered.length > 0) {
      alert("Product already in cart");
    } else {
      const quantity = parseInt(productQuantityInput.value);
      cart.push({...product, quantity});
      localStorage.setItem('cart', JSON.stringify(cart));
      alert("Product added to cart");
    }
  });

  quantityAddToCartDiv.appendChild(productQuantityLabel);
  quantityAddToCartDiv.appendChild(productQuantityInput);
  quantityAddToCartDiv.appendChild(addToCartButton);

  productDiv.appendChild(productImageContainer);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(productCategory);
  productDiv.appendChild(productId);
  productDiv.appendChild(productRating);
  productDiv.appendChild(productSize);
  productDiv.appendChild(productDescription);
  productDiv.appendChild(quantityAddToCartDiv);

  productContainer.appendChild(productDiv);
}




function displayProducts() {
  fetch("http://localhost:9864/note/show")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      total = data;
      total.forEach((product) => displayProduct(product));
    })
    .catch((err) => {
      console.log(err);
    });
}

displayProducts();

const sizeSelect = document.getElementById('size');

sizeSelect.addEventListener('change', () => {
  const selectedSize = sizeSelect.value;
  const filteredProducts = total.filter((product) => product.size === selectedSize);
  document.getElementById('product-details').innerHTML = '';
  filteredProducts.forEach((product) => displayProduct(product));
});

const sortSelect = document.getElementById('sort1');

sortSelect.addEventListener('change', () => {
  const selectedSort = sortSelect.value;
  let sortedProducts = [];

  if (selectedSort === 'dec') {
    sortedProducts = total.sort((a, b) => b.Price - a.Price);
  } else if (selectedSort === 'asc') {
    sortedProducts = total.sort((a, b) => a.Price - b.Price);
  } else if (selectedSort === 'pop') {
    sortedProducts = total.sort((a, b) => b.rating - a.rating);
  } else {
    sortedProducts = total;
  }

  document.getElementById('product-details').innerHTML = '';
  sortedProducts.forEach((product) => displayProduct(product));
});




const search = document.getElementById("search");
const searchBar = document.getElementById("search_bar");

searchBar.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const searchTerm = searchBar.value.trim().toLowerCase();
    const searchFilter = total.filter(product => {
      const productName = product.Name.trim().toLowerCase();
      return productName.includes(searchTerm);
    });
    // Clear existing products
    document.getElementById('product-details').innerHTML = '';
    searchFilter.forEach(product => {
      displayProduct(product);
    });
  }
});


