// strip special characters from string
const stripString = (str) => str.replace(/[^a-zA-Z0-9 ]/g, '');

// generate random number between two numbers
const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

function quizPerformance(questionsCorrect) {
  if (questionsCorrect === 0) {
    return 'you have no knowledge of theses topics, keep practicing!';
  } else if (questionsCorrect <= 3) {
    return 'you are a little bit rusty, but you can do better! Keep practicing!';
  } else if (questionsCorrect <= 5) {
    return 'you are getting there, keep practicing!';
  } else if (questionsCorrect <= 8) {
    return 'you are doing great, keep practicing!';
  } else if (questionsCorrect <= 10) {
    return 'Wow you are a triva rockstar! ';
  }
}

export { stripString, randomIntFromInterval, quizPerformance };
