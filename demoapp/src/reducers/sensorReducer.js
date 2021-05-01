import {SET_SENSOR_ITEM} from '../actions/types';

const INITIAL_STATE = {
  sensorData: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SENSOR_ITEM:
      return {
        ...state,
        sensorData: {
          ...state.sensorData,
          [action.payload.itemId]: action.payload.data,
        },
      };

    default:
      return state;
  }
};
