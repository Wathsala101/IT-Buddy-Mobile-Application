import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';

export default function NumberTag({number}) {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 100,
        backgroundColor: AppColors.primaryBlue,
        elevation: 5,
        position: "absolute",
        top: 5
      }}>
      <Text style={{color: AppColors.white, fontSize: 15}}>{number+1}</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
