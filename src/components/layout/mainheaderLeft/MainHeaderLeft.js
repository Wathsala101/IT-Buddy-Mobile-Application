import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppColors from '../../../config/colors';

export default MainHeaderLeft = ({navigation}) => {
  return (
    <View flexDirection="row" alignItems="center">
      <Icon.Button
        name="menu"
        color={AppColors.black}
        size={25}
        backgroundColor={AppColors.white}
        onPress={() => {
          navigation.toggleDrawer();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageLogo: {
    width: 80,
    height: 24,
  },
});
