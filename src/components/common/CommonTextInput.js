import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import AppColors from '../../config/colors';

export default function CommonTextInput({
  placeHolder,
  onChanged,
  type = 'default',
  secureTextEntry = false,
  value = '',
  multiline = false,
}) {
  const styles = StyleSheet.create({
    input: {
      height: multiline ? 150 : 50,
      width: '95%',
      borderColor: AppColors.lightergrey,
      borderWidth: 0.5,
      borderRadius: 10,
      marginBottom: 0,
      fontSize: 15,
    },
  });
  return (
    <TextInput
      style={styles.input}
      placeholder={placeHolder}
      underlineColorAndroid="transparent"
      onChangeText={value => {
        onChanged(value);
      }}
      keyboardType={type}
      secureTextEntry={secureTextEntry}
      value={value}
      multiline={multiline}
    />
  );
}
