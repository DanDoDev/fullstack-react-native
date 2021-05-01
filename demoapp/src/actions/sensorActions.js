import {SET_SENSOR_ITEM} from './types';

export function setSensorItem(itemId, data) {
  return {type: SET_SENSOR_ITEM, payload: {itemId, data}};
}
