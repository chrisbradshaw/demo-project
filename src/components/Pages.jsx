import { useEffect, useState, useContext } from 'react';
import { Element, scroller } from 'react-scroll';
import { QuizContext, QUIZ_ACTIONS } from '../context/quiz';
import { NavigationContext, NAVIGATION_ACTIONS } from '../context/navigation';
import { quizPerformance } from '../utils';

import { PAGE } from '../constants';

export function Page({ page, children }) {
  const _children = Array.isArray(children) ? children : [children];
  return (
    <Element name={page} className="page element" style={{ width: `${100 * _children.length}vw` }}>
      {children}
    </Element>
  );
}

function WelcomePage({ quizDispatch, navigationDispatch }) {
  const [name, setName] = useState('');

  function welcomePageSubmitClick() {
    quizDispatch({ type: QUIZ_ACTIONS.captureUserName, userName: name });
    navigationDispatch({ type: NAVIGATION_ACTIONS.next });
  }

  return (
    <div className="welcome-wrapper">
      <div className="welcome-copy">
        <h1 className="welcome-copy__header">Welcome, what's your name?</h1>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="welcome-copy__input"
        />
        <button
          onClick={() => {
            welcomePageSubmitClick();
          }}
          className="up"
        >
          Let's go 🤘
        </button>
      </div>
    </div>
  );
}

function ReviewPage({ quizState, quizDispatch, navigationDispatch }) {
  const { stats } = quizState;
  const [performance, setPerformance] = useState({ feedback: '', correct: '', questionsAsked: '' });

  function reviewPageTryAgainClick() {
    quizDispatch({ type: QUIZ_ACTIONS.resetQuiz });
    navigationDispatch({ type: NAVIGATION_ACTIONS.reset });
  }

  useEffect(() => {
    setTimeout(() => {
      const feedback = quizPerformance(stats.correct);
      setPerformance({ feedback, correct: stats.correct, questionsAsked: stats.questionsAsked });
    }, 500);
  }, [stats.correct, stats.questionsAsked]);

  return (
    <div className="review-page-wrapper">
      <h1 className="review-page-wrapper__comment">
        <p>
          <span>{quizState.userName}</span>, {performance.feedback}
        </p>
      </h1>
      <h2 className="review-page-wrapper__questions-correct">{`${performance.correct} out of ${performance.questionsAsked} questions correct`}</h2>
      <button
        onClick={() => {
          reviewPageTryAgainClick();
        }}
        className="up"
      >
        Try again
      </button>
    </div>
  );
}

export function Pages({ currentPage, asyncErrors, children }) {
  const { quizState, quizDispatch } = useContext(QuizContext);
  const { navigationDispatch } = useContext(NavigationContext);

  useEffect(() => {
    scroller.scrollTo(currentPage, {
      delay: 100,
      smooth: true,
      horizontal: true,
      containerId: 'pages',
    });
  }, [currentPage]);

  return (
    <>
      {asyncErrors ? (
        <div>Sorry an error has occurred when loading quiz data</div>
      ) : (
        <Element id="pages" className="scroller">
          <main className="pages">
            <Page page={PAGE.welcome}>
              <WelcomePage
                quizState={quizState}
                quizDispatch={quizDispatch}
                navigationDispatch={navigationDispatch}
              />
            </Page>
            <Page page={PAGE.questions}>{children}</Page>
            <Page page={PAGE.result}>
              <ReviewPage
                quizState={quizState}
                quizDispatch={quizDispatch}
                navigationDispatch={navigationDispatch}
              />
            </Page>
          </main>
        </Element>
      )}
    </>
  );
}
