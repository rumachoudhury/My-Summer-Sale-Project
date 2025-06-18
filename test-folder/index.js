

document.addEventListener("DOMContentLoaded", function () {
   
    const totalPriceElement = document.getElementById("total-price");
    const discountElement = document.getElementById("discount");
    const finalTotalElement = document.getElementById("final-total");
    const itemListElement = document.getElementById("item-list");
    const purchaseButton = document.getElementById("purchase-btn");
    const couponButton = document.getElementById("coupon-btn");
    const couponInput = document.getElementById("coupon-input");

    const cartItems = [];

    // Function to enable or disable the purchase button
    function updatePurchaseButtonState() {
        purchaseButton.disabled = cartItems.length === 0;
    }

    // Add event listeners to add to cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-name");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            cartItems.push({ name: itemName, price: itemPrice });

            // Update the cart count
            document.getElementById("cart-count").textContent = cartItems.length;

            // Update total price
            updateTotalPrice();
            updatePurchaseButtonState();
        });
    });

    function updateTotalPrice() {
        let total = 0;
        itemListElement.innerHTML = ""; // Clear previous list
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

    // Handle coupon 
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

    // Purchase button functionality
    purchaseButton.addEventListener("click", function () {
        if (cartItems.length > 0) {
            // Show the Bootstrap modal
            const purchaseModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            purchaseModal.show();
            
            // Clear the cart after purchase
            cartItems.length = 0;
            document.getElementById("cart-count").textContent = cartItems.length;
            updateTotalPrice();
            updatePurchaseButtonState();
        }
    });

    // // Modal dialog button functionality
    // document.querySelector(".btn-secondary[data-bs-dismiss='modal']").addEventListener("click", function () {
    //     const purchaseModal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    //     purchaseModal.hide(); // Close the modal
    // });

    $('#exampleModal').modal({
        backdrop: 'static', // Prevents closing the modal when clicking outside
        keyboard: false // Prevents closing the modal with the Esc key
    });
});
