function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById("cartCount");
    if (badge) badge.textContent = totalQty;
}

updateCartCount();
