import {
  sendWeatherRequest,
  sendForecastRequest,
  renderStoredFavorites,
  favoriteCities,
} from "./weatherRender.js";

export const storage = {
  getCurrentCity() {
    return JSON.parse(localStorage.getItem("currentCity"));
  },
  saveCurrentCity(cityData) {
    localStorage.setItem("currentCity", JSON.stringify(cityData));
  },
  getFavoriteCities() {
    return JSON.parse(localStorage.getItem("favoriteCities"));
  },
  saveFavoriteCities(cities) {
    localStorage.setItem("favoriteCities", JSON.stringify(cities));
  },
};

export function loadStorage() {
  try {
    let storedCity = storage.getCurrentCity();
    sendWeatherRequest(storedCity);
    sendForecastRequest(storedCity);
    let storedFavorits = storage.getFavoriteCities();
    storedFavorits.forEach((item) => {
      favoriteCities.push(item);
    });
    renderStoredFavorites(storedFavorits);
  } catch {
    console.log("No stored Data to output");
  }
}
