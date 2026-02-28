
/* =========================
   PRODUCTS + CART SETUP
========================= */
const SHIPPING_COST = 300;

const products = [
  {id:1, name: "CROCHET PURPLE ROSE BOUQUET", price: 1500, category: "bouquet", img: "assets/img/bouquet1.jpeg", link:"purplerosebouquet.html"},
  {id:2, name: "CROCHET SUNFLOWER BOUQUET", price: 1500, category: "bouquet", img: "assets/img/bouquet2.jpeg", link:"sunflowerbouquet.html"},
  {id:3, name: "CROCHET TULIPS", price: 600, category: "bouquet", img: "assets/img/tullip.jpeg", link:"CROCHETTULIPS.html"},
  {id:4, name: "CROCHET FLOWER GAJRAY", price: 500, category: "gajray", img: "assets/img/crochet gajry1.jpeg", link:"Flowergajray.html"},
  {id:5, name: "CROCHET RED ROSE GAJRAY", price: 600, category: "gajray", img: "assets/img/crochet gajray2.jpeg", link:"redrosegajray.html"},
  {id:6, name: "CROCHET PURPLE ROSE GAJRAY", price: 600, category: "gajray", img: "assets/img/crochet purple gajray.jpeg", link:"purplerosegajray.html"},
  {id:7, name: "CROCHET HANDBAG", price: 2000, category: "handbag", img: "assets/img/handbag.jpeg", link:"Crochet handbag.html"},
  {id:8, name: "CROCHET RUFFLE HANDBAG", price: 2200, category: "handbag", img: "assets/img/handbag2.jpeg", link:"CROCHETRUFFLEHANDBAG.html"},
  {id:9, name: "CROCHET WALLET", price: 1200, category: "wallet", img: "assets/img/wallet1.jpeg", link:"CROCHETWALLET.html"},
  {id:10, name: "CROCHET WALLET WITH PEARLS", price: 1200, category: "wallet", img: "assets/img/wallet2.jpeg", link:"CROCHETWALLETWITHPEARLS.html"},
  {id:11, name: "CROCHET HEADBAND WITH RED BOW", price: 350, category: "headband", img: "assets/img/headband1.jpeg", link:"Crochetheadband1.html"},
  {id:12, name: "CROCHET HEADBAND WITH PINK BOW", price: 350, category: "headband", img: "assets/img/headband2.jpeg", link:"Crochetheadband2.html"},
  {id:13, name: "CROCHET HEADBAND WITH WHITE BOW", price: 350, category: "headband", img: "assets/img/headband3.jpeg", link:"Crochetheadband3.html"}
];

let cart = JSON.parse(localStorage.getItem("zawaCart")) || [];

const productsContainer = document.getElementById('products');
const productCount = document.getElementById('productCount');

/* =========================
   HELPER FUNCTIONS
========================= */
function formatPrice(amount){
  return "PKR " + amount.toLocaleString();
}

function saveCart(){
  localStorage.setItem("zawaCart", JSON.stringify(cart));
}

function showPopup(title, text){
  const popup = document.getElementById("popup");
  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popupText").innerText = text;
  popup.style.display = "block";
  setTimeout(()=>{ popup.style.display = "none"; }, 3000);
}

