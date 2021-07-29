const buttonLogin = document.getElementById('login-button');

buttonLogin.addEventListener("click", () => {
    document.location.href = '../dashboard/dashboard.html';
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