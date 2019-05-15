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
    // const emailVal = document.querySelector('input[name="email"]').value;
    // const passwordVal = document.querySelector('input[name="pwd"]').value;
    // const addressVal = document.querySelector('input[name="address"]').value;
    if (!firstNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'First name should be alphabets only');
    } else if (!lastNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'Last name should be alphabets only');
    }
    else {
        alertResult('success', 'Registered');
    }
});
