import {
  SET_STORE_REHYDRATED,
  CANCEL_ACTION,
  SET_USER_ID,
  SET_IS_RECORDING,
  SET_LOCATION_SELECTED,
  INCREMENT_COUNT,
  RESET_COUNT,
} from './types';
import {v4 as uuidv4} from 'uuid';
import store from '../store';

export function setStoreRehydrated() {
  return {type: SET_STORE_REHYDRATED, payload: true};
}
export function generateUID() {
  if (store?.getState()?.globalReducer?.uuid) return {type: CANCEL_ACTION};
  return {type: SET_USER_ID, payload: uuidv4()};
}
export function setIsRecording(bool) {
  return {type: SET_IS_RECORDING, payload: bool};
}
export function setLocationSelected(location) {
  return {type: SET_LOCATION_SELECTED, payload: location};
}
export function incrementCount() {
  return {type: INCREMENT_COUNT};
}
export function resetCount() {
  return {type: RESET_COUNT};
}