/* =========================
   DISPLAY PRODUCTS
========================= */
/* =========================
   DISPLAY PRODUCTS
========================= */
function renderProducts(items){
  productsContainer.innerHTML = "";
  items.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="${p.link}" class="product-link" style="text-decoration:none; margin-bottom:8px;background:#6b3b82;color:white;">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${formatPrice(p.price)}</p>
      </a>
      <a href="${p.link}" class="add-to-cart-btn view-btn">
  View Product
</a>
    `;
    productsContainer.appendChild(card);
  });

  if(productCount) productCount.textContent = items.length;
}
/* =========================
   FILTER + SORT
========================= */
let currentCategory = "all";

function applyFilters(){
  let filtered = currentCategory === "all" ? [...products] : products.filter(p=>p.category===currentCategory);
  const sortValue = document.getElementById("priceSort")?.value;
  if(sortValue==="low") filtered.sort((a,b)=>a.price-b.price);
  if(sortValue==="high") filtered.sort((a,b)=>b.price-a.price);
  renderProducts(filtered);
}

function filterCategory(category, btn){
  currentCategory = category;
  document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active"));
  if(btn) btn.classList.add("active");
  applyFilters();
}

function sortProducts(){
  applyFilters();
}

/* =========================
   CART FUNCTIONS
========================= */
function addToCart(id){
  const product = products.find(p=>p.id===id);
  if(!product) return;

  const item = cart.find(p=>p.id===id);
  if(item) item.qty++;
  else cart.push({...product, qty:1});

  saveCart();
  updateCart();

  const currentQty = cart.find(p=>p.id===id).qty;
  showPopup("Added to Cart", `${product.name} x${currentQty}`);
}

function updateCart(){
  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  const total2 = document.getElementById("total2");
  const summary = document.getElementById("summary");
  const countDesktop = document.getElementById("desktopCount");
  const countMobile = document.getElementById("mobileCount");
  const cartTotalSection = document.querySelector(".cart-total");

  if(!cartItems) return;

  cartItems.innerHTML = "";
  if(summary) summary.innerHTML = "";

  if(cart.length===0){
    cartItems.innerHTML = `<p style="text-align:center;color:var(--muted);margin-top:20px;">Your cart is empty</p>`;
    if(cartTotalSection) cartTotalSection.style.display="none";
    if(countDesktop) countDesktop.innerText = 0;
    if(countMobile) countMobile.innerText = 0;
    return;
  } else if(cartTotalSection){
    cartTotalSection.style.display="block";
  }

  let subtotal = 0;

cart.forEach(p=>{
  subtotal += p.price*p.qty;
  cartItems.innerHTML += `
    <div class="cart-item">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-details">
        <p>${p.name}</p>
        <div class="cart-qty">
          <button onclick="changeQty(${p.id}, -1)">-</button>
          <span>${p.qty}</span>
          <button onclick="changeQty(${p.id}, 1)">+</button>
        </div>
      </div>
      <strong>${formatPrice(p.price*p.qty)}</strong>
      <button class="remove-btn" onclick="removeItem(${p.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
});

  // Shipping row
  cartItems.innerHTML += `
    <div class="cart-item">
      <span>Shipping</span>
      <strong>${formatPrice(SHIPPING_COST)}</strong>
    </div>
  `;
  if(summary) summary.innerHTML += `<p>Shipping - ${formatPrice(SHIPPING_COST)}</p>`;

  let finalTotal = subtotal + SHIPPING_COST;
  if(total) total.innerText = formatPrice(finalTotal);
  if(total2) total2.innerText = formatPrice(finalTotal);

  const totalQty = cart.reduce((acc,p)=>acc+p.qty,0);
  if(countDesktop) countDesktop.innerText = totalQty;
  if(countMobile) countMobile.innerText = totalQty;
}
function toggleCart(){
  document.getElementById("cart").classList.toggle("open");
}

function goCheckout(){
  if(cart.length===0) return alert("Cart empty");
  document.getElementById("shop").style.display="none";
  document.getElementById("checkout").style.display="block";
  toggleCart();
}

function changeQty(id, delta){
  const item = cart.find(p=>p.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<1) item.qty=1;
  saveCart();
  updateCart();
}

function removeItem(id){
  cart = cart.filter(p=>p.id!==id);
  saveCart();
  updateCart();
}

function showPaymentInfo(){
  const method = document.getElementById("paymentMethod").value;
  document.getElementById("bankDetails").style.display = method==="bank" ? "block" : "none";
}

