

document.addEventListener('DOMContentLoaded', function () {
    const couponBtn = document.getElementById('coupon-btn');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('final-total');
    const totalPriceElement = document.getElementById('total-price'); 
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let originalPrice = 0; // Total price of items in the cart
    let discount = 0; // Current discount
    let cart = []; // Array to store cart items

    
    
    // add an item to the cart
    function addItemToCart(itemName, itemPrice) {
        cart.push({ name: itemName, price: itemPrice }); // Add item to cart
        originalPrice += itemPrice; // Update total price
        updateTotalPrice(); // Update displayed prices
        updateCartCount(); // Update the cart count
    }

    
    
    // update total price and discount
    function updateTotalPrice() {
        const finalTotal = originalPrice - discount;
        totalPriceElement.innerText = `Total price: ${originalPrice.toFixed(2)} TK`; // Show total price
        discountElement.innerText = `Discount: ${discount.toFixed(2)} TK`;
        totalElement.innerHTML = `Total: ${finalTotal.toFixed(2)} TK`;
    }

    
    
    // update the cart count
    function updateCartCount() {
        cartCountElement.textContent = cart.length; // Update the count of items in the cart



    }

    
    // Apply coupon 
    couponBtn.addEventListener("click", function () {
        const couponInput = document.getElementById("coupon-input").value.trim();
        const totalPrice = originalPrice;

        if (couponInput === "SELL200" && totalPrice >= 200) {
            discount = totalPrice * 0.20; // Calculate 20% discount
        } else if (couponInput) {
            alert("Invalid coupon code. Please try again.");
            discount = 0; // Reset discount if invalid
        }

        updateTotalPrice(); // Update the total price
        document.getElementById('coupon-input').value = ''; 
    });

    
    
    // Add event listeners to all "Add to Cart" buttons
    //forEach method that executes once for each array element.
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.getAttribute('data-name');//this refers to the button that was clicked and retrieves the value 
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            addItemToCart(itemName, itemPrice); // Add item to cart
        });
    });

    
    // Initialize the displayed prices
    updateTotalPrice();
});
