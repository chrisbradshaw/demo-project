// Manipulate API Data structure and return an Answers Array
const createAnswersArray = (correct_answer, incorrect_answers) => {
  const totalAnswers = incorrect_answers.length + 1;
  const correct_answer_index = Math.floor(Math.random() * totalAnswers);
  let answersArray = [];
  for (let i = 0; i < incorrect_answers.length; i++) {
    answersArray.push({
      answer: incorrect_answers[i],
      isCorrect: false,
    });
  }
  answersArray.splice(correct_answer_index, 0, { answer: correct_answer, isCorrect: true });
  if (totalAnswers === 2) {
    // => Boolean -> Preferably always show True(1st) - False(2nd) (or Yes - No) -> sort in descending order since both "True" and "Yes" are alphabetically greater than ("False" and "No")
    answersArray.sort((a, b) => a.answer < b.answer);
  }
  return answersArray;
};

const transformQuestionsData = (results) => {
  return results.map((result) => {
    return {
      ...result,
      answers: createAnswersArray(result.correct_answer, result.incorrect_answers),
    };
  });
};

export { transformQuestionsData };
