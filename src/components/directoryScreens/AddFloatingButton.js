import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';

export default function AddFloatingButton({
  backgroundColor = AppColors.primaryBlue,
  textColor = AppColors.white,
}) {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: backgroundColor,
        elevation: 5,
      }}>
      <Text style={{color: textColor, fontSize: 30}}>+</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
