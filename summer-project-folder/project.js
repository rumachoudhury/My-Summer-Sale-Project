
document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.getElementById("total-price");
    const discountElement = document.getElementById("discount");
    const finalTotalElement = document.getElementById("final-total");
    const itemListElement = document.getElementById("item-list");
    const purchaseButton = document.getElementById("purchase-btn");
    const couponButton = document.getElementById("coupon-btn");
    const couponInput = document.getElementById("coupon-input");

    const cartItems = [];

    // itemListElement.style.listStyleType = 'none'; 

    function updatePurchaseButtonState() {
        purchaseButton.disabled = cartItems.length === 0;
    }

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            cartItems.push({ name: itemName, price: itemPrice });

            document.getElementById("cart-count").textContent = cartItems.length;
            updateTotalPrice();
            updatePurchaseButtonState();
        });
    });

    function updateTotalPrice() {
        let total = 0;
        itemListElement.innerHTML = ""; // Clear existing items
        cartItems.forEach(item => {
            total += item.price;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ${item.price.toFixed(2)} TK`;
            itemListElement.appendChild(listItem);
        });
        totalPriceElement.textContent = `Total price: ${total.toFixed(2)} TK`;
        discountElement.textContent = `Discount: 0.00 TK`;
        finalTotalElement.textContent = `Total: ${total.toFixed(2)} TK`;
    }

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
        if (cartItems.length > 0) {
            const purchaseModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            purchaseModal.show();
        }
    });

    // Reset cart and update UI when the modal is closed
    const purchaseModalElement = document.getElementById('exampleModal');

    $(purchaseModalElement).on('hidden.bs.modal', function () {
        console.log("Modal closed. Clearing cart...");
        cartItems.length = 0; // Clear the cart
        document.getElementById("cart-count").textContent = cartItems.length; // Update cart count
        updateTotalPrice(); // Reset the total price display
        updatePurchaseButtonState(); // Update button state
        console.log("Cart cleared. Cart count:", cartItems.length);
    });

    // Ensure no backdrop remains
    $(purchaseModalElement).on('hidden.bs.modal', function () {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    });

    // Disable the backdrop
    $(purchaseModalElement).modal({
        backdrop: 'static',
        keyboard: false
    });

    
});