/* =========================
   CHECKOUT / EMAILJS
========================= */
function placeOrder(){
  const inputs = document.querySelectorAll(".form-card input");
  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const phone = inputs[2].value.trim();
  const address = inputs[3].value.trim();
  const payment = document.getElementById("paymentMethod").value;

  if(!name || !email || !phone || !address){
    alert("Please fill all fields!");
    return;
  }

let orderHTML = "";

// Add products
cart.forEach(item => {
  orderHTML += `
    <tr>
      <td style="padding:8px;">${item.name}</td>
      <td style="padding:8px;text-align:center;">${item.qty}</td>
      <td style="padding:8px;text-align:right;">${formatPrice(item.price)}</td>
      <td style="padding:8px;text-align:right;">${formatPrice(item.price*item.qty)}</td>
    </tr>
  `;
});

// Add shipping row
orderHTML += `
  <tr>
    <td style="padding:8px;" colspan="3"><strong>Shipping</strong></td>
    <td style="padding:8px;text-align:right;"><strong>${formatPrice(SHIPPING_COST)}</strong></td>
  </tr>
`;

// Calculate total including shipping
const totalAmount = cart.reduce((sum,i)=>sum + i.price*i.qty, 0) + SHIPPING_COST;

emailjs.send(
  "service_qc9ieu9",
  "template_jh9y4xd",
  {
    name: name,                       // Customer Full Name
    email: email,                     // Customer Email
    phone: phone,                     // Customer Phone
    address: address,                 // Customer Address
    payment: document.getElementById("paymentMethod").value, // Payment Method
    order: orderHTML,                 // HTML rows including shipping
    total: formatPrice(totalAmount),  // Total including shipping
    admin_email: "zarajawed15@gmail.com"
  }
)
.then(()=>{
  showPopup("Order Sent ✅", "Order details sent to admin!");
  cart = [];
  saveCart();
  updateCart();
  document.getElementById("checkout").style.display="none";
  document.getElementById("shop").style.display="block";
})
.catch(()=>{
  alert("Email failed. Try again.");
});}

/* =========================
   INITIAL LOAD
========================= */
document.addEventListener("DOMContentLoaded",()=>{
  updateCart();
  applyFilters();
});

/* =========================
   CART ITEM FUNCTIONS
========================= */
function changeQty(id, delta){
  const item = cart.find(p => p.id === id);
  if(!item) return;

  item.qty += delta;
  if(item.qty < 1) item.qty = 1;
  saveCart();
  updateCart();
}

function removeItem(id){
  cart = cart.filter(p => p.id !== id);
  saveCart();
  updateCart();
}

// payment-section
function showPaymentInfo(){
  const method =
    document.getElementById("paymentMethod").value;

  document.getElementById("bankDetails").style.display =
    method === "bank" ? "block" : "none";
}

(function(){
emailjs.init("ydfCcmdSiJYKZXoRM");
})();




const productsPerPage = 6; // how many products per page
let currentPage = 1;

function displayProducts(page = 1) {
  const productsContainer = document.getElementById('products');
  const paginationContainer = document.getElementById('pagination');
  productsContainer.innerHTML = '';

  currentPage = page;

  // Calculate start and end index
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);

  // Render products for current page
paginatedProducts.forEach(p => {
  const card = document.createElement('div');
  card.className = 'product-card';

  card.innerHTML = `
    <div class="product-img">
      <img src="${p.img}" alt="${p.name}">
    </div>

    <div class="product-info">
      <p class="category">${p.category.toUpperCase()}</p>

      <a href="${p.link}" class="nameofproduct">
        <h5 class="name">${p.name}</h5>
      </a>

      <p class="price">Rs.${p.price}</p>

      <a href="${p.link}" class="add-to-cart-btn view-btn">
        View Product
      </a>
    </div>
  `;

  productsContainer.appendChild(card);
});

  // Render pagination buttons dynamically
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(products.length / productsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    if (i === page) btn.classList.add('active');
    btn.addEventListener('click', () => displayProducts(i));
    paginationContainer.appendChild(btn);
  }

  // Update product count
  document.getElementById('productCount').innerText = products.length;
}

// Initial render
displayProducts();



