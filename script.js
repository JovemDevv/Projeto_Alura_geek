const productsContainer = document.getElementById('products-container');
const productForm = document.getElementById('product-form');

// Recuperar produtos do localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Função para renderizar produtos
function renderProducts() {
  productsContainer.innerHTML = '';
  products.forEach((product, index) => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>R$ ${product.price.toFixed(2)}</p>
      <button onclick="deleteProduct(${index})">🗑️</button>
    `;
    productsContainer.appendChild(productCard);
  });
}

// Função para adicionar um produto
function addProduct(e) {
  e.preventDefault();
  const name = document.getElementById('product-name').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const imageInput = document.getElementById('product-image');

  // Usar FileReader para converter a imagem em uma URL
  const reader = new FileReader();
  reader.onload = function () {
    const image = reader.result;

    products.push({ name, price, image });
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
    productForm.reset();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    alert("Por favor, selecione uma imagem.");
  }
}

// Função para deletar um produto
function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

// Inicialização
productForm.addEventListener('submit', addProduct);
renderProducts();
