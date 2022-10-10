let currentUnit = "celsius"
let currentResponse;
let currentTemperature = document.querySelector(
    "#temperature-container .temperature"
);
let celsiusButton = document.querySelector(
    "#temperature-container .units .celsius"
);
let fahrenheitButton = document.querySelector(
    "#temperature-container .units .fahrenheit"
);
let mainIcon = document.querySelector(".main-icon")

function formatTime(date) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }
    return `${day} ${hour}:${minute}`;
}

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = formatTime(new Date());

function displayWeather(response) {
    currentResponse = response;
    console.log(response);
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

    let currentDescription = document.querySelector("#description");
    currentDescription.innerHTML = `${response.data.weather[0].main}`;

    refreshTemperature();

    let currentHumidity = document.querySelector("#current-humidity");
    currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;

    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/hr`;

    let weatherIcon = response.data.weather[0].icon;
    let weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    mainIcon.src = weatherIconUrl;
}

function refreshTemperature() {
    if (currentUnit === "celsius") {
        currentTemperature.innerHTML = `${Math.round(currentResponse.data.main.temp)}`;
    } else {
        currentTemperature.innerHTML = `${Math.round(currentResponse.data.main.temp * 9 / 5 + 32)}`;
    }
}

let apiKey = "c1927e1ed9f92e3ca4b232753a36e5df";

function queryWeatherByCityName(city) {
    console.log(city);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(url).then(displayWeather);
}

function searchCity(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    queryWeatherByCityName(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showTemperatureCelsius(event) {
    event.preventDefault();
    fahrenheitButton.classList.remove("active");
    celsiusButton.classList.add("active");
    currentUnit = "celsius";
    refreshTemperature();
}

function showTemperatureFahrenheit(event) {
    event.preventDefault();
    celsiusButton.classList.remove("active");
    fahrenheitButton.classList.add("active");
    currentUnit = "fahrenheit";
    refreshTemperature();
}

celsiusButton.addEventListener("click", showTemperatureCelsius);
fahrenheitButton.addEventListener("click", showTemperatureFahrenheit);

document
    .querySelector("div.cities .dnipro")
    .addEventListener("click", function () {
        queryWeatherByCityName("dnipro");
    });

document
    .querySelector("div.cities .kharkiv")
    .addEventListener("click", function () {
        queryWeatherByCityName("kharkiv");
    });

document
    .querySelector("div.cities .odesa")
    .addEventListener("click", function () {
        queryWeatherByCityName("odesa");
    });

document
    .querySelector("div.cities .lviv")
    .addEventListener("click", function () {
        queryWeatherByCityName("lviv");
    });

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(displayWeather);
}

function showCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentLocation);
