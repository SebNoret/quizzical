async function fetchQuestions() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
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

export { fetchQuestions };
