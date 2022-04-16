import { useReducer, useRef, createContext } from 'react';
import { PAGE } from '../constants';

const pages = [PAGE.welcome, PAGE.questions, PAGE.result];
const steps = Array.from(Array(10).keys());

export const NAVIGATION_ACTIONS = {
  next: 'NEXT',
  prev: 'PREV',
  reset: 'RESET',
  review: 'REVIEW',
};

const initialState = {
  currentPageIndex: 0,
  currentStepIndex: 0,
  completedStepIndex: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case NAVIGATION_ACTIONS.next: {
      if (pages[state.currentPageIndex] === PAGE.welcome) {
        return {
          ...state,
          currentPageIndex: 1,
        };
      }
      if (pages[state.currentPageIndex] === PAGE.questions) {
        const currentStepIndex = Math.min(steps.length, state.currentStepIndex + 1);

        return {
          ...state,
          currentStepIndex,
          completedStepIndex: Math.max(currentStepIndex, state.completedStepIndex + 1),
          currentPageIndex: currentStepIndex === steps.length - 1 ? 2 : 1,
        };
      }
      return {
        ...state,
        currentPageIndex: Math.min(state.currentPageIndex + 1, pages.length - 1),
      };
    }
    case NAVIGATION_ACTIONS.prev: {
      if (pages[state.currentPageIndex] === PAGE.questions && state.currentStepIndex !== 0) {
        return {
          ...state,
          currentStepIndex: state.currentStepIndex - 1,
        };
      }
      return {
        ...state,
        currentPageIndex: Math.max(0, state.currentPageIndex - 1),
      };
    }
    case NAVIGATION_ACTIONS.review: {
      return {
        ...state,
        currentPageIndex: 2,
      };
    }
    case NAVIGATION_ACTIONS.reset: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const NavigationContext = createContext({
  navigationState: null,
  navigationDispatch: null,
});

export const NavigationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const savedPageIndex = useRef(state.currentPageIndex);
  const currentPage = pages[Math.max(savedPageIndex.current, state.currentPageIndex)];
  const currentSteps = steps.slice(0, state.completedStepIndex + 1);
  let currentStep = steps[state.currentStepIndex];

  const pathStep = currentPage === PAGE.questions ? `/${currentStep + 1}` : '';
  window.history.pushState({}, '', `/quiz/${currentPage}${pathStep}`);

  const navigationState = {
    ...state,
    currentSteps,
    currentStep,
    currentPage,
    currentPageIndex: state.currentPageIndex,
    pathStep,
    currentStepIndex: state.currentStepIndex,
    isFirst: state.currentPageIndex === 0,
    isLast: state.currentStepIndex === steps.length - 1,
  };

  return (
    <NavigationContext.Provider value={{ navigationState, navigationDispatch: dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};
