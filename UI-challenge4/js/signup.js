const outputDOM = document.querySelector('.output');
const signUPFormDOM = document.querySelector('#sign-up');

const alertResult = (state, output, loading) => {
    if (state === 'success' & loading === false) {
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.innerText = '';
        }, 3000);
    } else if (state === 'success' & loading === true) {
        outputDOM.innerText = output;
    } else {
        outputDOM.classList.toggle("validation");
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.classList.toggle("validation");
            outputDOM.innerText = '';
        }, 3000);
    }
}
signUPFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstNameVal = document.querySelector('input[name="firstName"]').value;
    const lastNameVal = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="pwd"]').value;
    const address = document.querySelector('input[name="address"]').value;


    if (!firstNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'First name should be alphabets only');
    } else if (!lastNameVal.match(/^[A-Z]+$/i)) {
        alertResult('failed', 'Last name should be alphabets only');
    }
    else {
        alertResult('success', 'loading...', true);
        const result = await fetch('https://auto-mart-ugwumadu116.herokuapp.com/api/v1/auth/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstNameVal,
                lastName: lastNameVal,
                email,
                password,
                address
            })
        })
        const res = await result.json();
        if (res.status === 201) {
            alertResult('success', 'Registered', false);
            localStorage.setItem('token', JSON.stringify(res.data[0].token));
            window.location.href = 'cars.html';
        } else {
            alertResult('failed', res.message, false);
        }
    }
});
