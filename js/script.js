// Weather App JavaScript

class WeatherApp {
    constructor() {
        this.currentWeatherData = {
            location: "New York",
            temperature: 22,
            condition: "Partly Cloudy",
            humidity: 65,
            windSpeed: 12,
            visibility: 10,
            pressure: 1013,
            uvIndex: 6,
            sunrise: "06:30",
            sunset: "19:45",
            feelsLike: 25
        };

        this.forecastData = [
            { date: "Today", high: 22, low: 15, condition: "Partly Cloudy", icon: "partly-cloudy" },
            { date: "Tomorrow", high: 25, low: 18, condition: "Sunny", icon: "sunny" },
            { date: "Wednesday", high: 19, low: 12, condition: "Rainy", icon: "rainy" },
            { date: "Thursday", high: 21, low: 14, condition: "Cloudy", icon: "cloudy" },
            { date: "Friday", high: 23, low: 16, condition: "Sunny", icon: "sunny" }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateDateTime();
        this.updateWeatherDisplay();
        this.updateForecastDisplay();
        
        // Update time every second
        setInterval(() => this.updateDateTime(), 1000);
    }

    bindEvents() {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        
        searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        
        // Add input animation
        searchInput.addEventListener('focus', () => {
            searchInput.parentElement.style.transform = 'scale(1.02)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchInput.parentElement.style.transform = 'scale(1)';
        });
    }

    async handleSearch(e) {
        e.preventDefault();
        
        const searchInput = document.getElementById('searchInput');
        const query = searchInput.value.trim();
        
        if (!query) return;
        
        this.showLoading();
        
        // Simulate API call with realistic delay
        setTimeout(() => {
            this.simulateWeatherData(query);
            this.hideLoading();
            this.updateWeatherDisplay();
            this.updateForecastDisplay();
            
            // Add success animation
            this.animateWeatherCard();
        }, 1500);
    }

    simulateWeatherData(location) {
        // Simulate different weather conditions based on city
        const weatherConditions = [
            { condition: "Sunny", temp: 28, icon: "sunny" },
            { condition: "Partly Cloudy", temp: 22, icon: "partly-cloudy" },
            { condition: "Cloudy", temp: 18, icon: "cloudy" },
            { condition: "Rainy", temp: 15, icon: "rainy" },
            { condition: "Stormy", temp: 12, icon: "stormy" }
        ];
        
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const baseTemp = randomWeather.temp + Math.floor(Math.random() * 10) - 5;
        
        this.currentWeatherData = {
            location: location,
            temperature: baseTemp,
            condition: randomWeather.condition,
            humidity: Math.floor(Math.random() * 40) + 40,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            visibility: Math.floor(Math.random() * 15) + 5,
            pressure: Math.floor(Math.random() * 50) + 990,
            uvIndex: Math.floor(Math.random() * 10) + 1,
            sunrise: "06:30",
            sunset: "19:45",
            feelsLike: baseTemp + Math.floor(Math.random() * 6) - 3
        };

        // Update forecast with related temperatures
        this.forecastData = this.forecastData.map((day, index) => ({
            ...day,
            high: baseTemp + Math.floor(Math.random() * 8) - 4,
            low: baseTemp - Math.floor(Math.random() * 8) - 2,
            condition: weatherConditions[Math.floor(Math.random() * weatherConditions.length)].condition
        }));
    }

    updateDateTime() {
        const now = new Date();
        
        // Update time
        const timeString = now.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
        document.getElementById('currentTime').textContent = timeString;
        
        // Update date
        const dateString = now.toLocaleDateString([], { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        document.getElementById('currentDate').textContent = dateString;
    }

    updateWeatherDisplay() {
        const data = this.currentWeatherData;
        
        // Update main weather info
        document.getElementById('locationName').textContent = data.location;
        document.getElementById('temperature').textContent = `${data.temperature}°`;
        document.getElementById('feelsLike').textContent = `${data.feelsLike}°`;
        document.getElementById('weatherCondition').textContent = data.condition;
        document.getElementById('sunrise').textContent = data.sunrise;
        document.getElementById('sunset').textContent = data.sunset;
        
        // Update weather stats
        document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('visibility').textContent = `${data.visibility} km`;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        
        // Update weather icon
        this.updateWeatherIcon(data.condition);
    }

    updateWeatherIcon(condition) {
        const iconElement = document.getElementById('mainWeatherIcon');
        const iconSVG = this.getWeatherIconSVG(condition);
        iconElement.innerHTML = iconSVG;
    }

    getWeatherIconSVG(condition) {
        const icons = {
            'Sunny': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `,
            'Partly Cloudy': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                </svg>
            `,
            'Cloudy': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                </svg>
            `,
            'Rainy': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    <line x1="8" y1="19" x2="8" y2="21"></line>
                    <line x1="8" y1="13" x2="8" y2="15"></line>
                    <line x1="16" y1="19" x2="16" y2="21"></line>
                    <line x1="16" y1="13" x2="16" y2="15"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="12" y1="15" x2="12" y2="17"></line>
                </svg>
            `,
            'Stormy': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                    <polyline points="13,16 11,18 13,20 11,22"></polyline>
                </svg>
            `
        };
        
        return icons[condition] || icons['Sunny'];
    }

    updateForecastDisplay() {
        const forecastGrid = document.getElementById('forecastGrid');
        forecastGrid.innerHTML = '';
        
        this.forecastData.forEach((day, index) => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.style.animationDelay = `${index * 0.1}s`;
            
            forecastItem.innerHTML = `
                <div class="forecast-date">${day.date}</div>
                <div class="forecast-icon">
                    ${this.getWeatherIconSVG(day.condition)}
                </div>
                <div class="forecast-temps">
                    <span class="forecast-high">${day.high}°</span>
                    <span class="forecast-low">${day.low}°</span>
                </div>
                <div class="forecast-condition">${day.condition}</div>
            `;
            
            // Add hover effect
            forecastItem.addEventListener('mouseenter', () => {
                forecastItem.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            forecastItem.addEventListener('mouseleave', () => {
                forecastItem.style.transform = 'translateY(0) scale(1)';
            });
            
            forecastGrid.appendChild(forecastItem);
        });
    }

    showLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const weatherCard = document.getElementById('weatherCard');
        const forecastCard = document.getElementById('forecastCard');
        
        loadingSpinner.classList.add('show');
        weatherCard.style.opacity = '0.5';
        forecastCard.style.opacity = '0.5';
        
        // Disable search button
        const searchBtn = document.getElementById('searchBtn');
        searchBtn.disabled = true;
        searchBtn.style.opacity = '0.5';
    }

    hideLoading() {
        const loadingSpinner = document.getElementById('loadingSpinner');
        const weatherCard = document.getElementById('weatherCard');
        const forecastCard = document.getElementById('forecastCard');
        
        loadingSpinner.classList.remove('show');
        weatherCard.style.opacity = '1';
        forecastCard.style.opacity = '1';
        
        // Re-enable search button
        const searchBtn = document.getElementById('searchBtn');
        searchBtn.disabled = false;
        searchBtn.style.opacity = '1';
    }

    animateWeatherCard() {
        const weatherCard = document.getElementById('weatherCard');
        const forecastCard = document.getElementById('forecastCard');
        
        // Add bounce animation
        weatherCard.style.animation = 'none';
        forecastCard.style.animation = 'none';
        
        setTimeout(() => {
            weatherCard.style.animation = 'fadeInUp 0.6s ease-out';
            forecastCard.style.animation = 'fadeInUp 0.6s ease-out 0.2s both';
        }, 10);
    }
}

// Initialize the weather app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WeatherApp();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.body;
        const speed = scrolled * 0.5;
        parallax.style.backgroundPosition = `center ${speed}px`;
    });
    
    // Add mouse move effect for cards
    const cards = document.querySelectorAll('.weather-card, .forecast-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.id === 'searchInput') {
            e.preventDefault();
            document.getElementById('searchForm').dispatchEvent(new Event('submit'));
        }
    });
    
    // Add touch gestures for mobile
    let touchStartY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // Swipe up to refresh (simulate)
        if (diff > 50) {
            const searchInput = document.getElementById('searchInput');
            if (searchInput.value) {
                document.getElementById('searchForm').dispatchEvent(new Event('submit'));
            }
        }
    });
});
