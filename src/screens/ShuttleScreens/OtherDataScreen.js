import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainHeaderLeft from '../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../../components/layout/mainHeaderRight/MainHeaderRight';
import AppColors from '../../config/colors';
import AppImages from './../../config/images';
import OtherDetailCard from '../../components/ShuttleScreen/OtherDetailCard';
import {OtherTimeContext} from '../../context/shuttle/other/OtherTimeContext';
import FullScreenLoadingIndicator from '../../components/common/FullScreenLoadingIndicator';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function OtherDataScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={OtherDataScreen1} />
    </Stack.Navigator>
  );
}

const OtherDataScreen1 = ({navigation}) => {
  const [OtherTimeState, setOtherTimeState, actions] =
    useContext(OtherTimeContext);
  useEffect(() => {
    actions.getData();
  }, []);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <ImageBackground
          source={AppImages.KHscreenBackground}
          style={styles.backgroundImage}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('screen4');
              }}>
              <Icon
                name={'add-circle-outline'}
                size={30}
                color={AppColors.black}
              />
            </TouchableOpacity>
            <Text
              style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
              Starting Times & Other Details
            </Text>
          </View>
          <View>
            <View style={{marginTop: 40}}></View>
            {OtherTimeState.isLoading ? (
              <FullScreenLoadingIndicator />
            ) : (
              OtherTimeState.data.map((data, index) => {
                return (
                  <OtherDetailCard
                    driverName={data.driverName}
                    DriverNo={data.driverTelNumber}
                    StartLocation={data.startLocation}
                    regNumber={data.regNumber}
                    startTime={data.startTime}
                    index={index}
                    id={data.id}
                    key={data.id}
                  />
                );
              })
            )}
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
});
