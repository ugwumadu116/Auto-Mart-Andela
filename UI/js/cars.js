const endRangeDom = document.querySelector('#end-range');
const startRangeDom = document.querySelector('#start-range');
const startRangeValueDOM = document.querySelector('.start-range-value');
const endRangeValueDOM = document.querySelector('.end-range-value');
const singleCarOverlayDOM = document.querySelector('.single-car-overlay');
const singleCarDOM = document.querySelector('.single-car');
const closeSingleCarDOM = document.querySelector('.close-single-car');
const carContainerDOM = document.querySelector('.cars-container');
const singleCarContainer = document.querySelector('.single-car-content');

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
        owner: 'Mic smith',
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
        owner: 'jim ken',
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
        owner: 'kim john',
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
        owner: 'precious fords',
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

startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
startRangeDom.addEventListener('input', () => {
    startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
});
endRangeDom.addEventListener('input', () => {
    endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
});


closeSingleCarDOM.addEventListener('click', () => {
    singleCarOverlayDOM.classList.toggle('transparentBcg');
    singleCarDOM.classList.toggle('showCart');
})

const displayCars = (cars) => {
    cars.forEach(car => {
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
            <button class="cart-btn del">
                <i class="fas fa-trash"></i>
                delete
            </button>
            <button class="cart-btn" data-id="1">
                <i class="fas fa-shopping-cart"></i>
                add to cart
            </button>
        </div>
    </article>  
        `;
    })
};
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
    singleCarOverlayDOM.classList.toggle('transparentBcg');
    singleCarDOM.classList.toggle('showCart');
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
    displayCars(cars);
    showACar()
})