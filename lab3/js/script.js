//event listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function (event) {
    validateForm(event);
});
document.querySelector("#password").addEventListener("focus", function () {
    generatePassword();
});

// global variables
isNameAvailable = false;

// calling function
displayStates();

//function definitions

// get all 50 state names from web API on page load
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let stateList = document.querySelector("#state");
    for (let i = 0; i < data.length; i++) {
        let state = data[i];
        stateList.innerHTML += `<option value="${state.usps}">${state.state}</option>`;
    }
    
}

//displaying city from web API after entering a zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    // check if zip code exists
    if (data) {
        document.querySelector("#city").innerHTML = data.city;
        document.querySelector("#latitude").innerHTML = data.latitude;
        document.querySelector("#longitude").innerHTML = data.longitude;
        document.querySelector("#zipcodeError").innerHTML = "";
    } else {
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        document.querySelector("#zipcodeError").innerHTML = "Zip code not found";
    }
}

// display counties from web  API based o n the two-letter abbreviation of a state

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i = 0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
        isNameAvailable = true;
    }
    else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
        isNameAvailable = false;
    }
}

async function generatePassword() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();
    
    if(data.password) {
        document.querySelector("#suggestedPwd").innerHTML = `Suggested Password: ${data.password}`;
    }

}

// Validating form data
function validateForm(e) {
    let isValid = true;
    let username = document.querySelector("#username").value;

    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        isValid = false;
    }

    // checking name available error
    if (!isNameAvailable) {
        isValid = false;
    }


    // checking password 
    let pw = document.querySelector("#password").value;
    let retypePw = document.querySelector("#retypepassword").value;
    let passwordError = document.querySelector("#passwordError");

    // clearing
    passwordError.innerHTML = "";

    if (pw.length < 6) {
        passwordError.innerHTML = "Password must have at least 6 characters.";
        isValid = false;
    }

    if (pw !== retypePw) {
        passwordError.innerHTML = "Passwords do not match!";
        isValid = false;
    }

    if (!isValid) {
        e.preventDefault();
    }
}

