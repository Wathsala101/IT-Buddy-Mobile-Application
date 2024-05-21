import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import AppColors from '../../config/colors';
import AppImages from '../../config/images';

export default function RadiantTopBanner({title}) {
  return (
    <View style={title == "Map View" ? styles.containerMap : styles.container}>
      <ImageBackground
        source={AppImages.topBannerContainer}
        style={{width: '100%'}}>
        <Text style={styles.text}>{title}</Text>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  containerMap: {
    backgroundColor: AppColors.secondoryBlue,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingLeft: 12,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
