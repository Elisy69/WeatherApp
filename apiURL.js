export function getUrl(cityName, forecast) {
  const serverUrl = "https://api.openweathermap.org/data/2.5/";
  const apiKey = "cea33105ab58d492b62282bee4014c1f";
  return `${serverUrl}${forecast}?q=${cityName}&appid=${apiKey}&units=metric`;
}
