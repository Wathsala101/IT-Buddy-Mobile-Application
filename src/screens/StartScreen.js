import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChooseSignInUp from './../screens/AuthScreens/ChooseSignInUp';
import StudentLogin from './../screens/AuthScreens/StudentLogin';
import StaffLogin from './../screens/AuthScreens/StaffLogin';
import AdminLogin from './../screens/AuthScreens/AdminLogin';
import StaffSignUp from "./../screens/AuthScreens/StaffSignUp";
import StudentSignUp from "./../screens/AuthScreens/StudentSignUp";

import {View, ImageBackground, Text, StyleSheet} from 'react-native';
import CommonButton from './../components/common/CommonButton';


const Stack = createStackNavigator();

export default function StartScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="screen1" component={InitialScreen} />
      <Stack.Screen name="screen2" component={ChooseSignInUp} />
      <Stack.Screen name="screen3" component={StudentLogin} />
      <Stack.Screen name="screen4" component={StaffLogin} />
      <Stack.Screen name="screen5" component={AdminLogin} />
      <Stack.Screen name="screen6" component={StaffSignUp} />
      <Stack.Screen name="screen7" component={StudentSignUp} />
    </Stack.Navigator>
  );
}

const InitialScreen = ({navigation}) => {
  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('./../../src/assets/images/splash_Screen.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={{backgroundColor: 'blue', flex: 1}}></View>
        <View style={{backgroundColor: 'transparent', flex: 12, padding: 10}}>
          <Text style={{fontSize: 45, fontWeight: 'bold'}}>Welcome to</Text>
          <Text style={{fontSize: 45, fontWeight: 'bold', color: 'blue'}}>
            ITbuddy
          </Text>
          <Text style={{fontSize: 15}}>Your journey to university</Text>
          <Text style={{fontSize: 15}}>Starts right here..</Text>
          <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
            <CommonButton
              text={'Let’s Get Started'}
              onPressed={() => {
                navigation.navigate('screen2');
              }}
            />
          </View>
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
