// Description: Utility functions
// Fisher-Yates shuffle algorithm

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Convert HTML entities to characters
export function decode(str) {
  let txt = new DOMParser().parseFromString(str, "text/html");

  return txt.documentElement.textContent;
}
