// handler.js
const axios = require("axios");

// Replace with your own API keys
const OPEN_WEATHER_KEY = process.env.OPEN_WEATHER_KEY;
const MAPS_KEY = process.env.MAPS_KEY;

module.exports = async function handler(req, res) {
  try {
    // Get the location from the request body
    const { location } = req.body;

    // Validate the location
    if (!location) {
      return res.status(400).json({ error: { code: 400, message: "Invalid location" } });
    }

    // Get the latitude and longitude of the location using Google Maps API
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${MAPS_KEY}`;
    const geocodeRes = await axios.get(geocodeUrl);
    const { results, status } = geocodeRes.data;

    // Check if the geocoding was successful
    if (status !== "OK" || results.length === 0) {
      return res.status(400).json({ error: { code: 400, message: "Invalid location" } });
    }

    // Get the first result and extract the coordinates
    const { geometry } = results[0];
    const { lat, lng } = geometry.location;

    // Get the current weather data using OpenWeather API
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${OPEN_WEATHER_KEY}`;
    const weatherRes = await axios.get(weatherUrl);
    const { weather, main, name } = weatherRes.data;

    // Format the weather data
    const condition = weather[0].main;
    const temperature = main.temp;
    const weatherText = `The weather in ${name} is ${condition} with ${temperature}°C`;

    // Return the weather data as the output
    return res.status(200).json({ output: { weather: weatherText } });
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
    return res.status(500).json({ error: { code: 500, message: "Internal server error" } });
  }
};
