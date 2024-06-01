function getForecast(location) {
  async function fetchForecast(location) {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=06dc5f01de824b5db7084207242905&q=${location}&days=4`
    );

    if (response.ok) {
      const forecast = await response.json();
      return processForecast(forecast);
    } else {
      const error = await response.json();
      return ["Error", error.error.message];
    }
  }

  async function processForecast(forecast) {
    const fullForecast = forecast;

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
        region: fullForecast.location.region,
        localTime: fullForecast.location.localtime,
      },
    };

    return shortForecast;
  }

  return fetchForecast(location);
}

async function getGiphyUrl(search) {
  const giphyResponse = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=If7P99eN3FTdUKf7uPODRhhih55ywZNp&s=${search}`,
    { mode: "cors" }
  );
  const giphyData = await giphyResponse.json();

  return giphyData.data.images.original.url;
}

function screenController() {
  const searchInput = document.querySelector(".searchInput");
  const searchBtn = document.querySelector(".searchBtn");

  const city = document.querySelector(".city span");

  const dTemp = document.querySelector(".d .weatherTemp span");
  const d1Temp = document.querySelector(".d1 .weatherTemp span");
  const d2Temp = document.querySelector(".d2 .weatherTemp span");
  const d3Temp = document.querySelector(".d3 .weatherTemp span");

  const dCondition = document.querySelector(".d .weatherCondition span");
  const d1Condition = document.querySelector(".d1 .weatherCondition span");
  const d2Condition = document.querySelector(".d2 .weatherCondition span");
  const d3Condition = document.querySelector(".d3 .weatherCondition span");

  const dImg = document.querySelector(".d img");
  const d1Img = document.querySelector(".d1 img");
  const d2Img = document.querySelector(".d2 img");
  const d3Img = document.querySelector(".d3 img");

  const errorMsg = document.querySelector(".error");

  function resetDisplay() {
    errorMsg.textContent = "";

    city.textContent = "-";

    dTemp.textContent = "-";
    d1Temp.textContent = "-";
    d2Temp.textContent = "-";
    d3Temp.textContent = "-";

    dCondition.textContent = "-";
    d1Condition.textContent = "-";
    d2Condition.textContent = "-";
    d3Condition.textContent = "-";

    dImg.src = "";
    d1Img.src = "";
    d2Img.src = "";
    d3Img.src = "";
  }

  async function displayForecast() {
    resetDisplay();

    const inputCity = searchInput.value;
    const forecast = await getForecast(inputCity);

    if (forecast[0] === "Error") {
      errorMsg.textContent = forecast[1];
    } else {
      city.textContent = `${forecast.location.city}, ${forecast.location.region}, ${forecast.location.country}`;

      dTemp.textContent = forecast.current.temp_c;
      d1Temp.textContent = forecast.forecastday.d1.maxtemp_c;
      d2Temp.textContent = forecast.forecastday.d2.maxtemp_c;
      d3Temp.textContent = forecast.forecastday.d3.maxtemp_c;

      dCondition.textContent = forecast.current.condition;
      d1Condition.textContent = forecast.forecastday.d1.condition;
      d2Condition.textContent = forecast.forecastday.d2.condition;
      d3Condition.textContent = forecast.forecastday.d3.condition;

      dImg.src = await getGiphyUrl(forecast.current.condition);
      d1Img.src = await getGiphyUrl(forecast.forecastday.d1.condition);
      d2Img.src = await getGiphyUrl(forecast.forecastday.d2.condition);
      d3Img.src = await getGiphyUrl(forecast.forecastday.d3.condition);
    }
  }

  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayForecast();
    searchInput.value = "";
  });

  resetDisplay();
}

screenController();
