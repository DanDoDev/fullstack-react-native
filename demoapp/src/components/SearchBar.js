import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const SearchBar = props => {
  const {placeholder, changeCallback, onSubmitEditing} = props;

  const [searchValue, setSearchValue] = useState('');

  const searchValueUpdateHandler = newSearchValue => {
    setSearchValue(newSearchValue);
    if (changeCallback) {
      changeCallback(newSearchValue);
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      <EvilIcons name={'search'} color={'#000'} size={22} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={searchValue}
        onChangeText={value => {
          searchValueUpdateHandler(value);
        }}
        onSubmitEditing={onSubmitEditing}
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholderTextColor={'#000'}
        blurOnSubmit
      />
      {searchValue !== '' && (
        <TouchableOpacity
          onPress={() => searchValueUpdateHandler('')}
          style={{
            height: '100%',
            paddingHorizontal: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <EvilIcons name={'close'} color={'#000'} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = {
  container: {
    width: '100%',
    height: 33,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 22,
    backgroundColor: '#FFF',
  },
  input: {
    paddingHorizontal: 4,
    flex: 1,
    height: '100%',
    width: '100%',
    padding: 0,
    fontSize: 11,
    color: '#000',
  },
};

export default SearchBar;
