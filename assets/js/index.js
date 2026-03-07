/* =========================
   ZAWA STUDIO CART SYSTEM
========================= */

const SHIPPING_COST = 300;
let cart = JSON.parse(localStorage.getItem("zawaCart")) || [];

/* =========================
   HELPERS
========================= */

function formatPrice(amount){
  return "PKR " + amount.toLocaleString();
}

function saveCart(){
  localStorage.setItem("zawaCart", JSON.stringify(cart));
}

function showPopup(title, text){
  const popup = document.getElementById("popup");
  if(!popup) return;

  document.getElementById("popupTitle").innerText = title;
  document.getElementById("popupText").innerText = text;

  popup.style.display = "block";
  setTimeout(()=> popup.style.display="none", 3000);
}

// Robust price parser
function parsePrice(priceText){
  // Remove everything except digits and decimals
  const num = Number(priceText.replace(/[^0-9.]/g, ""));
  return isNaN(num) ? 0 : num;
}

/* =========================
   ADD TO CART (HOME PAGE)
========================= */

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".prod-card").forEach((card, index) => {

    const button = card.querySelector(".cart-btn");
    if(!button) return;

    button.addEventListener("click", () => {

      const name = card.querySelector(".prod-name").innerText;
      const priceText = card.querySelector(".prod-price").innerText;
      const price = parsePrice(priceText);
      const img = card.querySelector("img").src;

      const id = index + 100; // Unique ID for each product

      const existing = cart.find(p => p.id === id);

      if(existing){
        existing.qty++;
      } else {
        cart.push({ id, name, price, img, qty: 1 });
      }

      saveCart();
      updateCart();
      showPopup("Added to Cart", name);

    });

  });

  updateCart();

});

/* =========================
   UPDATE CART UI
========================= */

function updateCart(){

  const cartItems = document.getElementById("cartItems");
  const total = document.getElementById("total");
  const total2 = document.getElementById("total2");
  const summary = document.getElementById("summary");
  const desktopCount = document.getElementById("desktopCount");
  const mobileCount = document.getElementById("mobileCount");

  if(!cartItems) return;

  cartItems.innerHTML = "";
  if(summary) summary.innerHTML = "";

  if(cart.length === 0){
    cartItems.innerHTML = "<p style='text-align:center;margin-top:20px;'>Your cart is empty</p>";

    if(total) total.innerText = formatPrice(0);
    if(total2) total2.innerText = formatPrice(0);
    if(desktopCount) desktopCount.innerText = 0;
    if(mobileCount) mobileCount.innerText = 0;
    return;
  }

  let subtotal = 0;

  cart.forEach(item => {

    subtotal += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}" style="width:60px;height:60px;object-fit:cover;">
        <div class="cart-item-details">
          <p>${item.name}</p>
          <div class="cart-qty">
            <button onclick="changeQty(${item.id}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <strong>${formatPrice(item.price * item.qty)}</strong>
        <button class="remove-btn" onclick="removeItem(${item.id})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    if(summary){
      summary.innerHTML += `
        <div class="checkout-item">
          <img src="${item.img}" style="width:60px;height:60px;object-fit:cover;border-radius:6px;">
          <div style="flex:1;margin-left:10px;">
            <p style="margin:0;">${item.name}</p>
            <small>Qty: ${item.qty}</small>
          </div>
          <strong>${formatPrice(item.price * item.qty)}</strong>
        </div>
      `;
    }

  });

  /* SHIPPING ROW IN CART SIDEBAR */
  cartItems.innerHTML += `
    <div class="cart-item shipping-row" style="display:flex;justify-content:space-between;padding:15px 0;border-top:1px solid rgba(255,255,255,0.2);font-weight:500;">
      <span>Shipping</span>
      <strong>${formatPrice(SHIPPING_COST)}</strong>
    </div>
  `;

  /* SHIPPING ROW IN CHECKOUT SUMMARY */
  if(summary){
    summary.innerHTML += `
      <div class="checkout-item">
        <span>Shipping</span>
        <strong>${formatPrice(SHIPPING_COST)}</strong>
      </div>
    `;
  }

  const finalTotal = subtotal + SHIPPING_COST;

  if(total) total.innerText = formatPrice(finalTotal);
  if(total2) total2.innerText = formatPrice(finalTotal);

  const totalQty = cart.reduce((sum,i)=>sum+i.qty,0);

  if(desktopCount) desktopCount.innerText = totalQty;
  if(mobileCount) mobileCount.innerText = totalQty;
}

/* =========================
   CART CONTROLS
========================= */

function toggleCart(){
  const cartBox = document.getElementById("cart");
  if(!cartBox) return;
  cartBox.classList.toggle("open");
}

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

/* =========================
   CHECKOUT
========================= */

function goCheckout(){

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  const checkout = document.getElementById("checkout");

  if(checkout){

    // Show checkout first
    checkout.style.display = "block";

    // Wait for layout to update, then scroll
    setTimeout(() => {
      checkout.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);

  }

  toggleCart();
}

/* =========================
   PAYMENT
========================= */

function showPaymentInfo(){
  const method = document.getElementById("paymentMethod").value;
  const bankDetails = document.getElementById("bankDetails");

  if(bankDetails){
    bankDetails.style.display = method === "bank" ? "block" : "none";
  }
}

/* =========================
   PLACE ORDER
========================= */

function placeOrder(){

  const inputs = document.querySelectorAll(".form-card input");

  const name = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const phone = inputs[2].value.trim();
  const address = inputs[3].value.trim();

  if(!name || !email || !phone || !address){
    alert("Please fill all fields!");
    return;
  }

  showPopup("Order Placed ✅", "Thank you for shopping with ZAWA STUDIO!");

  cart = [];
  saveCart();
  updateCart();

  const checkout = document.getElementById("checkout");
  if(checkout) checkout.style.display = "none";
}