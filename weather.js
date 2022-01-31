//READ ABOUT E TARGET
//saving cities after page reload
//DATE
//MAKE EVERYTHING INSIDE OBJECTS
//what is preventDefault
//подбирал бы фоновую картинку города С НУЖНОЙ ПОГОДОЙ
//local storage  с несколькими городами
//[...locations] WTF IS THIS

import { UI } from "./UI.js";
import {
  sendWeatherRequest,
  sendForecastRequest,
  addCity,
} from "./weatherRender.js";
import { loadStorage } from "./storage.js";

loadStorage();

UI.ALWAYS_ON_DISPLAY.searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sendForecastRequest(UI.ALWAYS_ON_DISPLAY.searchedCity.value);
  sendWeatherRequest(UI.ALWAYS_ON_DISPLAY.searchedCity.value);
});

UI.CURRENT.addCityBtn.addEventListener("click", addCity);
