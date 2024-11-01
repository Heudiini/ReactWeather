import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  function load() {
    let apiKey = "cf35cd803ef0202f5f034abcff722764"; // uusi API-avain
    let longitude = props.coordinates.lon;
    let latitude = props.coordinates.lat;
    let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // Oikea URL

    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(() => {
        setLoaded(false); // Asetetaan loaded false, jos virhe
      });
  }

  if (loaded) {
    return (
      <div className="WeatherForecast">
        <div className="col allDay md-6">
          {forecast.map(function (dailyForecast, index) {
            if (index < 6 && index !== 0) {
              return (
                <div className="col oneDay" key={index}>
                  <WeatherForecastDay data={dailyForecast} />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();
    return (
      <p>
        Ei säätietoja saatavilla. Palaa huomenna yrittämään viiden päivän
        ennustetta!
      </p>
    ); // Ystävällinen viesti
  }
}
