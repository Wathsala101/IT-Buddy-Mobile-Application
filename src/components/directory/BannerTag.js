import React from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CoreDetails from './CoreDetails';
import AppImages from '../../config/images';

export default function BannerTag({tag, image, onPressed}) {
  return (
    <TouchableWithoutFeedback onPress={onPressed}>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image style={{width: 80, height: 80}} source={image} />
        </View>
        <View style={styles.core}>
          <CoreDetails tag={tag} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    flex: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  core: {
    flex: 4,
    padding: 10,
  },
});
