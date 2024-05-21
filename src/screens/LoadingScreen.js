import React from 'react';
import {Text, View, ImageBackground, StyleSheet} from 'react-native';
import CommonButton from "./../components/common/CommonButton";
import AppColors from '../config/colors';
import * as Animatable from 'react-native-animatable';

export default LoadingScreen = () => {
  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('./../../src/assets/images/splash_Screen.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: "blue", flex: 1}}>
        </View>
        <View style={{backgroundColor: "transparent", flex: 12, padding: 10}}>
          <Text style={{fontSize: 45, fontWeight: "bold", color: "blue"}}>ITbuddy</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
});
