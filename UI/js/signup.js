const outputDOM = document.querySelector('.output');
const signUPFormDOM = document.querySelector('#sign-up');

const alertResult = (state, output) => {
    if (state === 'success') {
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.innerText = '';
        }, 3000);
    } else {
        outputDOM.classList.toggle("validation");
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.classList.toggle("validation");
            outputDOM.innerText = '';
        }, 3000);
    }
}
signUPFormDOM.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstNameVal = document.querySelector('input[name="firstName"]').value;
    const lastNameVal = document.querySelector('input[name="lastName"]').value;
    if (!firstNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'First name should be alphabets only');
    } else if (!lastNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'Last name should be alphabets only');
    }
    else {
        alertResult('success', 'Registered');
        document.querySelector('#sign-up').action = 'cars.html';
        document.querySelector('#sign-up').submit();
    }
});
