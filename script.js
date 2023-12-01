document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    form.addEventListener('submit', fetchWeather);
});

const fetchWeather = async (event) => {
    event.preventDefault();
    const city = document.getElementById('searchInput').value;
    const apiKey = 'e8c1a01a0e145bf881d30a0713fb5e7a'; // API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Optionally, display this error to the user
    }
};

const displayWeather = (data) => {
    const displayDiv = document.getElementById('weatherDisplay');
    displayDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed}m/s</p>
    `;
};
