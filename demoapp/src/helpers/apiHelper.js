import store from '../store';
import * as queryHelper from './queryHelper';
import {
  accelerometer,
  gyroscope,
  barometer,
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
  h,
} from 'react-native-sensors';
import {
  setIsRecording,
  incrementCount,
  resetCount,
} from 'src/actions/globalActions';
import {setSensorItem} from 'src/actions/sensorActions';

let recordingInterval = null;

export async function queryForPlace(placeString) {
  // Location of the user can be grabbed here and passed in to fetchPlace()
  const hardCodedLocation = {lat: '43.6532', long: '79.3832'};
  return queryHelper
    .fetchPlace(placeString, hardCodedLocation)
    .then(res => {
      if (!res?.results) throw new Error('Err');
      return res.results;
    })
    .catch(err => {
      throw new Error(err);
    });
}
export async function toggleRecording() {
  if (store.getState()?.globalReducer?.isRecording) stopRecording();
  else startRecording();
}

export const stopRecording = () => {
  store.dispatch(setIsRecording(false));
  console.log(recordingInterval);
  clearInterval(recordingInterval);
};
export const startRecording = () => {
  store.dispatch(setIsRecording(true));
  store.dispatch(resetCount());
  clearInterval(recordingInterval);
  recordingInterval = setInterval(() => {
    const isRecording = store.getState().globalReducer?.isRecording;
    if (!isRecording) return clearInterval(recordingInterval);
    const latestData = store.getState().sensorReducer?.sensorData;
    const locationSelected = store.getState().globalReducer?.locationSelected;
    const uuid = store.getState().globalReducer?.uuid;
    if (!latestData || !locationSelected) return;
    store.dispatch(incrementCount());
    queryHelper.sendRecording(latestData, locationSelected, uuid);
  }, 2000);
};
export async function startRecordingSensors() {
  setUpdateIntervalForType(SensorTypes.accelerometer, 1500); // defaults to 100ms

  accelerometer.subscribe(
    data => store.dispatch(setSensorItem(sensorIds.accelerometer, data)),
    err => console.log('Sensor not available'),
  );
  gyroscope.subscribe(
    data => store.dispatch(setSensorItem(sensorIds.gyroscope, data)),
    err => console.log('Sensor not available'),
  );
  magnetometer.subscribe(
    data => store.dispatch(setSensorItem(sensorIds.magnetometer, data)),
    err => console.log('Sensor not available'),
  );
  barometer.subscribe(
    data => store.dispatch(setSensorItem(sensorIds.barometer, data)),
    err => console.log('Sensor not available'),
  );
}

const sensorIds = {
  accelerometer: 'accelerometer',
  gyroscope: 'gyroscope',
  magnetometer: 'magnetometer',
  barometer: 'barometer',
};
