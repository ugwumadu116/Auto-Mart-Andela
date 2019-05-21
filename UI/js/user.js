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
        owner: 'John Doe',
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
        owner: 'lat week',
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
        owner: 'joel pin',
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
        owner: 'Adam queen',
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
        owner: 'kiss folks',
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

const orders = [
    {
        id: 1,
        car_id: 9,
        buyer: 'john king',
        created_on: '21/5/2019',
        status: 'pending',
        price_offered: 50

    },
    {
        id: 2,
        car_id: 1,
        buyer: 'Mic vin',
        created_on: '21/5/2019',
        status: 'pending',
        price_offered: 40
    },
    {
        id: 4,
        car_id: 1,
        buyer: 'sprint chef',
        created_on: '21/5/2019',
        status: 'pending',
        price_offered: 60
    },
    {
        id: 5,
        car_id: 3,
        buyer: 'mick Doe',
        created_on: '21/5/2019',
        status: 'pending',
        price_offered: 60
    },
    {
        id: 6,
        car_id: 5,
        buyer: 'John Doe',
        created_on: '21/5/2019',
        status: 'pending',
        price_offered: 60
    }
];
//let soldCars = [];

const carContainerDOM = document.querySelector('.cars-container');
const sellCarBtnDOM = document.querySelector('.cart-icon-button');
const sellCarOverlay = document.querySelector('.sell-car-overlay');
const sellCarContent = document.querySelector('.sell-car');
const closeSellCar = document.querySelector('.close-sell-car');
const singleCarContainer = document.querySelector('.single-car-content');
const singleCarOverlayDOM = document.querySelector('.single-car-overlay');
const singleCarDOM = document.querySelector('.single-car');
const closeSingleCarDOM = document.querySelector('.close-single-car');
const soldCarsDOM = document.querySelector('.sold-cars');
const orderReqDOM = document.querySelector('.order-request');
const myCarsBtnDom = document.querySelector('.my-cars-btn');
const myOrderReq = document.querySelector('.my-order');

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
            <div class="available">Available</div>            
        </div>
    </article>  
        `;

    })
    carContainerDOM.innerHTML = str;
};
const displayOrders = (orders) => {
    let str = '';
    (orders.length === 0)
        ? carContainerDOM.innerHTML = '<h1>No one has ordered your car</h1>' : orders.forEach(order => {
            const car = cars.find(item => item.id === order.car_id);
            str += `
            <article class="card">
            <img src=${car.img} class="car-img" alt="product" data-id=${order.id}>
            <div class="details">
                <div class="menuName">
                    <h2>${car.name} </h2>
                </div>
                <span class="model">${car.model}</span>
                <span class="price">$${car.price}m</span>
            </div>
            <div class="cart-footer">
                <div class="available">price offered: $${order.price_offered}m </div>            
            </div>
        </article>  
        `;

        })
    carContainerDOM.innerHTML = str;
};
const carOwner = (user) => {
    const findCar = cars.filter(car => car.owner === user && car.status !== 'sold');
    displayCars(findCar);
}
const getOrders = (user) => {
    const findCar = cars.filter(car => car.owner === user && car.status !== 'sold');
    let mySaleReq = []
    findCar.forEach(car => {
        if (orders.filter(order => order.car_id === car.id).length !== 0) {
            mySaleReq = [...mySaleReq, orders.filter(order => order.car_id === car.id)]
        }
    });

    const simpleOrder = [].concat(...mySaleReq);
    displayOrders(simpleOrder);
    showAnOrder('purchase request', simpleOrder);
}
const getMyOrders = (user) => {
    const findOrders = orders.filter(order => order.buyer === user);
    displayOrders(findOrders);
    showAnOrder('My Order', findOrders);
}
const showSingleCar = (title, car) => {
    singleCarContainer.previousElementSibling.innerText = title || 'my car advert';
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
    <div class="car-footer">
        <button class="single-car-btn update-price">Update price</button>
            <div class="content">
                <form>
                    <input type="number">
                    <input type="submit">
                </form>
            </div>
    </div>
    `;
    singleCarOverlayDOM.classList.toggle('transparentBcg1');
    singleCarDOM.classList.toggle('showSingleCar');
    updatePrice();
}
const showASoldCar = (title, car) => {
    singleCarContainer.previousElementSibling.innerText = title || 'my car advert';
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
const showSingleOrder = (title, car, order) => {
    singleCarContainer.previousElementSibling.innerText = title;
    if (title === 'My Order') {
        singleCarContainer.innerHTML = `
        <img src=${car.img} alt="car">
        <div class="car-name">
            <h3>${car.name}</h3>
            <h3>$${car.price}m</h3>
        </div>
        <div class="single-car-item">
            <div class="car-info">BUYER : </div>
            <div class="car-info-val">
                <h3>${order.buyer}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">PRICE OFFERED : </div>
            <div class="car-info-val">
                <h3>$${order.price_offered}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">STATUS : </div>
            <div class="car-info-val">
                <h3>${order.status}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">SELLER : </div>
            <div class="car-info-val">
                <h3>${car.owner}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">DATE ORDER : </div>
            <div class="car-info-val">
                <h3>${order.created_on}</h3>
            </div>
        </div>
        <div class="car-footer">
        <button class="single-car-btn update-price">Update price</button>
        <div class="content">
            <form>
                <input type="number">
                <input type="submit">
            </form>
        </div>
        </div>
        `;
        singleCarOverlayDOM.classList.toggle('transparentBcg1');
        singleCarDOM.classList.toggle('showSingleCar');
        updatePrice();
    } else {
        singleCarContainer.innerHTML = `
        <img src=${car.img} alt="car">
        <div class="car-name">
            <h3>${car.name}</h3>
            <h3>$${car.price}m</h3>
        </div>
        <div class="single-car-item">
            <div class="car-info">BUYER : </div>
            <div class="car-info-val">
                <h3>${order.buyer}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">PRICE OFFERED : </div>
            <div class="car-info-val">
                <h3>$${order.price_offered}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">STATUS : </div>
            <div class="car-info-val">
                <h3>${order.status}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">SELLER : </div>
            <div class="car-info-val">
                <h3>${car.owner}</h3>
            </div>
        </div>
        <div class="single-car-item">
            <div class="car-info">DATE ORDER : </div>
            <div class="car-info-val">
                <h3>${order.created_on}</h3>
            </div>
        </div>
        <div class="car-footer">
            <button class="single-car-btn accept-price">Accept</button>
            <button class="single-car-btn reject-price">Reject</button>
        </div>
        `;
        singleCarOverlayDOM.classList.toggle('transparentBcg1');
        singleCarDOM.classList.toggle('showSingleCar');
    }


}
const showACar = (title) => {
    const carImageDOM = document.querySelectorAll('.car-img');
    carImageDOM.forEach(img => {
        img.addEventListener('click', () => {
            let id = img.dataset.id;
            let requestedCar = cars.find(car => car.id == id);
            if (title === 'Sold Cars') {
                showASoldCar(title, requestedCar);
            } else {
                showSingleCar(title, requestedCar);
            }

        })
    })
}
const showAnOrder = (title, orders) => {
    const carImageDOM = document.querySelectorAll('.car-img');
    carImageDOM.forEach(img => {
        img.addEventListener('click', () => {
            let id = img.dataset.id;
            //console.log(id)
            const orderDetails = orders.find(order => order.id == id);
            const carDetails = cars.find(car => car.id = orderDetails.car_id)
            console.log(orderDetails, carDetails)
            showSingleOrder(title, carDetails, orderDetails);
        })
    })
}
const updatePrice = () => {
    const updatePriceDOM = document.querySelector('.update-price');

    const contentDOM = document.querySelector('.content');
    updatePriceDOM.addEventListener('click', () => {
        contentDOM.classList.toggle('show-content')
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


// // sold cars
soldCarsDOM.addEventListener('click', () => {
    carContainerDOM.innerHTML = '';
    myCarsBtnDom.classList.remove('btn-active');
    soldCarsDOM.classList.add('btn-active');
    orderReqDOM.classList.remove('btn-active');
    myOrderReq.classList.remove('btn-active');
    const findCar = cars.filter(car => car.owner === 'John Doe' && car.status === 'sold');
    displayCars(findCar);
    showACar('Sold Cars');
})
// order request {[purchase] cars people want to buy from me}
orderReqDOM.addEventListener('click', () => {
    carContainerDOM.innerHTML = '';
    myCarsBtnDom.classList.remove('btn-active');
    soldCarsDOM.classList.remove('btn-active');
    orderReqDOM.classList.add('btn-active');
    myOrderReq.classList.remove('btn-active');
    getOrders('John Doe');
})
// my orders {cars i want to buy from others}
myOrderReq.addEventListener('click', () => {
    myCarsBtnDom.classList.remove('btn-active');
    soldCarsDOM.classList.remove('btn-active');
    orderReqDOM.classList.remove('btn-active');
    myOrderReq.classList.add('btn-active');
    getMyOrders('John Doe')
})

// // my cars 
myCarsBtnDom.addEventListener('click', () => {
    carContainerDOM.innerHTML = '';
    myCarsBtnDom.classList.add('btn-active');
    soldCarsDOM.classList.remove('btn-active');
    orderReqDOM.classList.remove('btn-active');
    myOrderReq.classList.remove('btn-active');
    carOwner('John Doe');
    showACar();
})