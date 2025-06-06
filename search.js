const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    let input = document.getElementById("input").value;
    if (input !== "") {
        let regExp = new RegExp(input, 'gi');
        const p = document.getElementsByClassName("product-title");

        Array.from(p).forEach(element => {
            let innerHTML = element.innerHTML;
            let highlightedHTML = innerHTML.replace(regExp, "<mark>$&</mark>");
            element.innerHTML = highlightedHTML;
        });

        const highlightedElements = document.querySelectorAll('.product-title mark');
        if (highlightedElements.length > 0) {
            highlightedElements[0].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
});
// Cart
{
    let cartIcon = document.querySelector('#cart-icon')
    let cart = document.querySelector('.cart')
    let closeCart = document.querySelector('#close-cart')
    // Open cart
    cartIcon.onclick = () => {
        cart.classList.add("active");
    };
    // Close cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };
    //Cart Working 
    document.addEventListener("DOMContentLoaded", function() {
        if (document.readyState == "loading") {
            document.addEventListener("DOMContentLoaded", ready);
        } else {
            ready();
        }
    });
    
    //Making Function
    function ready(){
        //Remove Items From Cart
        var removeCartButtons = document.getElementsByClassName('cart-remove')
        console.log(removeCartButtons)
        for(var i = 0; i < removeCartButtons.length; i++){
            var button = removeCartButtons[i]
            button.addEventListener('click', removeCartItem)
        }
        var quantityInputs = document.getElementsByClassName('cart-quantity')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i]
            input.addEventListener("change", quantityChanged)
        }
        //Add To Cart
        var addCart = document.getElementsByClassName('buy-1')
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i]
            button.addEventListener('click', addCartClicked)
        }
        // Buy Button Work
        document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
    }
    // Buy Button
    function buyButtonClicked(){
        alert("Твоята поръчка е изпратена")
        var cartContent = document.getElementsByClassName('cart-content')[0]
        while (cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild)
        }
        updatetotal();
    }
    function removeCartItem(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.remove();
        updatetotal();
    }
    //Quantity Changes
    function quantityChanged(event){
        var input = event.target
        if (isNaN(input.value) || input.value <= 1) {
            input.value = 1;
        }
        updatetotal();
    }
    //Add To Cart
    function addCartClicked(event){
        var button = event.target
        var shopProducts = button.parentElement
        var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
        var price = shopProducts.getElementsByClassName('price')[0].innerText;
        var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
        addProductToCart(title, price, productImg);
        updatetotal();
    }
    function addProductToCart(title, price, productImg){
        var cartShopBox = document.createElement('div')
        cartShopBox.classList.add('cart-box')
        var cartItems = document.getElementsByClassName('cart-content')[0]
        var cartItemsNames = cartItems.getElementsByClassName('cart-product-title')
        for (var i = 0; i < cartItemsNames.length; i++){
            if (cartItemsNames[i].innerText == title){
            alert("Вие добавихте този продукт в количката")
            return;
            }
        }
    var cartBoxContent = `
            <img src="${productImg}" class="cart-img">
            <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
            </div>
            <i class='bx bxs-trash-alt cart-remove'></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox
        .getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
        cartShopBox
        .getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    }
    //Update Total
    function updatetotal(){
        var cartContent = document.getElementsByClassName('cart-content')[0]
        var cartBoxes = cartContent.getElementsByClassName('cart-box')
        var total = 0;
        for(var i = 0; i < cartBoxes.length; i++){
            var cartBox = cartBoxes[i]
            var priceElement = cartBox.getElementsByClassName('cart-price')[0]
            var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
            var price = parseFloat(priceElement.innerText.replace("$", " "))
            var quantity = quantityElement.value
            total = total + (price * quantity);
        }    
        // If Price Contain Some Stotinki
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = total + " $";
    }
    }