export const UI = {
  ALWAYS_ON_DISPLAY: {
    searchBtn: document.querySelector(".search"),
    searchedCity: document.querySelector(".input"),
  },

  CURRENT: {
    temperature: document.querySelector(".temperature"),
    imgweathericon: document.querySelector(".imgweathericon"),
    city: document.querySelector(".cityName"),
    addCityBtn: document.querySelector(".addCity"),
  },

  DETAILS: {
    city: document.querySelector(".citydetail"),
    temp: document.querySelector(".detailtemperature"),
    feelslike: document.querySelector(".feelslike"),
    weather: document.querySelector(".detailsweather"),
    sunRise: document.querySelector(".sunrise"),
    sunSet: document.querySelector(".sunset"),
  },

  FORECAST: {
    city: document.querySelector(".forecastcity"),
    date: document.querySelector(".date1"),
    forecastScrollBox: document.querySelector(".forecastscrollbox"),
  },
};
