const buttonCreateAccount = document.getElementById("create-account-button");

const createAccountURL = "http://localhost:8080/users/";

buttonCreateAccount.addEventListener("click", () => {
    const username = document.getElementById('username-input').value;
    const password = document.getElementById('password-input').value;
    
    (async () => {
        await fetch(createAccountURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
          },
          mode: 'cors',
          body: JSON.stringify({name: username, password: password})
        })
        .then(e => document.location.href = '../login/login.html')
        .catch(error => console.error(error));

      })();
})