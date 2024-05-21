import React from 'react';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import AppImages from '../config/images';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import HomeTile from '../components/homeTabScreens/HomeTile';
import FoodScreen from './CanteenScreens/FoodScreen';
import BeveragesScreen from './CanteenScreens/BeveragesScreen';
import GroceryScreen from './CanteenScreens/GroceryScreen';

const Stack = createStackNavigator();

export default function CanteenScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={CanteenScreen1} />
      <Stack.Screen name="screen2" component={FoodScreen} />
      <Stack.Screen name="screen3" component={BeveragesScreen} />
      <Stack.Screen name="screen4" component={GroceryScreen} />
    </Stack.Navigator>
  );
}

const CanteenScreen1 = ({navigation}) => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View>
        <RadiantTopBannerAlt title="Canteen" />
        <Image style={styles.tinyLogo} source={AppImages.canteenBanner} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 55,
            paddingRight: 55,
            justifyContent: 'space-between',
            marginTop: -20,
          }}>
          <HomeTile
            icon="ios-fast-food-outline"
            title="Food"
            onPress={() => {
              navigation.navigate('screen2');
            }}
          />
          <HomeTile
            icon="food-fork-drink"
            title="Beverages"
            onPress={() => {
              navigation.navigate('screen3');
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 55,
            paddingRight: 55,
            justifyContent: 'center',
            marginTop: -20,
          }}>
          <HomeTile
            icon="luggage-cart"
            title="Grocery"
            onPress={() => {
              navigation.navigate('screen4');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
  },
});
