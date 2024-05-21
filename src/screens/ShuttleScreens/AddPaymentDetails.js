import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import AppImages from '../../config/images';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import AppColors from '../../config/colors';
import Alerts from '../../config/alerts';

//context
import {AddOtherTimeContext} from '../../context/shuttle/other/AddOtherTimeContext';
import {AddShuttlePaymentContext} from '../../context/shuttle/payment/AddShuttlePaymentContext';

const AddPaymentDetails = ({navigation}) => {
  const [AddOtherTimeState, setAddOtherTimeState, addOtherTimeActions] =
    useContext(AddOtherTimeContext);

  const [
    AddShuttlePaymentState,
    setAddShuttlePaymentState,
    addShuttlePaymentActions,
  ] = useContext(AddShuttlePaymentContext);

  useEffect(() => {
    addShuttlePaymentActions.reset();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>Add payment data</Text>
          <CommonInputWithLabel
            label="Route"
            placeHolder="Enter route"
            onChanged={addShuttlePaymentActions.updateRoute}
            type={'default'}
            value={AddShuttlePaymentState.route}
          />
          <CommonInputWithLabel
            label="Full route price"
            onChanged={addShuttlePaymentActions.updateFullRide}
            placeHolder="Enter full route price"
            type={'default'}
            value={AddShuttlePaymentState.fullRide}
          />
          <CommonInputWithLabel
            label="half route price"
            onChanged={addShuttlePaymentActions.updateHalfRide}
            placeHolder="Enter half route price"
            type={'default'}
            secureTextEntry={false}
            value={AddShuttlePaymentState.halfRide}
          />

          <View style={styles.commonButtonContainer}>
            {AddShuttlePaymentState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'ADD'}
                onPressed={() => {
                  addShuttlePaymentActions
                    .AddShuttlePayment()
                    .then(success => {
                      Alert.alert('Success', Alerts.ADD_OTHER_DATA_COMPLETE, [
                        {
                          text: 'OK',
                          onPress: () => navigation.navigate('screen2'),
                        },
                      ]);
                    })
                    .catch(err => {
                      Alert.alert(err);
                    });
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  outerContainer: {
    marginTop: 10,
    paddingLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  commonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  otherLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'grey',
  },
  googleLogin: {
    width: 250,
    height: 60,
  },
  bottomPartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLabel: {
    color: 'blue',
    marginBottom: 100,
  },
});

export default AddPaymentDetails;
