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

    console.log(shortForecast);
  }

  return processForecast(location);
}

getForecast("London");
