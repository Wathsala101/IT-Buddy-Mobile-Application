import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';

export default function BannerWithIcon({title, icon}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Icon name={icon} size={30} color={AppColors.black} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: AppColors.lightergrey,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
