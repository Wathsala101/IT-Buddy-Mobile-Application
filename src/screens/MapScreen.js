import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import RadiantTopBanner from '../components/common/RadiantTopBanner';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';

const Stack = createStackNavigator();

export default function MapScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={MapScreen1} />
    </Stack.Navigator>
  );
}

const MapScreen1 = () => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        display: 'flex',
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          alignSelf: 'center',
          zIndex: 1,
          width: '100%',
        }}>
        <RadiantTopBanner title="Map View" />
      </View>
      <ReactNativeZoomableView
        maxZoom={100.5}
        minZoom={1}
        zoomStep={0.3}
        initialZoom={1.8}
        bindToBorders={true}
        onZoomAfter={() => {}}
        style={{
          padding: 0,
          backgroundColor: 'red',
        }}>
        <Image
          source={require('./../assets/images/map.png')}
          resizeMode="cover"
        />
      </ReactNativeZoomableView>
    </View>
  );
};
