const cartContainerDOM = document.querySelector('.order-content');
const cartBtnDOM = document.querySelector('.cart-icon-button');
const orderOverlayDOM = document.querySelector('.order-overlay');
const orderDOM = document.querySelector('.order');
const closeOrderBtn = document.querySelector('.close-order');
const cartItemDOMVal = document.querySelector('.cart-items')
let cartItems = [];

const addItem = (item) => {
    cartContainerDOM.innerHTML += `
        <div class="order-item">
        <img src=${item.img} alt="car image">
        <div>
            <h4>${item.name}</h4>
            <h5>$${item.price}m</h5>
            <span class="delete-item">delete</span>
        </div>
        <div>
            <h4>Bargain price</h4>
            <input class="bargain" type="number">
        </div>
        <div>
            <h4>Qty</h4>
            <input class="qty" value="1" type="number">

        </div>
    </div>
        `;
}
// open car
cartBtnDOM.addEventListener('click', () => {
    orderOverlayDOM.classList.toggle('transparentBcg2');
    orderDOM.classList.toggle('showOrderX');
})
// close car
closeOrderBtn.addEventListener('click', () => {
    orderOverlayDOM.classList.toggle('transparentBcg2');
    orderDOM.classList.toggle('showOrderX');
})
document.addEventListener('DOMContentLoaded', () => {
    const addToCartBTN = document.querySelectorAll('.add-car');
    addToCartBTN.forEach(btn => {
        btn.addEventListener('click', () => {
            const carClicked = cars.find(car => car.id == btn.dataset.id);
            cartItems = [...cartItems, carClicked];
            cartItemDOMVal.innerText = cartItems.length;
            addItem(carClicked);
            //console.log(cartItems)
        });
    });

})