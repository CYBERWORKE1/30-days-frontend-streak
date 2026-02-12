const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");

const apiKey = "5deae98bb95b06ef4d186db7e31afdc2";

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherResult.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  weatherResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const icon = data.weather[0].icon;

    weatherResult.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
      <p><strong>${temp}°C</strong></p>
      <p>${desc}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind Speed: ${wind} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "<p>City not found or API error.</p>";
  }
}
