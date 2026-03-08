// ================= NAVBAR SCROLL EFFECT =================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  }
});


// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", function () {

  // ================= MOBILE SEARCH =================
  const mobileSearchInput = document.getElementById("mobileSearchInputTop");
  const searchIcon = document.querySelector(".mobile-search-icon i");
  const closeIcon = document.querySelector(".mobile-search-bar .fa-xmark");
  const mobileSearchBar = document.getElementById("mobileSearchBar");

  if (searchIcon && mobileSearchBar) {
    searchIcon.addEventListener("click", function () {
      mobileSearchBar.classList.add("active");
    });
  }

  if (closeIcon && mobileSearchBar) {
    closeIcon.addEventListener("click", function () {
      mobileSearchBar.classList.remove("active");
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = mobileSearchInput.value.trim();
        if (query) {
          window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  }


  // ================= CART COUNT =================
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += Number(item.quantity) || 1;
  });

  const desktopCount = document.getElementById("cartCount");
  const mobileCount = document.getElementById("mobileCartCount");

  if (desktopCount) desktopCount.innerText = totalQuantity;
  if (mobileCount) mobileCount.innerText = totalQuantity;


  // ================= AUTH / PROFILE UI =================
  updateAuthUI();

});


// ================= UPDATE AUTH UI FUNCTION =================
function updateAuthUI() {

  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");

  const authButtons = document.getElementById("authButtons");
  const profileArea = document.getElementById("profileArea");
  const mobileAuthButtons = document.getElementById("mobileAuthButtons");
  const mobileProfileArea = document.getElementById("mobileProfileArea");

  if (user && loggedIn === "true") {

    const fullName =
      user.name ||
      ((user.firstName || "") + " " + (user.lastName || "")).trim();

    // Desktop
    if (authButtons) authButtons.style.display = "none";
    if (profileArea) profileArea.style.display = "block";

    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");

    if (userName) userName.innerText = fullName;
    if (userEmail) userEmail.innerText = user.email || "";

    // Mobile
    if (mobileAuthButtons) mobileAuthButtons.style.display = "none";
    if (mobileProfileArea) mobileProfileArea.style.display = "block";

    const mobileUserName = document.getElementById("mobileUserName");
    const mobileUserEmail = document.getElementById("mobileUserEmail");

    if (mobileUserName) mobileUserName.innerText = fullName;
    if (mobileUserEmail) mobileUserEmail.innerText = user.email || "";

  } else {

    if (authButtons) authButtons.style.display = "block";
    if (profileArea) profileArea.style.display = "none";

    if (mobileAuthButtons) mobileAuthButtons.style.display = "block";
    if (mobileProfileArea) mobileProfileArea.style.display = "none";
  }
}


// ================= GLOBAL LOGOUT FUNCTION =================
// This works with: <button onclick="logout()">Logout</button>
function logout() {
  localStorage.removeItem("loggedIn"); // only remove session
  updateAuthUI(); // instantly update navbar
  window.location.href = "index.html";
}


// ================= MOBILE MENU =================
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.querySelector(".menu-overlay");

  if (menu) menu.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}


// ================= PROFILE DROPDOWN =================
function toggleProfile() {
  const dropdown = document.getElementById("profileDropdown");
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }
}

function toggleMobileProfile() {
  const dropdown = document.getElementById("mobileProfileDropdown");
  if (dropdown) {
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }
}

