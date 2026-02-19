
document.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  if(window.scrollY > 50){
    nav.style.background = "rgba(0,0,0,0.8)";
  } else {
    nav.style.background = "rgba(0,0,0,0.4)";
  }
});


window.addEventListener("scroll", function(){
  const nav = document.querySelector(".navbar");
  if(window.scrollY > 50){
    nav.style.background = "rgba(20,0,30,0.9)";
  } else {
    nav.style.background = "rgba(20,0,30,0.6)";
  }
});
const features = document.querySelectorAll('.feature');

function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.85; // when 85% of viewport height

  features.forEach(feature => {
    const featureTop = feature.getBoundingClientRect().top;

    if (featureTop < triggerBottom) {
      feature.classList.add('animate');
    } else {
      feature.classList.remove('animate'); // remove to re-trigger when scrolling back
    }
  });
}

// Run on scroll and on load
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);


// ===== ACCOUNT ICON LOGIC =====

document.addEventListener("DOMContentLoaded", function () {

  const userIcon = document.getElementById("userIcon");
  if (!userIcon) return;

  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  if (loggedIn) {

    // Prevent default link
    userIcon.href = "#";

    // Create account box
    const box = document.createElement("div");
    box.classList.add("account-box");
    box.innerHTML = `
       <div style="text-align:center; margin-bottom:10px;">
    <img src="${user?.profilePic || 'https://via.placeholder.com/60'}"
         style="width:60px;height:60px;border-radius:50%;object-fit:cover;">
    <p style="margin:5px 0;">${user?.name || "My Account"}</p>
  </div>
  <a href="wishlist.html">Wishlist</a>
  <a href="cart.html">Cart</a>
  <a href="#" id="logoutBtn">Logout</a>
    `;

    userIcon.parentElement.style.position = "relative";
    userIcon.parentElement.appendChild(box);

    // Toggle dropdown
    userIcon.addEventListener("click", function (e) {
      e.preventDefault();
      box.style.display = box.style.display === "block" ? "none" : "block";
    });

    // Logout
    box.querySelector("#logoutBtn").addEventListener("click", function () {
      localStorage.setItem("loggedIn", "false");
      window.location.reload();
    });

  }

});
// Generate Gravatar URL from email


const searchInput = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box i");

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if(query) {
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  }
});

searchInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value.trim();
    if(query) {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }
  }
});


// ===== LIVE SEARCH PRODUCTS =====

const allProducts = [
  {
    name: "Purple Gajray",
    price: 2500,
    image: "assets/img/crochet purple gajray.jpeg"
  },
  {
    name: "Crochet Bouquet",
    price: 3200,
    image: "assets/img/bouquet1.jpeg"
  },
  {
    name: "Pink Handbag",
    price: 4500,
    image: "assets/img/handbag.jpeg"
  },
  {
    name: "Floral Headband",
    price: 1500,
    image: "assets/img/headband.jpeg"
  }
];

const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("searchSuggestions");
const searchBtn = document.getElementById("searchBtn");

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const query = this.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (!query) {
      suggestionsBox.style.display = "none";
      return;
    }

    const filtered = allProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      suggestionsBox.innerHTML = `<div class="search-item">No results found</div>`;
    } else {
      filtered.forEach(product => {
        suggestionsBox.innerHTML += `
          <div class="search-item" onclick="goToSearch('${product.name}')">
            <img src="${product.image}">
            <div>
              <div>${product.name}</div>
              <small>Rs ${product.price}</small>
            </div>
          </div>
        `;
      });
    }

    suggestionsBox.style.display = "block";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-box")) {
      suggestionsBox.style.display = "none";
    }
  });
}

// Redirect to search page
function goToSearch(name) {
  window.location.href = `search.html?q=${encodeURIComponent(name)}`;
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

updateCartBadge();

function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) {
    badge.innerText = cart.length;
  }
}

function addToCart(name, price) {
  if (localStorage.getItem("loggedIn") !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  const product = allProducts.find(p => p.name === name);

  if (!product) {
    alert("Product not found!");
    return;
  }

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert("Added to Cart!");
}


function addToWishlist(name) {
  if (localStorage.getItem("loggedIn") !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
    return;
  }

  wishlist.push(name);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  alert("Added to Wishlist!");
}

// ================= LOGIN PAGE SUPPORT =================

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      alert("Login Successful!");
      window.location.href = "index.html";
    } else {
      alert("Invalid Email or Password");
    }
  });
}

// ===== LOGIN SYSTEM =====
function isLoggedIn() {
  return localStorage.getItem("user") !== null;
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function logoutUser() {
  localStorage.removeItem("user");
  alert("Logged out");
  location.reload();
}



let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToCart(id,name,price,image){
  if(!isLoggedIn()){
    alert("Please login first");
    return;
  }

  let qty = document.getElementById("qty-"+id).value;
  let item = cart.find(p => p.id === id);

  if(item){
    item.qty += parseInt(qty);
  } else {
    cart.push({id,name,price,image,qty:parseInt(qty)});
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to Cart");
}

function addToWishlist(id,name,price,image){
  if(!isLoggedIn()){
    alert("Please login first");
    return;
  }

  if(!wishlist.find(p => p.id === id)){
    wishlist.push({id,name,price,image});
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist");
  }
}



function placeOrder() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  let orderItems = cart.map(item =>
    `${item.name} (Qty: ${item.qty}) - Rs ${item.price * item.qty}`
  ).join("\n");

  let params = {
    customer_name: document.getElementById("name").value,
    customer_email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
    payment_method: document.getElementById("payment").value,
    order_items: orderItems,
    total_amount: "Rs " + total
  };

  emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
    params
  ).then(function () {

    alert("Order placed successfully! Email sent.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";

  }, function (error) {
    console.error(error);
    alert("Order failed. Email not sent.");
  });
}


// search-section

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearBtn");


  clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    searchInput.focus();
  });


  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = searchInput.value.trim();

    if (query === "") {
      alert("Please enter a search term.");
      return;
    }


    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  });
});

function toggleProfile(){
  const box = document.getElementById("profileBox");
  box.style.display = box.style.display === "block" ? "none" : "block";

  const user = JSON.parse(localStorage.getItem("user"));

  if(user){
    document.getElementById("profileName").innerText = user.firstName + " " + user.lastName;
    document.getElementById("profileEmail").innerText = user.email;
  }
}

function logout(){
  localStorage.setItem("loggedIn","false");
  alert("Logged Out!");
  window.location.href = "login.html";
}

