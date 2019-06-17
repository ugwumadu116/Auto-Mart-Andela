const endRangeDom = document.querySelector('#end-range');
const startRangeDom = document.querySelector('#start-range');
const startRangeValueDOM = document.querySelector('.start-range-value');
const endRangeValueDOM = document.querySelector('.end-range-value');
const singleCarOverlayDOM = document.querySelector('.single-car-overlay');
const singleCarDOM = document.querySelector('.single-car');
const closeSingleCarDOM = document.querySelector('.close-single-car');
const carContainerDOM = document.querySelector('.cars-container');
const singleCarContainer = document.querySelector('.single-car-content');

// startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
// endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
// startRangeDom.addEventListener('input', () => {
//     startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
// });
// endRangeDom.addEventListener('input', () => {
//     endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
// });


// closeSingleCarDOM.addEventListener('click', () => {
//     singleCarOverlayDOM.classList.toggle('transparentBcg1');
//     singleCarDOM.classList.toggle('showSingleCar');
// })

const displayCars = (userCars) => {
    if ('info' in decoded) {
        console.log('NOt admin', decoded)
        userCars.forEach(car => {
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
                <button class="cart-btns add-car"data-id=${car.id}>
                    <i class="fas fa-shopping-cart"></i>
                    add to cart
                </button>
            </div>
        </article>  
            `;
        });
    } else {
        console.log('am admin')
        userCars.forEach(car => {
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
        });
    }
};

// const showSingleCar = (car) => {
//     singleCarContainer.innerHTML = `
//     <article>
//     <img src=${car.img} alt="car">
//     <div class="car-name">
//         <h3>${car.name}</h3>
//         <h3>$${car.price}m</h3>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">MANUFACTURER : </div>
//         <div class="car-info-val">
//             <h3>${car.manufacturer}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">STATE : </div>
//         <div class="car-info-val">
//             <h3>${car.state}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">STATUS : </div>
//         <div class="car-info-val">
//             <h3>${car.status}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">MODEL : </div>
//         <div class="car-info-val">
//             <h3>${car.model}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">OWNER : </div>
//         <div class="car-info-val">
//             <h3>${car.owner}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">DATE : </div>
//         <div class="car-info-val">
//             <h3>${car.date}</h3>
//         </div>
//     </div>
//     <div class="single-car-item">
//         <div class="car-info">BODY TYPE : </div>
//         <div class="car-info-val">
//             <h3>${car.bodyType}</h3>
//         </div>
//     </div>
//     </article>
//     `;
//     singleCarOverlayDOM.classList.toggle('transparentBcg1');
//     singleCarDOM.classList.toggle('showSingleCar');
// }
// const showACar = () => {
//     const carImageDOM = document.querySelectorAll('.car-img');
//     carImageDOM.forEach(img => {
//         img.addEventListener('click', () => {
//             let id = img.dataset.id;
//             let requestedCar = cars.find(car => car.id == id);
//             showSingleCar(requestedCar);
//         })
//     })
// }
// const deleteACar = () => {
//     const deleteBtnDOM = document.querySelectorAll('.delete-car');
//     deleteBtnDOM.forEach(btn => {
//         btn.addEventListener('click', () => {
//             btn.parentElement.parentElement.style.display = 'none';
//         })
//     })
// }
////////////////////////////////////////////////////    API     ////////////////////////////////////////////////////////////
class Car {
    // const token = JSON.parse(localStorage.getItem('token'));
    async getCars() {
        try {
            const token = await JSON.parse(localStorage.getItem('token'));
            const cars = await fetch('https://auto-mart-ugwumadu116.herokuapp.com/api/v1/car', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            const data = await cars.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

};

class Ui {

}
// class User {
//     const findUser = () => {
//     const pairs = location.search.slice(1).split('&');

//     let result = {};
//     pairs.forEach(pair => {
//         pair = pair.split('=');
//         result[pair[0]] = decodeURIComponent(pair[1] || '');
//     });
//     return result;
// }

// }
class Storage {

}

document.addEventListener('DOMContentLoaded', async () => {
    const cars = new Car();
    const { data } = await cars.getCars();
    displayCars(data);

    // displayCars(cars);
    // showACar();
    // deleteACar();
})

