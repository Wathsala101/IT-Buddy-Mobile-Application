import React from 'react';
import {View, StyleSheet, ImageBackground, Text, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainHeaderLeft from '../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../../components/layout/mainHeaderRight/MainHeaderRight';
import AppColors from '../../config/colors';
import AppImages from './../../config/images';
import CommonButton from '../../components/common/CommonButton';

const Stack = createStackNavigator();

export default function KnowledgeHubScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: AppColors.black,
        headerShown: false,
        headerTitleAlign: 'center',
        title: '',
        headerStyle: {
          backgroundColor: AppColors.white,
          elevation: 0,
        },
        headerLeft: () => <MainHeaderLeft navigation={navigation} />,
        headerRight: () => <MainHeaderRight navigation={navigation} />,
      }}>
      <Stack.Screen name="screen1" component={KnowledgeHub1} />
    </Stack.Navigator>
  );
}

const KnowledgeHub1 = () => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      <ImageBackground
        source={AppImages.KHscreenBackground}
        style={styles.backgroundImage}>
        <Text style={{fontWeight: 'bold', fontSize: 35, textAlign: 'center'}}>
          Knowledge Hub
        </Text>
        <View
          style={{
            backgroundColor: AppColors.white,
            marginLeft: 15,
            padding: 15,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginTop: 40}}></View>
          <CommonButton
            onPressed={() => {}}
            text="SLTC Library"
            buttonColor={AppColors.lightergrey}
            textColor={AppColors.black}
            withIcon={false}
            onPressed={async () => {
              await Linking.openURL('https://digilib.sltc.ac.lk/login');
            }}
          />
          <View style={{marginTop: 70}}></View>
          <CommonButton
            onPressed={() => {}}
            text="ACM Digital Library"
            buttonColor={AppColors.lightergrey}
            textColor={AppColors.black}
            withIcon={false}
            onPressed={async () => {
              await Linking.openURL('https://dl.acm.org/');
            }}
          />
          <View style={{marginTop: 70}}></View>
          <CommonButton
            onPressed={() => {}}
            text="IEEE Xplore Digital "
            buttonColor={AppColors.lightergrey}
            textColor={AppColors.black}
            withIcon={false}
            onPressed={async () => {
              await Linking.openURL('https://dl.acm.org/');
            }}
          />
          <View style={{marginTop: 40}}></View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
});
