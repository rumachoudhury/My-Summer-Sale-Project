

document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.getElementById("total-price");
    const discountElement = document.getElementById("discount");
    const finalTotalElement = document.getElementById("final-total");
    const itemListElement = document.getElementById("item-list");
    const purchaseButton = document.getElementById("purchase-btn");
    const couponButton = document.getElementById("coupon-btn");
    const couponInput = document.getElementById("coupon-input");
    const cartItems = [];

    function updateTotalPrice() {
        let total = cartItems.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = `Total price: ${total.toFixed(2)} TK`;
        discountElement.textContent = `Discount: 0.00 TK`;
        finalTotalElement.textContent = `Total: ${total.toFixed(2)} TK`;
        itemListElement.innerHTML = cartItems.map(item => `<li>${item.name} - ${item.price.toFixed(2)} TK</li>`).join('');
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            cartItems.push({ name: itemName, price: itemPrice });
            updateTotalPrice();
            purchaseButton.disabled = cartItems.length === 0;
        });
    });

    couponButton.addEventListener("click", function () {
        const couponCode = couponInput.value.trim();
        couponInput.value = '';

        if (couponCode === "SELL200") {
            const total = cartItems.reduce((sum, item) => sum + item.price, 0);
            const discount = total * 0.2; // 20% discount
            const finalTotal = total - discount;
            discountElement.textContent = `Discount: ${discount.toFixed(2)} TK`;
            finalTotalElement.textContent = `Total: ${finalTotal.toFixed(2)} TK`;
        } else {
            alert("Invalid coupon code");
        }
    });

    purchaseButton.addEventListener("click", function () {
        const purchaseModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        purchaseModal.show();
    });

    $('#exampleModal').on('hidden.bs.modal', function () {
        cartItems.length = 0; // Clear the cart
        updateTotalPrice(); // Reset the total price display
        purchaseButton.disabled = true; // Disable purchase button
    });
});
