import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';

export default MainHeaderRight = ({navigation}) => {
  return (
    <View flexDirection="row" alignItems="center">
      <Icon.Button
        name="person-circle-outline"
        size={25}
        color={AppColors.black}
        backgroundColor={AppColors.white}
        onPress={() => {}}
      />
    </View>
  );
};




