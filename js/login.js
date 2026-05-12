

function login(){

    const username= document.getElementById("username").value;

    const password= document.getElementById("password").value;

    if(username === "keerthana" && password === "12345"){
        document.getElementById("message").innerText = "Login Successfull";
    }
    else{
        document.getElementById("message").innerText="Login Failed";
    }
}