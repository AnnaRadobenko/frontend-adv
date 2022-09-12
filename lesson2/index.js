const getElement = (id) => document.getElementById(id);

const humidity = getElement('current-humidity');
const pressure = getElement('current-pressure');
const temperature = getElement('current-temperature');
const windSpeed = getElement('current-wind-speed');
const summury = getElement('weather-summury');
const getWeatherButton = getElement('getWeather');
const cityWeather = getElement('city-weather');
const submit = getElement('ok');
const err = getElement('error');
const all = getElement('weather');
const spinner = getElement('spinner');

const getCurrentLocation = () => {
    spinner.style.display = "block";
    if(navigator.geolocation) {
        err.style.display = "none"
        navigator.geolocation.getCurrentPosition((position) => {
        getGeoData(position.coords.latitude, position.coords.longitude);})
    }
    else {
        alert('No geolocation API in your browser')
    }
}

const getGeoData = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8c4945c53d8a7c7f632641ba54980d37`)
    .then(response => response.json())
    .then(data => displayGeoData(data))
    .catch(error => {
        console.log(error);
    })
};

const getInputValue = () => {
    spinner.style.display = "block";
    getCityWeather(cityWeather.value)
}

const getCityWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8c4945c53d8a7c7f632641ba54980d37`)
    .then(response => response.json())
    .then(data => displayGeoData(data))
    .catch(error => {
        err.style.display = "block";
        cityWeather.value = "";
    })
};

const displayGeoData = (data) => {
    spinner.style.display = "none";
    humidity.innerText = `Humidity: ${data.main.humidity} %`;
    pressure.innerText = `Pressure: ${data.main.pressure} hPa`;
    temperature.innerText = `Temperature: ${fromKelvintoCelsius(data.main.temp)} °C`;
    windSpeed.innerText = `Wind speed: ${data.wind.speed} m/s`;
    summury.innerText = `Summury: ${data.weather[0].main}`;
    all.style.backgroundImage = `url(${data.weather[0].main}.png)`
};

const fromKelvintoCelsius = (v) => {
    return Math.round(v - 273.15);
}
getWeatherButton.addEventListener('click', getCurrentLocation);
submit.addEventListener('click', getInputValue);
cityWeather.addEventListener('keyup', function(){
    err.style.display = "none"
})
