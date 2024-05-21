import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DetailLabelWithIcon from './DetailLabelWithIcon';

export default function ContactDetails({title, email, telephone}) {
  return (
    <>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        <DetailLabelWithIcon label={email} icon={'envelope-o'} />
        <View style={styles.divider}></View>
        <DetailLabelWithIcon label={telephone} icon={'phone'} />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 15,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  divider: {
    width: 20,
  },
});
