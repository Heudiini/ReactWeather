import React, { useState } from "react";
import TodayInfo from "./TodayInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./css/Weather.css";
import clearImage from "./images/clear.gif";
import Clouds from "./images/dance.gif";
import outsideDay from "./images/outsideDay.gif";
import rainImage from "./images/rain.gif";
import snowImage from "./images/snow.webp";
import thundergif from "./images/thunderstorm.gif";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);

  const weatherOpinions = {
    Clear: "Wow, blue skies! Let's go out!",
    Clouds: "Few clouds, It's a great day to spend time outside!",
    Mist: "Mist, in mysterious mist we go out.",
    Smoke: "Smoke in the air, not an obligation to go out.",
    Haze: "Contrasts are best when it's a bit blurry.",
    Dust: "OpenWeather data says it's dusty, did you see any dust?",
    Fog: "Fog, you could imagine yourself in London.",
    Sand: "Open data informs about sand. Is it even safe to go outside?",
    Ash: "It's ashy weather according to OpenWeather data.",
    Squal: "It's squalid weather? What does that even mean?",
    Tornado: "Tornado, why would you even ask if you should go outside?",
    Snow: "Imagine if you were in Lapland with all other reindeers.",
    Rain: "Even snow would be better, who likes rain?",
    Drizzle: "This is way more serious than normal rain.",
    Thunderstorm: "Do I have to agree to stay inside?",
  };

  const imageMapping = {
    Clear: clearImage,
    Clouds: Clouds,
    Mist: outsideDay,
    Smoke: outsideDay,
    Haze: outsideDay,
    Dust: rainImage,
    Fog: rainImage,
    Sand: rainImage,
    Ash: rainImage,
    Squal: thundergif,
    Tornado: thundergif,
    Snow: snowImage,
    Rain: rainImage,
    Drizzle: rainImage,
    Thunderstorm: thundergif,
  };

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      weatherSituation: response.data.weather[0].main,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    searchData();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function searchData() {
    const apiKey = "cf35cd803ef0202f5f034abcff722764";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="row Weather">
        <form onSubmit={handleSubmit} className="form-inline">
          <input
            className="form-control form-control-sm"
            type="text"
            placeholder="Your Town?"
            onChange={handleCityChange}
            aria-label="Search"
          />
          <button type="submit" className="searchBtn">
            Search
          </button>
        </form>
        <div className="col-lg-8">
          <div className="row">
            <div>
              <TodayInfo data={weatherData} />
              <div
                className="containerApp"
                style={{
                  backgroundSize: "cover",
                  backgroundImage: `url(${
                    imageMapping[weatherData.weatherSituation]
                  })`,
                }}
              >
                <div className="giphyDiv">
                  <iframe
                    title="Embedded gif of weather"
                    className="giphy"
                  ></iframe>
                </div>
              </div>
              <p className="opinions">
                {weatherOpinions[weatherData.weatherSituation]}
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <WeatherForecast coordinates={weatherData.coordinates} />
        </div>
      </div>
    );
  } else {
    searchData();
    return "Loading...";
  }
}
