document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', fetchWeather);
    loadWeatherTips();
});

let weatherTips = {};

const loadWeatherTips = async () => {
    try {
        const response = await fetch('weather_tips.json');
        weatherTips = await response.json();
    } catch (error) {
        console.error('Error loading weather tips:', error);
    }
};

const fetchWeather = async (event) => {
    event.preventDefault();
    const city = document.getElementById('searchInput').value;
    const apiKey = 'e8c1a01a0e145bf881d30a0713fb5e7a'; // Replace with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        displayError(error.message);
    }
};

const displayWeather = (data) => {
    const displayDiv = document.getElementById('weatherDisplay');
    const weatherCondition = data.weather[0].main;

    let tip = weatherTips.tips[weatherCondition] || weatherTips.defaultTip;

    displayDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp.toFixed(2)}°C</p>
        <p>Weather: ${weatherCondition}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed.toFixed(2)}m/s</p>
        <p><strong>Tip:</strong> ${tip}</p>
    `;
};

const displayError = (message) => {
    const displayDiv = document.getElementById('weatherDisplay');
    displayDiv.innerHTML = `<p class="error-message">${message}</p>`;
};
