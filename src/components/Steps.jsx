import { Element, scroller } from 'react-scroll';
import React, { useEffect, useContext } from 'react';
import { QuizContext, QUIZ_ACTIONS } from '../context/quiz';
import { NavigationContext, NAVIGATION_ACTIONS } from '../context/navigation';
import { stripString } from '../utils';

export function Step({ step, isActive, answers, question, stats, correctAnswer, incorrectAnswer }) {
  return (
    <Element name={step} className="element">
      <div className={`step ${isActive ? '-active' : ''}`}>
        <div id="quiz">
          <div className="container-fluid">
            <div id="quiz-stats" className="row text-center">
              <div className="quiz-metric">
                <p>Correct Rate</p>
                <span id="rate-span" className="animated">
                  {`${stats.correct}/${stats.questionsAsked}`}
                </span>
              </div>
              <div className="quiz-metric">
                <p>Correct Streak</p>
                <span id="streak-span" className="animated">
                  {stats.correctStreak}
                </span>
              </div>
              <div className="quiz-metric">
                <p>Current Question</p>
                <span id="response-time-span" className="animated">
                  {stats.currentQuestion}
                </span>
              </div>
            </div>
          </div>
          <div className="quiz-question-container">
            <div className="row">
              <div className="">
                <p
                  id="quiz-question"
                  className="animated"
                  dangerouslySetInnerHTML={{ __html: question }}
                ></p>
                <div id="quiz-options">
                  {answers.map((answer, i) => {
                    return (
                      <button
                        id={`quiz-ans-${i}`}
                        className="btn quiz-ans-btn animated"
                        key={answer.answer}
                        onClick={() => {
                          answer.isCorrect ? correctAnswer() : incorrectAnswer();
                        }}
                        dangerouslySetInnerHTML={{ __html: answer.answer }}
                      />
                    );
                  })}
                </div>
                <div id="quiz-play-again">
                  <button id="quiz-play-again-btn" className="btn animated">
                    Play Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
}

export function Steps({ questions }) {
  const { quizState, quizDispatch } = useContext(QuizContext);
  const { navigationDispatch } = useContext(NavigationContext);
  const { stats } = quizState;

  useEffect(() => {
    if (questions && questions[stats.currentQuestion]) {
      const questionId = stripString(questions[stats.currentQuestion].question);

      scroller.scrollTo(questionId, {
        delay: 100,
        smooth: true,
        containerId: 'steps',
        isDynamic: true,
      });
    }
  }, [questions, stats.currentQuestion]);

  return (
    <Element id="steps" className="scroller">
      <div className="steps">
        {questions.map((step, i) => {
          const questionId = stripString(step.question);

          return (
            <React.Fragment key={questionId}>
              <Step
                isActive={i === stats.currentQuestion}
                step={questionId}
                key={questionId}
                correctAnswer={() => {
                  quizDispatch({ type: QUIZ_ACTIONS.correctAnswer });
                  navigationDispatch({ type: NAVIGATION_ACTIONS.next });
                }}
                incorrectAnswer={() => {
                  quizDispatch({ type: QUIZ_ACTIONS.incorrectAnswer });
                  navigationDispatch({ type: NAVIGATION_ACTIONS.next });
                }}
                {...step}
                {...quizState}
              />
            </React.Fragment>
          );
        })}
      </div>
    </Element>
  );
}
