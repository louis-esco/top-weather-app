function getForecast(location) {
  async function fetchForecast(location) {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=06dc5f01de824b5db7084207242905&q=${location}&days=4`
    );
    const forecast = await response.json();

    return forecast;
  }

  async function processForecast(location) {
    const fullForecast = await fetchForecast(location);

    const shortForecast = {
      current: {
        temp_c: fullForecast.current.temp_c,
        condition: fullForecast.current.condition.text,
        wind_dir: fullForecast.current.wind_dir,
        wind_kph: fullForecast.current.wind_kph,
      },
      forecastday: {
        d1: {
          date: fullForecast.forecast.forecastday[1].date,
          condition: fullForecast.forecast.forecastday[1].day.condition.text,
          maxtemp_c: fullForecast.forecast.forecastday[1].day.maxtemp_c,
          mintemp_c: fullForecast.forecast.forecastday[1].day.mintemp_c,
        },
        d2: {
          date: fullForecast.forecast.forecastday[2].date,
          condition: fullForecast.forecast.forecastday[2].day.condition.text,
          maxtemp_c: fullForecast.forecast.forecastday[2].day.maxtemp_c,
          mintemp_c: fullForecast.forecast.forecastday[2].day.mintemp_c,
        },
        d3: {
          date: fullForecast.forecast.forecastday[3].date,
          condition: fullForecast.forecast.forecastday[3].day.condition.text,
          maxtemp_c: fullForecast.forecast.forecastday[3].day.maxtemp_c,
          mintemp_c: fullForecast.forecast.forecastday[3].day.mintemp_c,
        },
      },
      location: {
        city: fullForecast.location.name,
        country: fullForecast.location.country,
        localTime: fullForecast.location.localtime,
      },
    };

    return shortForecast;
  }

  return processForecast(location);
}

function screenController() {
  const searchInput = document.querySelector(".searchInput");
  const searchBtn = document.querySelector(".searchBtn");

  const dTemp = document.querySelector(".d .weatherTemp span");
  const d1Temp = document.querySelector(".d1 .weatherTemp span");
  const d2Temp = document.querySelector(".d2 .weatherTemp span");
  const d3Temp = document.querySelector(".d3 .weatherTemp span");

  const dCondition = document.querySelector(".d .weatherCondition span");
  const d1Condition = document.querySelector(".d1 .weatherCondition span");
  const d2Condition = document.querySelector(".d2 .weatherCondition span");
  const d3Condition = document.querySelector(".d3 .weatherCondition span");

  async function displayForecast() {
    const inputCity = searchInput.value;
    const forecast = await getForecast(inputCity);
    console.log(forecast);

    dTemp.textContent = forecast.current.temp_c;
    d1Temp.textContent = forecast.forecastday.d1.maxtemp_c;
    d2Temp.textContent = forecast.forecastday.d2.maxtemp_c;
    d3Temp.textContent = forecast.forecastday.d3.maxtemp_c;

    dCondition.textContent = forecast.current.condition;
    d1Condition.textContent = forecast.forecastday.d1.condition;
    d2Condition.textContent = forecast.forecastday.d2.condition;
    d3Condition.textContent = forecast.forecastday.d3.condition;
  }

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayForecast();
    searchInput.value = "";
  });
}

screenController();
