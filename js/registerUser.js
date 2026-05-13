
function registerUser() {

    const username= document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if(username === "" || password === "" || confirmPassword === ""){

        document.getElementById("message").innerText = "Please fill in all the fields";

        return;
    }

    if(password !== confirmPassword){

        document.getElementById("message").innerText = "Passwords do not match";

        return; 
    }

        let users= JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user =>user.username === username);

        if(userExists){

            document.getElementById("message").innerText = "Username already exists";
            return;
        }

        const newUser = {

            username: username,
            password: password,
            score : 0
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

       
         
        document.getElementById("message").innerText = "Registration successful. Please log in.";
       
            setTimeout(() => {localStorage.setItem("currentUser", JSON.stringify(newUser));   
                 window.location.href="index.html";
            },1.5000);


       
    }