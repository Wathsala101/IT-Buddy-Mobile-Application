import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function TextRow({title, data}) {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Text style={{fontWeight: 'bold'}}>{title} - </Text>
      <Text>{data}</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
