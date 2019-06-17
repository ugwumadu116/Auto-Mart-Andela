const outputDOM = document.querySelector('.output');
const loginFormDOM = document.querySelector('.login-form');

const alertResult = (state, output, loading) => {
    if (state === 'success' & loading === false) {
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.innerText = '';
        }, 7000);
    } else if (state === 'success' & loading === true) {
        outputDOM.innerText = output;
    } else {
        outputDOM.classList.toggle("validation");
        outputDOM.innerText = output;
        setTimeout(function () {
            outputDOM.classList.toggle("validation");
            outputDOM.innerText = '';
        }, 7000);
    }
}
loginFormDOM.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="pwd"]').value;
    alertResult('success', 'loading...', true);
    const result = await fetch('https://auto-mart-ugwumadu116.herokuapp.com/api/v1/auth/signin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const res = await result.json();
    if (res.status === 200) {
        alertResult('success', 'Success', false);
        localStorage.setItem('token', JSON.stringify(res.data[0].token));
        window.location.href = 'cars.html';
    } else {
        alertResult('failed', res.message, false);
    }
});
