const apiUrl = "https://opentdb.com/api.php?amount=15";

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Error on API call");
    }
  } catch (error) {
    console.log("Error on API call ", error);
    throw new Error("Error on API call");
  }
}

export { fetchData };
