import React, {useState, useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeTab from './../../screens/homeTabScreens/HomeTab';
import ServicesTab from '../../screens/homeTabScreens/ServicesTab';
import StudyTab from './../../screens/homeTabScreens/StudyTab';

import AppColors from '../../config/colors';
import MainHeaderLeft from './../layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from './../layout/mainHeaderRight/MainHeaderRight';
import {AppAuthContext} from '../../context/app/AppAuthContext';

const Tab = createBottomTabNavigator();

export default function HomeScreenTabNavigator({navigation}) {
  const [currentRoute, setCurrentRoute] = useState('Home');
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);

  return (
    <Tab.Navigator
      options={{headerShown: true}}
      screenOptions={() => ({
        tabBarActiveTintColor: AppColors.primaryBlue,
        tabBarInactiveTintColor: AppColors.primarygrey,
        headerTitle: '',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        listeners={{
          tabPress: () => {
            setCurrentRoute('Home');
          },
        }}
        options={{
          tabBarIcon: () => (
            <MaterialIcon
              name="home-minus-outline"
              color={
                currentRoute === 'Home'
                  ? AppColors.primaryBlue
                  : AppColors.primarygrey
              }
              size={26}
            />
          ),
          headerStyle: {
            backgroundColor: AppColors.white,
          },
          headerLeft: () => <MainHeaderLeft navigation={navigation} />,
          headerRight: () => <MainHeaderRight navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name={AppAuthState.isStaff ? 'Work' : 'Study'}
        component={StudyTab}
        listeners={{
          tabPress: () => {
            setCurrentRoute('Study');
          },
        }}
        options={{
          tabBarIcon: () => (
            <FontAwesomeIcon
              name="browsers-outline"
              color={
                currentRoute === 'Study'
                  ? AppColors.primaryBlue
                  : AppColors.primarygrey
              }
              size={26}
            />
          ),
          headerStyle: {
            backgroundColor: AppColors.white,
          },
          headerLeft: () => <MainHeaderLeft navigation={navigation} />,
          headerRight: () => <MainHeaderRight navigation={navigation} />,
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesTab}
        listeners={{
          tabPress: () => {
            setCurrentRoute('Services');
          },
        }}
        options={{
          tabBarIcon: () => (
            <MaterialIcon
              name="star-circle-outline"
              color={
                currentRoute === 'Services'
                  ? AppColors.primaryBlue
                  : AppColors.primarygrey
              }
              size={26}
            />
          ),
          headerStyle: {
            backgroundColor: AppColors.white,
          },
          headerLeft: () => <MainHeaderLeft navigation={navigation} />,
          headerRight: () => <MainHeaderRight navigation={navigation} />,
        }}
      />
    </Tab.Navigator>
  );
}
