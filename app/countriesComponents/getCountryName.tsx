async function getCountryNameByCode(code: string) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${code}`);
    const data = await response.json();

    // If the response contains an error, throw it
    if (data.status) {
      throw new Error(data.message);
    }

    // Return the country name from the fetched data
    return data[0].name.common;
  } catch (error) {
    console.error("Failed to fetch country:", error);
    return null;
  }
}

// Example Usage:
getCountryNameByCode("US").then((name) => {
  console.log(name); // Output: "United States"
});
