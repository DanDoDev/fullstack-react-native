import axios from 'axios';
import {API_KEY, BACKEND_URL} from '@env';
import querystring from 'querystring';

export const fetchPlace = (searchQuery, location) => {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;

  const params = {
    query: searchQuery,
    location: `${location.lat},${location.long}`,
    radius: '300',
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
