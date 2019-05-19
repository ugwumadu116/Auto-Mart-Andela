const cars = [
    {
        id: 1,
        name: 'Chevrolet',
        img: './images/car1.jpg',
        price: 50,
        model: '2018 model',
        manufacturer: 'General Motors (GM)',
        owner: 'John Doe',
        date: '17/5/2019',
        status: 'new',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 2,
        name: 'Vintage',
        img: './images/car2.jpg',
        price: 600,
        model: '2019 model',
        manufacturer: 'Nissan Motor Company',
        owner: 'John Doe',
        date: '12/7/2019',
        status: 'new',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 3,
        name: 'Range Rover',
        img: './images/car3.jpg',
        price: 400,
        model: '2019 model',
        manufacturer: 'Land Rover',
        owner: 'John Doe',
        date: '12/3/2014',
        status: 'used',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 4,
        name: 'Range Rover',
        img: './images/car4.jpg',
        price: 400,
        model: '2019 model',
        manufacturer: 'Land Rover',
        owner: 'jim ken',
        date: '12/3/2014',
        status: 'used',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 5,
        name: 'Bentley',
        img: './images/car5.jpg',
        price: 800,
        model: '2019 model',
        manufacturer: 'Bentley Motors Limited',
        owner: 'John Doe',
        date: '12/3/2014',
        status: 'new',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 6,
        name: 'ferrari',
        img: './images/car6.jpg',
        price: 500,
        model: '2019 model',
        manufacturer: 'ferrari',
        owner: 'joel john',
        date: '12/3/2014',
        status: 'new',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 7,
        name: 'Mercedes Benz',
        img: './images/car7.jpg',
        price: 10,
        model: '2013 model',
        manufacturer: 'Bentley Motors Limited',
        owner: 'Amarachi queen',
        date: '1/3/2019',
        status: 'used',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 8,
        name: 'Mercedes Benz',
        img: './images/car8.jpg',
        price: 10,
        model: '2013 model',
        manufacturer: 'Tesla, Inc',
        owner: 'John Doe',
        date: '1/3/2019',
        status: 'used',
        state: 'available',
        bodyType: 'truck'
    },
    {
        id: 9,
        name: 'Mercedes Benz',
        img: './images/car10.jpg',
        price: 80,
        model: '2013 model',
        manufacturer: 'Toyota Motor Corporation',
        owner: 'Uche fords',
        date: '19/3/2019',
        status: 'used',
        state: 'available',
        bodyType: 'car'
    },
    {
        id: 10,
        name: 'Volkswagen',
        img: './images/car9.jpg',
        price: 100,
        model: '2013 model',
        manufacturer: 'Volkswagen group',
        owner: 'uche fords',
        date: '19/3/2019',
        status: 'used',
        state: 'available',
        bodyType: 'car'
    }
];

const carContainerDOM = document.querySelector('.cars-container');
const sellCarBtnDOM = document.querySelector('.cart-icon-button');
const sellCarOverlay = document.querySelector('.sell-car-overlay');
const sellCarContent = document.querySelector('.sell-car');
const closeSellCar = document.querySelector('.close-sell-car');

const displayCars = (cars) => {

    (cars.length === 0) ? carContainerDOM.innerHTML = '<h1>You are yet to post a car</h1>' : cars.forEach(car => {
        carContainerDOM.innerHTML += `
        <article class="card">
        <img src=${car.img} class="car-img" alt="product" data-id=${car.id}>
        <div class="details">
            <div class="menuName">
                <h2>${car.name} </h2>
            </div>
            <span class="model">${car.model}</span>
            <span class="price">$${car.price}m</span>
            <span class="flag"><i class="fab fa-font-awesome-flag"></i>
                <span class="flag-text">report as fraud</span>
            </span>
        </div>
        <div class="cart-footer">
            <button class="cart-btns delete-car del" data-id=${car.id}>
                <i class="fas fa-trash"></i>
                delete
            </button>
            <button class="cart-btns add-car"data-id=${car.id}>
                <i class="fas fa-shopping-cart"></i>
                add to cart
            </button>
        </div>
    </article>  
        `;
    })
};
const carOwner = (user) => {
    const findCar = cars.filter(car => car.owner === user);
    displayCars(findCar);
}

document.addEventListener('DOMContentLoaded', () => {
    carOwner('John Doe')
})
// post car
sellCarBtnDOM.addEventListener('click', () => {
    sellCarOverlay.classList.toggle('transparentBcg2');
    sellCarContent.classList.toggle('showSell-carX')
})
closeSellCar.addEventListener('click', () => {
    sellCarOverlay.classList.toggle('transparentBcg2');
    sellCarContent.classList.toggle('showSell-carX')
})