
window.addEventListener("scroll", function() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});






// search
document.addEventListener("DOMContentLoaded", function () {
  // Get the mobile search input
  const mobileSearchInput = document.getElementById("mobileSearchInputTop");

  // Open the search bar when the search icon is clicked
  document.querySelector(".mobile-search-icon i").addEventListener("click", function () {
    openMobileSearch();
  });

  // Close the search bar when the 'X' icon is clicked
  document.querySelector(".mobile-search-bar .fa-xmark").addEventListener("click", function () {
    closeMobileSearch();
  });

  // Search functionality when pressing "Enter" in the mobile search input
  mobileSearchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();  // Prevent the form from submitting
      const query = mobileSearchInput.value.trim();
      if (query) {
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
      }
    }
  });

  // Function to handle search bar open
  function openMobileSearch() {
    document.getElementById("mobileSearchBar").classList.add("active");
  }

  // Function to handle search bar close
  function closeMobileSearch() {
    document.getElementById("mobileSearchBar").classList.remove("active");
  }
});


// cartcount
document.addEventListener("DOMContentLoaded", function () {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate total quantity
  let totalQuantity = 0;

  cart.forEach(item => {
    totalQuantity += Number(item.quantity) || 1;
  });

  // Update Desktop
  const desktopCount = document.getElementById("cartCount");
  if (desktopCount) {
    desktopCount.innerText = totalQuantity;
  }

  // Update Mobile
  const mobileCount = document.getElementById("mobileCartCount");
  if (mobileCount) {
    mobileCount.innerText = totalQuantity;
  }

});



function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const overlay = document.querySelector(".menu-overlay");

  menu.classList.toggle("active");
  overlay.classList.toggle("active");
}




 document.addEventListener("DOMContentLoaded", () => {
      const logoutBtn = document.getElementById("logoutBtn");

      // Hide button if user is not logged in
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        logoutBtn.style.display = "none";
      }

      // Logout functionality
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        window.location.href = "login.html";
      });
    });



    document.addEventListener("DOMContentLoaded", function () {

  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  const authButtons = document.getElementById("authButtons");
  const profileArea = document.getElementById("profileArea");
  const mobileAuthButtons = document.getElementById("mobileAuthButtons");
  const mobileProfileArea = document.getElementById("mobileProfileArea");

  if (loggedIn === "true" && user) {

    const fullName = user.name || 
                     ((user.firstName || "") + " " + (user.lastName || ""));

    // DESKTOP
    if (authButtons) authButtons.style.display = "none";
    if (profileArea) profileArea.style.display = "block";

    if (document.getElementById("userName"))
      document.getElementById("userName").innerText = fullName;

    if (document.getElementById("userEmail"))
      document.getElementById("userEmail").innerText = user.email || "";

    // MOBILE
    if (mobileAuthButtons) mobileAuthButtons.style.display = "none";
    if (mobileProfileArea) mobileProfileArea.style.display = "block";

    if (document.getElementById("mobileUserName"))
      document.getElementById("mobileUserName").innerText = fullName;

    if (document.getElementById("mobileUserEmail"))
      document.getElementById("mobileUserEmail").innerText = user.email || "";

  } else {

    if (authButtons) authButtons.style.display = "block";
    if (profileArea) profileArea.style.display = "none";

    if (mobileAuthButtons) mobileAuthButtons.style.display = "block";
    if (mobileProfileArea) mobileProfileArea.style.display = "none";
  }

});

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
function logout() {
  // Clear auth data
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("user");
  localStorage.removeItem("zawaUser"); // safety if exists

  // Redirect to HOME
  window.location.href = "index.html";
}


// You can also attach this function to a logout button event:
document.getElementById("logoutBtn").addEventListener("click", logout);


const user = JSON.parse(localStorage.getItem("zawaUser"));

if (user) {
  document.getElementById("authButtons").style.display = "none";
  document.getElementById("profileArea").style.display = "block";
  document.getElementById("userName").innerText = user.name;
  document.getElementById("userEmail").innerText = user.email;
}


function updateNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");

  const loginBtn = document.getElementById("loginBtn");
  const navUser = document.getElementById("navUser");

  if (user && loggedIn === "true") {
    if (loginBtn) loginBtn.style.display = "none";
    if (navUser) navUser.style.display = "flex";
  } else {
    if (loginBtn) loginBtn.style.display = "block";
    if (navUser) navUser.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", updateNavbar);
window.addEventListener("storage", updateNavbar);