// test.js
const axios = require("axios");

// Replace with your own plugin URL
const PLUGIN_URL = "https://weather.vercel.app";

async function testPlugin(location) {
  try {
    // Send a request to the plugin with the location as the input
    const res = await axios.post(PLUGIN_URL, { location });
    const { output, error } = res.data;

    // Check if the output is valid
    if (output && output.weather) {
      console.log(`Success: ${output.weather}`);
    } else if (error) {
      console.log(`Error: ${error.code} - ${error.message}`);
    } else {
      console.log("Invalid output");
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error(error);
  }
}

// Test the plugin with some examples
testPlugin("New York");
testPlugin("Tokyo");
testPlugin("Paris");
testPlugin("Beijing");
testPlugin("Invalid");
