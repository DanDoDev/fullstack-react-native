import axios from 'axios';
import {API_KEY, BACKEND_URL} from '@env';
import querystring from 'querystring';

export const fetchPlace = (searchQuery, location) => {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?`;

  const params = {
    input: searchQuery,
    inputtype: 'textquery',
    fields: 'formatted_address,name,place_id',
    locationbias: `circle:2000@${location.lat},${location.long}`,
    key: API_KEY,
  };

  return axios({
    method: 'GET',
    url: url + querystring.stringify(params),
  })
    .then(fetchResult => {
      if (!fetchResult?.data) {
        throw new Error('Error fetch places query!');
      }
      return fetchResult.data;
    })
    .catch(err => {
      return new Error(err);
    });
};
export const sendRecording = (data, location, uuid) => {
  return axios({
    method: 'POST',
    url: `${BACKEND_URL}/postNewData`,
    data: {
      data,
      location,
      uuid,
    },
  });
};
