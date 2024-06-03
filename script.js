// script.js

const apiKey = '7959791d03bcf6ca1f7621559436e54a'; 

document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}

function displayWeatherData(data) {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const conditionsElement = document.getElementById('conditions');
    const weatherDataElement = document.getElementById('weatherData');

    if (!data.name || !data.sys || !data.sys.country) {
        locationElement.textContent = 'Location data not available';
    } else {
        locationElement.textContent = `${data.name}, ${data.sys.country}`;
    }

    if (!data.main || typeof data.main.temp !== 'number') {
        temperatureElement.textContent = 'Temperature data not available';
    } else {
        temperatureElement.textContent = `Temperature: ${data.main.temp.toFixed(1)} °C`;
    }

    if (!data.weather || !data.weather[0] || !data.weather[0].description) {
        conditionsElement.textContent = 'Conditions data not available';
    } else {
        conditionsElement.textContent = `Conditions: ${data.weather[0].description}`;
    }

    weatherDataElement.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherDataByCoords(latitude, longitude);
        });
    }
});

function fetchWeatherDataByCoords(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data: ' + error.message);
        });
}
