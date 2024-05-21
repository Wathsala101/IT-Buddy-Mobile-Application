import React from 'react';
import {View, ScrollView, Image, StyleSheet, Text} from 'react-native';
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
import CommonButton from '../components/common/CommonButton';
import PaymentDataScreen from './ShuttleScreens/PaymentDataScreen';
import OtherDataScreen from './ShuttleScreens/OtherDataScreen';
import AddOtherDetail from './ShuttleScreens/AddOtherDetail';
import AddPaymentDetails from './ShuttleScreens/AddPaymentDetails';

const Stack = createStackNavigator();

export default function ShuttleScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={ShuttleScreen1} />
      <Stack.Screen name="screen2" component={PaymentDataScreen} />
      <Stack.Screen name="screen3" component={OtherDataScreen} />
      <Stack.Screen name="screen4" component={AddOtherDetail} />
      <Stack.Screen name="screen5" component={AddPaymentDetails} />
    </Stack.Navigator>
  );
}

const ShuttleScreen1 = ({navigation}) => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View>
        <RadiantTopBannerAlt title="Shuttle" />
        <Image style={styles.tinyLogo} source={AppImages.shuttleBanner} />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
          }}>
          Shuttle Routes
        </Text>
        <Image style={styles.tinyLogo} source={AppImages.timetable} />
        <View
          style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
          <CommonButton
            onPressed={() => {
              navigation.navigate('screen3');
            }}
            text="Starting Times & Other Details"
            withIcon={false}
            buttonColor={AppColors.white}
            textColor={AppColors.black}
          />
          <View style={{marginTop: 20}}></View>
          <CommonButton
            onPressed={() => {
              navigation.navigate('screen2');
            }}
            text="Payment Details"
            withIcon={false}
            buttonColor={AppColors.white}
            textColor={AppColors.black}
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
