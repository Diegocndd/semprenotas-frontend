"use strict"

sessionStorage.setItem('@semprenotas:token', '');

const responseIncorrectUserOrPass = "Password or username incorrect";
const responseUserLogged = "User logged";
const alertincorrectUserOrPass = "Nome de usuário ou senha incorreto!";
const loginURL = "http://localhost:8080/login/";

const buttonLogin = document.getElementById('login-button');

const incorrectUsernameOrPassword = () => {
    const form = document.getElementById("form-login");
    const textError = document.createElement("p");

    textError.appendChild(document.createTextNode(alertincorrectUserOrPass));
    textError.style = 'color: red';

    document.getElementById('username-input').value = '';
    document.getElementById('password-input').value = '';

    form.appendChild(textError);
}

buttonLogin.addEventListener("click", () => {

    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;

    (async () => {
        const login = await fetch(loginURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name: username, password: password})
        })
        .then(response => {
            if (response.status === 500) {
                incorrectUsernameOrPassword();
            } else {
                response.text().then(function (text) {
                    if (text !== responseIncorrectUserOrPass && text.length === 20) {
                        sessionStorage.setItem('@semprenotas:token', text);
                        document.location.href = '../dashboard/dashboard.html';
                    } else if (text === responseIncorrectUserOrPass) {
                        incorrectUsernameOrPassword();
                    }
                });
            }
        })
        .catch(error => console.log(error));
      })();
});

buttonLogin.addEventListener("mouseover", () => {
    buttonLogin.style = `
        background-color: #FFFFFF;
        color: #5E2129;
        border-color: #5E2129;
        border-radius: 10px;
        height: 60px;
        width: 68%;
        font-size: 20px;
    `;
})

buttonLogin.addEventListener("mouseout", () => {
    buttonLogin.style = `
        background-color: #5E2129;
        color: #FFFFFF;
        border-color: transparent;
        border-radius: 10px;
        height: 60px;
        width: 68%;
        font-size: 20px;
    `;
})