const products = [
  {
    id:1,
    name:"Mobile Charger",
    price:1000,
    category:"Electronics",
    image:"https://i.ibb.co/tT32Gbzq/mobile-charger.jpg",
    description:"Fast charging mobile charger"
  },
  {
    id:2,
    name:"Hot Wheels Cars",
    price:800,
    category:"Toys",
    image:"https://i.ibb.co/FkxDNVtQ/hotwheels.jpg",
    description:"Premium Hot Wheels toy cars"
  },
  {
    id:3,
    name:"Notebook",
    price:200,
    category:"Stationery",
    image:"https://i.ibb.co/LyvQq1N/notebook.jpg",
    description:"High quality notebook"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productsContainer = document.getElementById("products");
const filtersContainer = document.getElementById("filters");

/* DISPLAY PRODUCTS */
function displayProducts(filter="All"){
  productsContainer.innerHTML = "";

  const filtered = filter === "All"
    ? products
    : products.filter(p => p.category === filter);

  filtered.forEach(product => {
    productsContainer.innerHTML += `
      <div class="card">
        <img src="${product.image}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart(${product.id})">Add</button>
      </div>
    `;
  });
}

/* ADD TO CART */
function addToCart(id){
  const item = cart.find(i => i.id === id);

  if(item){
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({...product, quantity:1});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

/* UPDATE CART */
function updateCart(){
  document.getElementById("cartCount").innerText =
    cart.reduce((sum,i)=>sum+i.quantity,0);
}

/* MODAL */
document.getElementById("cartBtn").onclick = () => {
  document.getElementById("modal").classList.add("active");
};

document.getElementById("closeModal").onclick = () => {
  document.getElementById("modal").classList.remove("active");
};

/* INIT */
displayProducts();
updateCart();
