let weather = {
  apiKey: "5a50c686f4ddc2057855ffb4e4f5b3d6",
  fetchWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  fetchTomorrowsWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => this.displayTomorrowsWeather(data));
  },
  fetchDayAfterTomorrowsWeather: function (city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`)
      .then((response) => response.json())
      .then((data) => this.displayDayAfterTomorrowsWeather(data));
  },

  // ESKİ VERSİYON
  // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric

  // 5 GÜNLÜK İSTANBUL İÇİN
  // https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric

  displayWeather: function (data) {
    const { name } = data.city;
    const { icon, description } = data.list[0].weather[0];
    const { temp, humidity } = data.list[0].main;
    const { speed } = data.list[0].wind;
    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector(".city").innerText = `Weather in ${name}`; // City name
    document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}.png`; // Icon of the condition
    document.querySelector(".description").innerText = description; // Description of the condition
    document.querySelector(".temp").innerText = `${Math.ceil(temp)}°C`; // Temperature
    document.querySelector(".humidity").innerText = `Humidity: %${humidity}`; // Humidity
    document.querySelector(".wind").innerText = `Wind Speed: ${speed} km/h`; // Wind speed

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1920x1080/?${name}")`; // Dynamic background for cities
  },

  displayTomorrowsWeather: function (data) {
    const { icon, description } = data.list[8].weather[0];
    const { temp_max } = data.list[8].main;
    const { dt_txt } = data.list[8];
    console.log(icon, description, temp_max, dt_txt);

    document.querySelector(".tomorrow > .title").innerText = dt_txt.slice(5, 10);
    document.querySelector(".tomorrow > .icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".tomorrow > .icon").style.width = "5em";
    document.querySelector(".tomorrow > .temp_max").innerText = `${Math.ceil(temp_max)}°C`;
    document.querySelector(".tomorrow > .description").innerText = description;
  },

  displayDayAfterTomorrowsWeather: function (data) {
    const { icon, description } = data.list[16].weather[0];
    const { temp_max } = data.list[16].main;
    const { dt_txt } = data.list[16];
    console.log(icon, description, temp_max, dt_txt);

    document.querySelector(".day_after_tomorrow > .title").innerText = dt_txt.slice(5, 10);
    document.querySelector(".day_after_tomorrow > .icon").src = `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".day_after_tomorrow > .icon").style.width = "5em";
    document.querySelector(".day_after_tomorrow > .temp_max").innerText = `${Math.ceil(temp_max)}°C`;
    document.querySelector(".day_after_tomorrow > .description").innerText = description;
  },

  // Gets the text from input
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
    this.fetchTomorrowsWeather(document.querySelector(".search-bar").value);
    this.fetchDayAfterTomorrowsWeather(document.querySelector(".search-bar").value);
  },
};

// Search with button
document.querySelector(".search-button").addEventListener("click", () => {
  weather.search();
});

// Search with enter key
document.querySelector(".search-bar").addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("istanbul"); // The city that shows onload
weather.fetchTomorrowsWeather("istanbul");
weather.fetchDayAfterTomorrowsWeather("istanbul");
