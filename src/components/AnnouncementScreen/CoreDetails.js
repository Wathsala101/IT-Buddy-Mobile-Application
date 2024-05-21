import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function CoreDetails({date, title, platform}) {
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <View style={styles.title}>
        <Text>{title}</Text>
      </View>
      <View style={styles.platform}>
        <Icon name={'location'} size={30} color={AppColors.black} />
        <Text style={{color: AppColors.primarygrey}}>{platform}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  date: {},
  dateText: {
    color: AppColors.secondoryBlue,
  },
  title: {},
  platform: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginLeft: -8,
    marginTop:10
  },
});
