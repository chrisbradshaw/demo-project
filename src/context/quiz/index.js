import { useReducer, createContext } from 'react';

// Quiz component using useReducer
export const QUIZ_ACTIONS = {
  callApi: 'CALL_API',
  success: 'SUCCESS',
  error: 'ERROR',
  captureUserName: 'CAPTURE_USER_NAME',
  correctAnswer: 'CORRECT_ANSWER',
  incorrectAnswer: 'INCORRECT_ANSWER',
  resetQuiz: 'RESET_QUIZ',
};

const initialState = {
  userName: '',
  loading: false,
  error: null,
  questions: [],
  stats: {
    questionsAsked: 0,
    correct: 0,
    correctStreak: 0,
    currentTime: null,
    averageResponseTime: 0,
    currentQuestion: 1,
  },
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case QUIZ_ACTIONS.callApi: {
      return {
        ...state,
        loading: true,
      };
    }
    case QUIZ_ACTIONS.success: {
      return {
        ...state,
        loading: false,
        questions: [...action.data],
      };
    }
    case QUIZ_ACTIONS.error: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case QUIZ_ACTIONS.correctAnswer: {
      return {
        ...state,
        stats: {
          ...state.stats,
          questionsAsked: state.stats.questionsAsked + 1,
          correct: state.stats.correct + 1,
          correctStreak: state.stats.correctStreak + 1,
          currentQuestion: Math.min(state.stats.currentQuestion + 1, 9),
        },
      };
    }
    case QUIZ_ACTIONS.incorrectAnswer: {
      return {
        ...state,
        stats: {
          ...state.stats,
          questionsAsked: state.stats.questionsAsked + 1,
          correctStreak: 0,
          currentQuestion: Math.min(state.stats.currentQuestion + 1, 9),
        },
      };
    }
    case QUIZ_ACTIONS.resetQuiz: {
      return {
        ...state,
        loading: true,
        questions: [],
        stats: {
          questionsAsked: 0,
          correct: 0,
          correctStreak: 0,
          currentTime: null,
          averageResponseTime: 0,
          currentQuestion: 1,
        },
      };
    }
    case QUIZ_ACTIONS.captureUserName: {
      return {
        ...state,
        userName: action.userName,
      };
    }

    default: {
      return state;
    }
  }
};

export const QuizContext = createContext({
  quizState: null,
  quizDispatch: null,
});

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ quizState: state, quizDispatch: dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
