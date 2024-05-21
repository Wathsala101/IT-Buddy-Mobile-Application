import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AppColors from '../../config/colors';
import CommonTextInput from './CommonTextInput';

export default function CommonInputWithLabel({
  label,
  placeHolder,
  onChanged,
  type,
  secureTextEntry,
  value,
  multiline
}) {
  return (
    <>
      <Text style={styles.text}>{label}</Text>
      <CommonTextInput
        placeHolder={placeHolder}
        onChanged={onChanged}
        type={type}
        secureTextEntry={secureTextEntry}
        value={value}
        multiline={multiline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 15,
    marginBottom: 5,
    color: AppColors.primarygrey,
  },
});
