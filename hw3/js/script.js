// event listeners
document.querySelector("#weather-form").addEventListener("submit", function(event) {
    event.preventDefault(); // preventing page reload since we don't want to change pages anyways

    const city = document.getElementById("cityInput").value.trim(); // User input

    // reset warning
    document.getElementById("searchError").innerHTML = "";

    if (!validateForm(city)) {
        return;
    }
    
    let weatherData = getWeather(city);
    displayWeather(weatherData);
});

// global variables
const API_KEY = "8b66edc2382e9c39e9a9832d1cdbce5f";

// functions

// validate search input
function validateForm(city){
    // check if input is empty

    if (city === "") {
        document.getElementById("searchError").innerHTML = "City cannot be empty";
        return false;
        
    }

    return true;

}

// fetch weather data
async function getWeather(city){
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;
    
    try {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        document.getElementById("searchError").innerHTML = "";
        return data;
    } else {
        // 404 error
        if (response.status === 404) {
            throw new Error('404, Not found');
        }
        // any other server error
        throw new Error(response.status);
    }

    } catch (error) {
        let errorMessage = 'Fetch ' + error + " Check spelling or spaces";
        console.error(errorMessage);
        document.getElementById("searchError").innerHTML = errorMessage;


    }

}

// display weather data
function displayWeather(data) {
    console.log(data);
}