/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {apiHelper} from 'src/helpers';

import {SearchBar} from 'src/components';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {persistStore} from 'redux-persist';
import {
  setStoreRehydrated,
  generateUID,
  setIsRecording,
  setLocationSelected,
} from 'src/actions/globalActions';
import store from 'src/store';

export default function App() {
  useEffect(() => {
    startupMethods();
  }, []);

  return (
    <Provider store={store}>
      <SingleComponentApp />
    </Provider>
  );
}

const SingleComponentApp = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [searchValue, setSearchValue] = useState('');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!searchValue || searchValue === '') return;
    apiHelper
      .queryForPlace(searchValue)
      .then(newLocations => {
        if (!Array.isArray(newLocations)) setLocations([]);
        setLocations(newLocations);
      })
      .catch(err => {});
  }, [searchValue]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#98ff98'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <LocationSelectedCard />
        <SearchBar
          placeholder={'Search'}
          style={{marginTop: 10}}
          changeCallback={searchText => setSearchValue(searchText)}
        />

        {locations.map((location, index) => (
          <LocationCard location={location} key={'locationcard' + index} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export const LocationCard = ({location}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity onPress={() => dispatch(setLocationSelected(location))}>
      <View style={locationCardStyles.container}>
        <View style={locationCardStyles.bubble}>
          <Text style={locationCardStyles.bubbleText}>
            {location?.name?.substring(0, 1)}
          </Text>
        </View>
        <View style={locationCardStyles.infoContainer}>
          <Text style={locationCardStyles.title}>{location?.name}</Text>
          <Text style={locationCardStyles.secondary}>
            {location?.formatted_address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export const LocationSelectedCard = () => {
  const isRecording = useSelector(state => state.globalReducer?.isRecording);
  const locationSelected = useSelector(
    state => state.globalReducer?.locationSelected,
  );

  useEffect(() => {
    if (isRecording) store.dispatch(setIsRecording(false));
  }, [locationSelected]);

  const recordedCount = useSelector(state => state?.globalReducer?.count);

  return (
    <>
      {locationSelected && (
        <View style={locationSelectedStyles.container}>
          <View style={locationSelectedStyles.bubble}>
            <Text style={locationSelectedStyles.bubbleText}>
              {locationSelected?.name?.substring(0, 1)}
            </Text>
          </View>
          <View style={locationSelectedStyles.infoContainer}>
            <Text style={locationSelectedStyles.title}>
              {locationSelected?.name}
            </Text>
            <Text style={locationSelectedStyles.secondary}>
              {locationSelected?.formatted_address}
            </Text>
            <Text style={locationSelectedStyles.secondary}>
              PlaceID: {locationSelected?.place_id}
            </Text>
          </View>
          <Text style={locationSelectedStyles.logCount}>
            Sent Log Count: {recordedCount}
          </Text>
          <TouchableOpacity
            onPress={() => apiHelper.toggleRecording(locationSelected)}
            style={locationSelectedStyles.btn}>
            <Text style={locationSelectedStyles.btnText}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const startupMethods = () => {
  store.dispatch(generateUID());
  store.dispatch(setIsRecording(false));
  apiHelper.startRecordingSensors();
};

const postRehydrateStartupMethods = () => {
  store.dispatch(setStoreRehydrated());
};

const locationCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  bubble: {
    height: 30,
    width: 30,
    backgroundColor: '#FF8',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  bubbleText: {
    fontSize: 18,
  },
  infoContainer: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 15,
    flexWrap: 'wrap',
  },
  secondary: {
    fontSize: 12,
    flexWrap: 'wrap',
  },
});
const locationSelectedStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#98ff98',
  },
  bubble: {
    height: 90,
    width: 90,
    backgroundColor: '#FF8',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 50,
  },
  title: {fontSize: 25, fontWeight: '500'},
  secondary: {fontSize: 12},
  infoContainer: {alignItems: 'center'},
  logCount: {
    fontSize: 18,
    marginTop: 10,
  },
  btn: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginVertical: 15,
  },
});

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#98ff98',
    paddingVertical: 50,
    paddingHorizontal: 4,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

persistStore(store, {}, postRehydrateStartupMethods);
