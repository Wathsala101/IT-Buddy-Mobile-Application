import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/EvilIcons';

export default function CoreDetails({title, aurther, description}) {
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{title}</Text>
      </View>
      <View style={styles.title}>
        <Text style={{color: "grey"}}>{aurther}</Text>
        <Text>{description}</Text>
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
    color: AppColors.black,
    fontWeight: "bold"
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
