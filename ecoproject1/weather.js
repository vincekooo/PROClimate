// Weather API configuration
const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const API_URL = 'https://api.openweathermap.org/data/2.5/';

// Initialize weather data
const weatherData = {
    current: {
        temp: 25,
        description: 'Солнечно',
        wind: 5,
        humidity: 65,
        clouds: 20,
        uvIndex: 3,
        city: 'Бишкек'
    },
    forecast: [
        { day: 'Понедельник', temp: 26, icon: 'sun' },
        { day: 'Вторник', temp: 27, icon: 'cloud-sun' },
        { day: 'Среда', temp: 28, icon: 'cloud' },
        { day: 'Четверг', temp: 29, icon: 'cloud-rain' },
        { day: 'Пятница', temp: 27, icon: 'cloud-sun' }
    ]
};

// Update weather display
function updateWeatherDisplay() {
    // Update current weather
    document.getElementById('temperature').textContent = `${weatherData.current.temp}°C`;
    document.getElementById('weatherDescription').textContent = weatherData.current.description;
    document.getElementById('location').textContent = weatherData.current.city;

    // Update weather details
    document.querySelector('.detail-item:nth-child(1) span').textContent = `Ветер: ${weatherData.current.wind} м/с`;
    document.querySelector('.detail-item:nth-child(2) span').textContent = `Влажность: ${weatherData.current.humidity}%`;
    document.querySelector('.detail-item:nth-child(3) span').textContent = `Облачность: ${weatherData.current.clouds}%`;
    document.querySelector('.detail-item:nth-child(4) span').textContent = `УФ-индекс: ${weatherData.current.uvIndex}`;

    // Update forecast
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = weatherData.forecast.map(day => `
        <div class="forecast-item">
            <h4>${day.day}</h4>
            <i class="fas fa-${day.icon} fa-2x"></i>
            <p>${day.temp}°C</p>
        </div>
    `).join('');
}

// Fetch weather data from API
async function fetchWeatherData() {
    try {
        const response = await fetch(`${API_URL}weather?q=Bishkek&appid=${API_KEY}&units=metric&lang=ru`);
        const data = await response.json();
        
        // Update weather data with real data
        weatherData.current.temp = Math.round(data.main.temp);
        weatherData.current.description = data.weather[0].description;
        weatherData.current.wind = Math.round(data.wind.speed);
        weatherData.current.humidity = data.main.humidity;
        weatherData.current.clouds = data.clouds.all;
        
        // Update display
        updateWeatherDisplay();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Initialize
function init() {
    // Update display with initial data
    updateWeatherDisplay();
    
    // Fetch real weather data
    fetchWeatherData();
    
    // Update every hour
    setInterval(fetchWeatherData, 3600000);
}

// Start the application
document.addEventListener('DOMContentLoaded', init);
