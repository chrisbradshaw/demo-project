import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext, NavigationProvider } from './context/navigation';
import { QuizContext, QuizProvider, QUIZ_ACTIONS } from './context/quiz';
import { transformQuestionsData } from './context/quiz/selectors';
import LoadingSpinner from './components/LoadingSpinner';
import { Steps } from './components/Steps';
import { Pages } from './components/Pages';
import { DFPSlotsProvider } from 'react-dfp';
import { Ad } from './components/Ad';
import axios from 'axios';
import './styles.scss';

export default function App() {
  return (
    <DFPSlotsProvider
      dfpNetworkId="21835225003"
      adUnit="TradeRVs/search"
      singleRequest={false}
      collapseEmptyDivs
    >
      <NavigationProvider>
        <QuizProvider>
          <Ad />
          <Quiz />
        </QuizProvider>
      </NavigationProvider>
    </DFPSlotsProvider>
  );
}

function Quiz() {
  const { navigationState } = useContext(NavigationContext);
  const { quizState, quizDispatch } = useContext(QuizContext);
  const { questions } = quizState;
  const { currentPage } = navigationState;
  const [asyncErrors, setAsyncErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (questions && questions.length === 0) {
      const getQuestions = async () => {
        let response = await axios.get('https://opentdb.com/api.php?amount=10');
        if (response.status === 200) {
          quizDispatch({
            type: QUIZ_ACTIONS.success,
            data: transformQuestionsData(response.data.results),
          });
        }
        setIsLoading(false);
        setAsyncErrors(false);
      };
      try {
        getQuestions();
      } catch (error) {
        setIsLoading(false);
        setAsyncErrors(true);
      }
    }
  }, [quizDispatch, questions]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Pages {...{ currentPage, asyncErrors }}>
            <Steps
              {...{
                questions,
              }}
            />
          </Pages>
        </div>
      )}
    </>
  );
}
