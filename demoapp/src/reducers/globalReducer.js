import {
  SET_IS_RECORDING,
  SET_STORE_REHYDRATED,
  SET_USER_ID,
  SET_LOCATION_SELECTED,
  INCREMENT_COUNT,
  RESET_COUNT,
} from '../actions/types';

const INITIAL_STATE = {
  storeRehydrated: false,
  uuid: null,
  isRecording: false,
  count: 0,
  locationSelected: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STORE_REHYDRATED:
      return {...state, storeRehydrated: true};
    case SET_USER_ID:
      return {...state, uuid: action.payload};
    case SET_IS_RECORDING:
      return {...state, isRecording: action.payload};
    case SET_LOCATION_SELECTED:
      return {...state, locationSelected: action.payload};
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case RESET_COUNT:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};
