const endRangeDom = document.querySelector('#end-range');
const startRangeDom = document.querySelector('#start-range');
const startRangeValueDOM = document.querySelector('.start-range-value');
const endRangeValueDOM = document.querySelector('.end-range-value');

startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
startRangeDom.addEventListener('input', () => {
    startRangeValueDOM.innerText = `$${startRangeDom.value} million`;
});
endRangeDom.addEventListener('input', () => {
    endRangeValueDOM.innerText = `$${endRangeDom.value} million`;
})