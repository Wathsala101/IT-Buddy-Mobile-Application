import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Linking,
  Dimensions,
  FlatList,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainHeaderLeft from '../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../../components/layout/mainHeaderRight/MainHeaderRight';
import AppColors from '../../config/colors';
import AppImages from './../../config/images';
import Icon from 'react-native-vector-icons/Ionicons';
import CommonButton from '../../components/common/CommonButton';
import PaymentCard from '../../components/ShuttleScreen/PaymentCard';
import HeaderLabel from '../../components/ShuttleScreen/HeaderLabel';
import {ShuttlePatmentContext} from '../../context/shuttle/payment/PaymentContext';
import FullScreenLoadingIndicator from '../../components/common/FullScreenLoadingIndicator';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function PaymentDataScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={PaymentDataScreen1} />
    </Stack.Navigator>
  );
}

const PaymentDataScreen1 = ({navigation}) => {
  const [ShuttlePatmentState, setShuttlePatmentState, actions] = useContext(
    ShuttlePatmentContext,
  );

  useEffect(() => {
    actions.getData();
  }, []);
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('screen5');
            }}>
            <Icon
              name={'add-circle-outline'}
              size={30}
              color={AppColors.black}
            />
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center'}}>
            Payment Details
          </Text>
        </View>
        <View
          style={{
            backgroundColor: AppColors.white,
            marginLeft: 0,
            padding: 15,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 0,
            alignItems: 'center',
            height: Dimensions.get('screen').height - 170,
          }}>
          <View style={{marginTop: 0}}></View>
          {ShuttlePatmentState.isLoading ? (
            <FullScreenLoadingIndicator />
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 10,
                }}>
                Shuttle Service
              </Text>
              <HeaderLabel />
              <FlatList
                data={ShuttlePatmentState.data}
                renderItem={({item}) => (
                  <PaymentCard
                    priceFull={item.fullRide}
                    priceHalf={item.halfRide}
                    route={item.route}
                    id={item.id}
                  />
                )}
                keyExtractor={data => data.id}
              />
            </View>
          )}

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
