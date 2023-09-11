const apiUrl = "http://restcountries.com/v3.1/all";

fetch(apiUrl)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Failed to fetch data");
    }
  })
  .then((data) => {
    // Find the entry for Peru (assuming it's in the API response)
    const peruData = data.find((country) => country.name.common === "Peru");

    if (peruData) {
      // Access values for Peru by their keys
      const peruName = peruData.name.common;
      const peruCapital = peruData.capital[0];
      const peruRegion = peruData.region;
      const peruCountryCode = peruData.cca2;

      // You can now use these variables as needed
      console.log("Peru Name:", peruName);
      console.log("Peru Capital:", peruCapital);
      console.log("Peru Region:", peruRegion);
      console.log("Peru Country Code:", peruCountryCode);
    } else {
      console.error("Peru data not found in the API response.");
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
