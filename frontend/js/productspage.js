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

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = 'Add to Cart';
  addToCartButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('addedcart')) || [];
    cart.push(product);
    localStorage.setItem('addedcart', JSON.stringify(cart));
    console.log(`${product.Name} added to cart.`);
  });
  productDiv.appendChild(productImageContainer);
  productDiv.appendChild(productName);
  productDiv.appendChild(productPrice);
  productDiv.appendChild(productCategory);
  productDiv.appendChild(productId);
  productDiv.appendChild(productRating);
  productDiv.appendChild(productSize);
  productDiv.appendChild(productDescription);
  productDiv.appendChild(addToCartButton);
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


const brandCheckboxes = document.querySelectorAll('#brand input[type="checkbox"]');
const priceCheckboxes = document.querySelectorAll('#price4 input[type="checkbox"]');

brandCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const checkedBrandCheckboxes = Array.from(brandCheckboxes).filter((checkbox) => checkbox.checked);
    const selectedBrands = checkedBrandCheckboxes.map((checkbox) => checkbox.value);
    const filteredProducts = total.filter((product) => selectedBrands.includes(product.brand));
    document.getElementById('product-details').innerHTML = '';
    filteredProducts.forEach((product) => displayProduct(product));
  });
});

priceCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const checkedPriceCheckboxes = Array.from(priceCheckboxes).filter((checkbox) => checkbox.checked);
    const selectedPriceRanges = checkedPriceCheckboxes.map((checkbox) => checkbox.value);
    const filteredProducts = total.filter((product) => selectedPriceRanges.includes(product.price));
    document.getElementById('product-details').innerHTML = '';
    filteredProducts.forEach((product) => displayProduct(product));
  });
});

