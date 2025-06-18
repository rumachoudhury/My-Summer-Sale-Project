




document.addEventListener('DOMContentLoaded', function () {
    const couponBtn = document.getElementById('coupon-btn');
    const discountElement = document.getElementById('discount');
    const totalElement = document.getElementById('final-total')
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let originalPrice = 0; // Start with 0
    let discount = 0;  // Reset discount if invalid

    let cart = []; // Array to store cart items



    // I am using  Function to add an item to the list and update the total price.
    function addItemToCart(itemName, itemPrice) {

        //I comment out this three line of code to hide the list item because I don't want to show the list item 

        // const listItem = document.createElement("li");
        // listItem.textContent = `${itemName}: ${itemPrice.toFixed(2)}TK`
        // document.getElementById('item-list').appendChild(listItem); 

        originalPrice += itemPrice // Update total price
        cart.push({ name: itemName, price: itemPrice }); // using push method add item to cart
        updateTotalPrice();
        updateCartCount(); // Update the cart

    }


    //creating another Function to update total price and discount
    function updateTotalPrice() {
        const finalTotal = originalPrice - discount;


        discountElement.innerText = `Discount: ${discount.toFixed(2)} TK`;
        totalElement.innerHTML = `Total: ${finalTotal.toFixed(2)} TK`;

    }


    // update the cart count
    function updateCartCount() {
        cartCountElement.textContent = cart.length; // Update the count of items in the cart
    }



    couponBtn.addEventListener("click", function () {
        const couponInput = document.getElementById("coupon-input").value.trim();


        if (couponInput === "SELL200" && originalPrice >= 200) {
            discount = originalPrice * 0.20 // Calculate discount 20%
        } else if (couponInput) {
            alert("Invalid coupon code. Please try again.");
            discount = 0;
        }


        updateTotalPrice(); // Update the total price
        document.getElementById('coupon-input').value = '';

    })

    // Add event listeners to all "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.getAttribute('data-name');
            const itemPrice = parseFloat(this.getAttribute('data-price'));
            addItemToCart(itemName, itemPrice);
        });
    });


    // Initialize the displayed prices
    updateTotalPrice();


});
