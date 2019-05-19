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
        status: 'available',
        state: 'new',
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
        status: 'available',
        state: 'new',
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
        status: 'sold',
        state: 'new',
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
        status: 'available',
        state: 'used',
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
        status: 'available',
        state: 'new',
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
        status: 'available',
        state: 'new',
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
        status: 'available',
        state: 'used',
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
        status: 'sold',
        state: 'new',
        bodyType: 'truck'
    },
    {
        id: 9,
        name: 'Volkswagen',
        img: './images/car10.jpg',
        price: 80,
        model: '2013 model',
        manufacturer: 'Volkswagen group',
        owner: 'Uche fords',
        date: '19/3/2019',
        status: 'available',
        state: 'used',
        bodyType: 'car'
    },
    {
        id: 10,
        name: 'Mercedes Benz',
        img: './images/car9.jpg',
        price: 100,
        model: '2013 model',
        manufacturer: 'Toyota Motor Corporation',
        owner: 'uche fords',
        date: '19/3/2019',
        status: 'available',
        state: 'new',
        bodyType: 'car'
    }
];

let soldCars = [];

const carContainerDOM = document.querySelector('.cars-container');
const sellCarBtnDOM = document.querySelector('.cart-icon-button');
const sellCarOverlay = document.querySelector('.sell-car-overlay');
const sellCarContent = document.querySelector('.sell-car');
const closeSellCar = document.querySelector('.close-sell-car');
const singleCarContainer = document.querySelector('.single-car-content');
const singleCarOverlayDOM = document.querySelector('.single-car-overlay');
const singleCarDOM = document.querySelector('.single-car');
const closeSingleCarDOM = document.querySelector('.close-single-car');
const updatePriceDOM = document.querySelector('.update-price');
const contentDOM = document.querySelector('.content');
const soldCarsDOM = document.querySelector('.sold-cars');
const myCarsBtnDom = document.querySelector('.my-cars-btn');

closeSingleCarDOM.addEventListener('click', () => {
    singleCarOverlayDOM.classList.toggle('transparentBcg1');
    singleCarDOM.classList.toggle('showSingleCar');
})

const displayCars = (cars) => {
    let str = '';

    (cars.length === 0) ? carContainerDOM.innerHTML = '<h1>You are yet to post a car</h1>' : cars.forEach(car => {
        str += `
        <article class="card">
        <img src=${car.img} class="car-img" alt="product" data-id=${car.id}>
        <div class="details">
            <div class="menuName">
                <h2>${car.name} </h2>
            </div>
            <span class="model">${car.model}</span>
            <span class="price">$${car.price}m</span>
        </div>
        <div class="cart-footer">
            <button class="cart-btns delete-car del" data-id=${car.id}>
                <i class="fas fa-trash"></i>
                delete
            </button>
        </div>
    </article>  
        `;

    })
    carContainerDOM.innerHTML = str;
};
const carOwner = (user) => {
    const findCar = cars.filter(car => car.owner === user);
    soldCars = findCar.filter(car => car.status === 'sold')
    displayCars(findCar);
}
const showSingleCar = (car) => {
    singleCarContainer.innerHTML = `
    <img src=${car.img} alt="car">
    <div class="car-name">
        <h3>${car.name}</h3>
        <h3>$${car.price}m</h3>
    </div>
    <div class="single-car-item">
        <div class="car-info">MANUFACTURER : </div>
        <div class="car-info-val">
            <h3>${car.manufacturer}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">STATE : </div>
        <div class="car-info-val">
            <h3>${car.state}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">STATUS : </div>
        <div class="car-info-val">
            <h3>${car.status}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">MODEL : </div>
        <div class="car-info-val">
            <h3>${car.model}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">OWNER : </div>
        <div class="car-info-val">
            <h3>${car.owner}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">DATE : </div>
        <div class="car-info-val">
            <h3>${car.date}</h3>
        </div>
    </div>
    <div class="single-car-item">
        <div class="car-info">BODY TYPE : </div>
        <div class="car-info-val">
            <h3>${car.bodyType}</h3>
        </div>
    </div>
    `;
    singleCarOverlayDOM.classList.toggle('transparentBcg1');
    singleCarDOM.classList.toggle('showSingleCar');
}
const showACar = () => {
    const carImageDOM = document.querySelectorAll('.car-img');
    carImageDOM.forEach(img => {
        img.addEventListener('click', () => {
            let id = img.dataset.id;
            let requestedCar = cars.find(car => car.id == id);
            showSingleCar(requestedCar);
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    carOwner('John Doe');
    showACar();
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

// update price
updatePriceDOM.addEventListener('click', () => {
    contentDOM.classList.toggle('show-content')
})

// // sold cars
soldCarsDOM.addEventListener('click', () => {
    carContainerDOM.innerHTML = '';
    myCarsBtnDom.classList.toggle('btn-active')
    soldCarsDOM.classList.toggle('btn-active')
    displayCars(soldCars);
    showACar();
})

// // my cars 
myCarsBtnDom.addEventListener('click', () => {
    carContainerDOM.innerHTML = '';
    myCarsBtnDom.classList.toggle('btn-active')
    soldCarsDOM.classList.toggle('btn-active')
    carOwner('John Doe');
    showACar();
})