
fetchCountryData("Singapore", "sg-name", "sg-capital", "sg-latlng", "sg-region", "sg-code", "sg-flag");


fetchCountryData("France", "france-name", "france-capital", "france-latlng", "france-region", "france-code", "france-flag");

fetchCountryData("Canada", "canada-name", "canada-capital", "canada-latlng", "canada-region", "canada-code", "canada-flag");

async function fetchCountryData(countryName, nameId, capitalId, latlngId, regionId, codeId, flagId) {
    try {
        const response = await fetch(`https://restcountries.com/v2/name/${countryName}`);
        const data = await response.json();

        const countryData = data[0];

        document.getElementById(nameId).textContent = countryData.name;
        document.getElementById(capitalId).textContent = countryData.capital;
        document.getElementById(latlngId).textContent = countryData.latlng.join(", ");
        document.getElementById(regionId).textContent = countryData.region;
        document.getElementById(codeId).textContent = countryData.alpha3Code;
      
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};




