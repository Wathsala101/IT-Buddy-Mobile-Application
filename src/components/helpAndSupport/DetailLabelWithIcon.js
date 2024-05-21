import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../config/colors';

export default function DetailLabelWithIcon({icon, label}) {
  return (
    <TouchableOpacity onPress={() => {
      if(icon == "phone"){
        Linking.openURL(`tel:${label}`)
      }else if(icon == "envelope-o"){
        Linking.openURL(`mailto:${label}`)
      }
    }}>
    <View style={styles.container}>
      <Icon name={icon} size={25} color={AppColors.black} />
      <View style={styles.divider}></View>
      <Text>{label}</Text>
    </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    marginRight: 5,
  },
});
