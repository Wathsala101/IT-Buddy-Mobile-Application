import React from 'react';
import {View, ScrollView, Image, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import AppImages from '../config/images';
import CommonButton from '../components/common/CommonButton';

const Stack = createStackNavigator();

export default function CoursesScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={CoursesScreen1} />
    </Stack.Navigator>
  );
}

const CoursesScreen1 = ({navigation}) => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <RadiantTopBannerAlt title="Courses" />
        <View
          style={{
            padding: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Image source={AppImages.courseraLogo} />
          <View style={{marginTop: 20}}></View>
          <CommonButton
            onPressed={async () =>  {
              await Linking.openURL("https://www.coursera.org/");
            }}
            text="ENROLL"
            buttonColor={AppColors.primaryBlue}
            textColor={AppColors.white}
            withIcon={false}
          />
          <View style={{marginTop: 30}}></View>
          <Image source={AppImages.udemyLogo} />
          <View style={{marginTop: 20}}></View>
          <CommonButton
            onPressed={async () =>  {
              await Linking.openURL("https://www.udemy.com/");
            }}
            text="ENROLL"
            buttonColor={AppColors.primaryPurple}
            textColor={AppColors.white}
            withIcon={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};
