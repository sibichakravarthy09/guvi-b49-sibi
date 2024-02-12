document.addEventListener("DOMContentLoaded", function () {
 // Fetch data from the API
fetch("http://restcountries.com/v3.1/usa")
.then(response => response.json())
 .then(data => {
// Assuming you want to display data for the first country (USA)
 const usaData = data[0];

   // Update the HTML elements with the fetched data
document.getElementById("countryName").textContent = usaData.name.common;
 document.getElementById("capital").textContent = usaData.capital[0];
document.getElementById("latlng").textContent = usaData.latlng.join(", ");
 document.getElementById("flag").src = usaData.flags.png;
document.getElementById("region").textContent = usaData.region;

// Add an event listener to the weather button
const weatherButton = document.getElementById("weatherButton");
weatherButton.addEventListener("click", function () {
                        // You can add your weather API call here
                        // For example, display an alert with weather information
 alert("Weather information for " + usaData.name.common);
    });
     })
    .catch(error => {
     console.error("Error fetching data:", error);
     });
     });