import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';

export default function FloatingButton() {
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
        backgroundColor: AppColors.white,
        elevation: 5,
      }}>
      <Text style={{color: AppColors.primaryBlue, fontSize: 30}}>+</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
