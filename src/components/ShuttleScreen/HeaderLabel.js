import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import AppColors from '../../config/colors';

export default function HeaderLabel() {
  return (
    <View
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <View>
        <Text style={{color: AppColors.lightergrey}}>Shuttle Route</Text>
      </View>
      <View>
        <Text style={{marginLeft: 40, color: AppColors.lightergrey}}>Ride</Text>
      </View>
      <View>
        <Text style={{color: AppColors.lightergrey}}>Amount(LKR)</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
