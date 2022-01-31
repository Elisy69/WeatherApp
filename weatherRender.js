import { getUrl } from "./apiURL.js";
import { storage } from "./storage.js";
import { convertTime, convertDate } from "./converter.js";
import { UI } from "./UI.js";

export let favoriteCities = [];

export async function sendWeatherRequest(city) {
  try {
    const weatherUrl = getUrl(city, "weather");
    const response = await fetch(weatherUrl);
    const responseData = await response.json();
    const weatherData = new WeatherData(responseData);
    renderCurrentWeather(weatherData);
    renderWeatherDetails(weatherData);
    storage.saveCurrentCity(city);
    UI.ALWAYS_ON_DISPLAY.searchedCity.value = "";
  } catch (err) {
    alert(err);
  }
}

export async function sendForecastRequest(city) {
  try {
    const forecastUrl = getUrl(city, "forecast");
    const response = await fetch(forecastUrl);
    const responseData = await response.json();
    console.log(responseData);
    renderForecast(responseData.list);
  } catch (err) {
    alert(err);
  }
}

function WeatherData(data) {
  this.city = data.name;
  this.temp = Math.round(data.main.temp);
  this.icon = data.weather[0].icon;
  this.feelslike = Math.round(data.main.feels_like);
  this.weather = data.weather[0].main;
  this.sunRise = convertTime(data.sys.sunrise);
  this.sunSet = convertTime(data.sys.sunset);
}

function getIcon(id) {
  UI.CURRENT.imgweathericon.src = `https://openweathermap.org/img/wn/${id}@4x.png`;
}

function renderWeatherDetails(weatherData) {
  for (let key in UI.DETAILS) {
    UI.DETAILS[key].textContent = weatherData[key];
  }
}

function renderCurrentWeather(weatherData) {
  UI.CURRENT.temperature.textContent = `${weatherData.temp}°`;
  UI.CURRENT.city.textContent = weatherData.city;
  UI.FORECAST.city.textContent = weatherData.city;
  getIcon(weatherData.icon);
}

function renderForecast(forecastDaysArray) {
  UI.FORECAST.forecastScrollBox.innerHTML = "";
  forecastDaysArray.slice(0, 11).forEach((item) => {
    const forecastBox = document.createElement("div");
    forecastBox.innerHTML = `
      <div class="date">${convertDate(item.dt)}</div>
      <div class="forecasttemp">Temperature: ${Math.round(
        item.main.temp
      )}°</div>
      <div class="forecastfeelslike">Feels like: ${Math.round(
        item.main.feels_like
      )}°</div> 
      <div class="forecasttime">${convertTime(item.dt)}</div>
      <div class="forecastweather">${item.weather[0].main}</div>
      <img class="forecasticon" src="https://openweathermap.org/img/wn/${
        item.weather[0].icon
      }.png" alt="">`;
    forecastBox.classList.add("forecastbox");
    document.querySelector(".forecastscrollbox").append(forecastBox);
  });
}

export function addCity() {
  const location = document.createElement("div");
  location.innerHTML = `<div class = 'addedcitytext'> ${
    document.querySelector(".cityName").textContent
  }</div> <div class='crossToDelete'>×</div>`;
  document.querySelector(".cities").prepend(location);
  location.classList.add("addedcity");

  document.querySelector(".addedcitytext").addEventListener("click", (e) => {
    sendWeatherRequest(e.target.textContent);
    sendForecastRequest(e.target.textContent);
  });

  document
    .querySelector(".crossToDelete")
    .addEventListener("click", deleteCity);

  let cityName = document.querySelector(".addedcitytext").textContent;
  favoriteCities.push(cityName);
  storage.saveFavoriteCities(favoriteCities);
  console.log(favoriteCities);
}

export function renderStoredFavorites(storedFavorits) {
  storedFavorits.forEach((item) => {
    const location = document.createElement("div");
    location.innerHTML = `<div class = 'addedcitytext'> ${item}</div> <div class='crossToDelete'>×</div>`;
    document.querySelector(".cities").prepend(location);
    location.classList.add("addedcity");

    document.querySelector(".addedcitytext").addEventListener("click", (e) => {
      sendWeatherRequest(e.target.textContent);
      sendForecastRequest(e.target.textContent);
    });
    document
      .querySelector(".crossToDelete")
      .addEventListener("click", deleteCity);
  });
}

function deleteCity() {
  const deleteCityBtn = document.querySelectorAll(".crossToDelete");
  deleteCityBtn.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentNode.remove();
      const locations = document.querySelectorAll(".addedcitytext");
      const cities = [...locations].map((item) => item.textContent);
      console.log(cities);
      storage.saveFavoriteCities(cities);
    });
  });
}
