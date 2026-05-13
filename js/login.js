

function login(){

    const username= document.getElementById("username").value;

    const password= document.getElementById("password").value;

   
    const users =JSON.parse(localStorage.getItem("users")) || [];

    const registeredUser = users.find(user => user.username === username && user.password === password);

    if(registeredUser){ 
        document.getElementById("message").innerText = "Login successful. Redirecting to game...";
        setTimeout(() => {
            localStorage.setItem("currentUser", JSON.stringify(registeredUser));
            window.location.href = "blackjack.html";
        }, 1000);
    } 
    
    else {
    document.getElementById("message").innerText = "Invalid username or password";
}

}