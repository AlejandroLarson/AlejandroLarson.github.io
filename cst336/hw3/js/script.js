// event listeners
document.querySelector("#weather-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // preventing page reload since we don't want to change pages anyways

    const city = document.getElementById("city-input").value.trim(); // User input

    // reset warning
    document.getElementById("searchError").innerHTML = "";

    if (!validateForm(city)) {
        return;
    }
    
    const weatherData = await getWeather(city);
    
    if (weatherData) {
        displayWeather(weatherData);
    }
    
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
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=imperial`;
    
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

    // make data container visible
    document.querySelector(".weather-data-container").style.display = "block";

    // city
    document.querySelector("#city-name").textContent = data.name;

    // icon
    iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    document.querySelector("#icon-container").innerHTML = `<img src="${iconURL}" alt="weather icon" width="200" height="200">`;

    // current temp
    let temp = data.main.temp;
    let tempRounded = Math.round(temp);
    document.querySelector("#current-temperature").innerHTML = `${tempRounded}°F`;

    // weather description
    let description = data.weather[0].main;
    document.querySelector("#description").innerHTML = `${description}`;

    // temp high and low
    let tempHigh = data.main.temp_max
    let tempHighRounded = Math.round(tempHigh);
    let tempLow = data.main.temp_min
    let tempLowRounded = Math.round(tempLow);

    document.querySelector(".tempspan.high").innerHTML = `H: ${tempHighRounded}°F`;
    document.querySelector(".tempspan.low").innerHTML = `L: ${tempLowRounded}°F`;

    // humidity
    let humidity = data.main.humidity;
    document.querySelector("#humidity").innerHTML = `Humidity: ${humidity}%`;
}