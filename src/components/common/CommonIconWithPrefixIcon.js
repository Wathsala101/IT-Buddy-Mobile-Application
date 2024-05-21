import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import CommonTextInput from './CommonTextInput';

export default function CommonIconWithPrefixIcon({
  icon,
  placeholder,
  onChangeText = () => {},
}) {
  return (
    <View style={styles.container}>
      <Icon
        name={icon}
        size={30}
        color={AppColors.black}
        style={{flex: 1, marginRight: 10}}
      />
      <View style={styles.verticleLine}></View>
      <TextInput
        onChangeText={value => {
          onChangeText(value);
        }}
        placeholder={placeholder}
        style={{flex: 10}}
        secureTextEntry={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingTop: 13,
    paddingBottom: 13,
    backgroundColor: AppColors.white,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  verticleLine: {
    height: '70%',
    width: 1,
    backgroundColor: 'grey',
    marginRight: 10,
  },
});
