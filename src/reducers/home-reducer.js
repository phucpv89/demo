import { createReducer, createActions } from 'reduxsauce';

import {
  getObjectFromLocalStorage,
  saveObjectToLocalStorage
} from '../utils/local-storage';

/* ------------- actionName & params ------------- */
const { Types, Creators } = createActions({
  setTestHome: ['testHome'],
  saveHome: [],
  asyncFunc: () => (dispatch, getState) => {
    dispatch({
      type: Types.SET_TEST_HOME,
      testHome: !getState().home.testHome
    });
    return Promise.resolve();
  }
});

export const HomeTypes = Types;
export default Creators; // list actions

/* -------------- Initial State ----------- */

export const INITIAL_STATE = getObjectFromLocalStorage('home') || {
  testHome: false
};

/* ------------- Reducers -------------- */

const setTestHome = (state, { testHome }) => ({
  ...state,
  testHome
});

const saveHome = (state) => {
  saveObjectToLocalStorage({ key: 'home', object: state });
  return state;
};
/* ----------- Hookup Reducers To Types ----------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TEST_HOME]: setTestHome,
  [Types.SAVE_HOME]: saveHome
});
