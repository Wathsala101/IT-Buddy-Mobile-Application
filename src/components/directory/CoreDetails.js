import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppColors from '../../config/colors';

export default function CoreDetails({tag}) {
  return (
    <View
      style={[
        styles.container,
        tag == 'Clubs & Societies'
          ? {
              alignContent: 'flex-end',
              alignItems: 'flex-end',
              alignSelf: 'flex-end',
            }
          : {alignContent: 'center', alignItems: 'center', alignSelf: 'center'},
      ]}>
      <View style={styles.title}>
        <Text style={{fontSize: 20}}>{tag}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
    backgroundColor: '#9ca6f7',
    padding: 20,
    width: '140%',
    marginLeft: -90,
    marginTop: 3,
    zIndex: -1,
  },
  date: {},
  dateText: {
    color: AppColors.secondoryBlue,
  },
  title: {},
  platform: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: -8,
    marginTop: 10,
  },
});
