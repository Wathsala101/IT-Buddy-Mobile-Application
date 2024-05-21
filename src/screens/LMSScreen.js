import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';

const Stack = createStackNavigator();

export default function LMSScreen({navigation}) {
  return (
    <Stack.Navigator
    screenOptions={{
      headerTintColor: AppColors.black,
      headerShown: true,
      headerTitleAlign: 'center',
      title: '',
      headerStyle: {
        backgroundColor: AppColors.white,
        elevation: 0,
      },
      headerLeft: () => <MainHeaderLeft navigation={navigation} />,
      headerRight: () => <MainHeaderRight navigation={navigation} />,
    }}>
      <Stack.Screen name="screen1" component={LMSScreen1} />
    </Stack.Navigator>
  );
}

const LMSScreen1 = () => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.white,
      }}>
      <Text>LMS Screen</Text>
    </View>
  );
};
