import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';

export default function TopBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>IT & Technical Support</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    marginTop: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: AppColors.lightergrey,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
