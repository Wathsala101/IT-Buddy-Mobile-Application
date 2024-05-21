import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import {ScrollView} from 'react-native-gesture-handler';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import BannerTag from './../components/directory/BannerTag';
import AppImages from '../config/images';
import StaffScreen from './DirectoryScreens/StaffScreen';
import AdminScreen from './DirectoryScreens/AdminScreen';
import ClubsAndSocietiesScreen from './DirectoryScreens/ClubsAndSocietiesScreen';
import OtherScreen from './DirectoryScreens/OtherScreen';
const Stack = createStackNavigator();

export default function DirectoryScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={DirectoryScreen1} />
      <Stack.Screen name="screen2" component={StaffScreen} />
      <Stack.Screen name="screen3" component={AdminScreen} />
      <Stack.Screen name="screen4" component={ClubsAndSocietiesScreen} />
      <Stack.Screen name="screen5" component={OtherScreen} />
    </Stack.Navigator>
  );
}

const DirectoryScreen1 = ({navigation}) => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <RadiantTopBannerAlt title="Directory" />
        <View style={{padding: 15}}>
          <BannerTag
            tag="Staff"
            image={AppImages.staffBannerLabelImage}
            onPressed={() => {
              navigation.navigate('screen2');
            }}
          />
          <BannerTag
            tag="Admin"
            image={AppImages.adminBannerLabelImage}
            onPressed={() => {
              navigation.navigate('screen3');
            }}
          />
          <BannerTag
            tag="Clubs & Societies"
            image={AppImages.communitiesBannerLabelImage}
            onPressed={() => {
              navigation.navigate('screen4');
            }}
          />
          <BannerTag
            tag="Other"
            image={AppImages.linkBannerLabelImage}
            onPressed={() => {
              navigation.navigate('screen5');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};
