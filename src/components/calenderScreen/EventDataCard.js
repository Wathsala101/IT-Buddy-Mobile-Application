import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';

export default function EventDataCard({selected = false, dateTime, title}) {
  return (
    <View
      style={[
        styles.container,
        selected == false
          ? {backgroundColor: AppColors.lightergrey}
          : {backgroundColor: AppColors.secondoryBlue},
      ]}>
      <Text style={styles.text}>{dateTime}</Text>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
