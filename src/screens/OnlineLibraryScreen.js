import React from 'react';
import {View, Image, ScrollView} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import AppImages from '../config/images';
import HomeTile from '../components/homeTabScreens/HomeTile';
import CommonButton from '../components/common/CommonButton';
import ResourceMaterialScreen from './onlineLibraryScreens/ResourceMaterialScreen';
import KnowledgeHubScreen from './onlineLibraryScreens/KnowledgeHubScreen';

const Stack = createStackNavigator();

export default function OnlineLibraryScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={OnlineLibraryScreen1} />
      <Stack.Screen name="screen2" component={ResourceMaterialScreen} />
      <Stack.Screen name="screen3" component={KnowledgeHubScreen} />
    </Stack.Navigator>
  );
}

const OnlineLibraryScreen1 = ({navigation}) => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <RadiantTopBannerAlt title="Online Library" />
        <Image
          style={{width: '100%', marginBottom: -20}}
          source={AppImages.libraryBanner}
        />
        <HomeTile
          icon="monitor-dashboard"
          title=" Resource materials"
          onPress={() => {
            navigation.navigate('screen2');
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 50,
          }}>
          <CommonButton
            onPressed={() => {
              navigation.navigate('screen3');
            }}
            text="Knowledge Hub"
            withIcon={false}
            buttonColor={AppColors.lightergrey}
            textColor={AppColors.black}
          />
        </View>

        {/* TODO:: replace with flatlist for better performance*/}
      </View>
    </ScrollView>
  );
};
