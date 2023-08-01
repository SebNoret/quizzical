async function fetchQuestions() {
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=15");
    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error on API call ", error);
  }
}

export { fetchQuestions };
