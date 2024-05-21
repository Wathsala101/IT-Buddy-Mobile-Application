import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import {ScrollView} from 'react-native-gesture-handler';
import TopBanner from '../components/paymentMethodScreen/TopBanner';
import ToBeDonePaymentTable from '../components/paymentMethodScreen/ToBeDonePaymentTable';
import CompletedPaymentTable from '../components/paymentMethodScreen/CompletedPaymentTable';
import CommonButton from '../components/common/CommonButton';
import {PaymentDetailsContext} from '../context/paymentDetails/paymentDetailsContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';

const Stack = createStackNavigator();

export default function PaymentMethodScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={PaymentMethodScreen1} />
    </Stack.Navigator>
  );
}

const PaymentMethodScreen1 = () => {
  const [PaymentDetailsState, setPaymentDetailsState, actions] = useContext(
    PaymentDetailsContext,
  );
  const [completedPayemnts, setCompletedPayemnts] = useState([]);
  const [paymentsToBeDone, setPaymentsToBeDone] = useState([]);

  useEffect(() => {
    actions.getData();
  }, []);

  useEffect(() => {
    if (PaymentDetailsState.data[0] != undefined) {
      let completedPayemnts = PaymentDetailsState.data[0]['completedPayemnts'];
      let paymentsToBeDone = PaymentDetailsState.data[0]['paymentsToBeDone'];

      completedPayemnts = Object.keys(completedPayemnts).map(
        k => completedPayemnts[k],
      );
      paymentsToBeDone = Object.keys(paymentsToBeDone).map(
        k => paymentsToBeDone[k],
      );

      setCompletedPayemnts(completedPayemnts);
      setPaymentsToBeDone(paymentsToBeDone);
    }
  }, [PaymentDetailsState.data]);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: AppColors.white,
        }}>
        <RadiantTopBannerAlt title="Payment Details" />
        <TopBanner />
        {PaymentDetailsState.isLoading ? (
          <FullScreenLoadingIndicator />
        ) : (
          <View style={{padding: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              Payments to be done
            </Text>
            {paymentsToBeDone.length == 0 ? (
              <FullScreenLoadingIndicator />
            ) : (
              <ToBeDonePaymentTable data={paymentsToBeDone} />
            )}

            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop: 20}}>
              Completed Payments
            </Text>
            {completedPayemnts.length == 0 ? (
              <FullScreenLoadingIndicator />
            ) : (
              <CompletedPaymentTable data={completedPayemnts} />
            )}
            <View
              style={{
                justifyContent: 'center',
                padding: 10,
                alignItems: 'center',
              }}>
              <CommonButton
                onPressed={() => {
                   Linking.openURL("https://mpg.seylan.lk/sltc");
                }}
                text="Proceed to Pay"
                withIcon={false}
                buttonColor={AppColors.lightergrey}
                textColor={AppColors.black}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
