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

const AddOtherDetail = ({navigation}) => {
  const [AddOtherTimeState, setAddOtherTimeState, addOtherTimeActions] =
    useContext(AddOtherTimeContext);

  useEffect(() => {
    addOtherTimeActions.reset();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>Add other data</Text>
          <CommonInputWithLabel
            label="Reg number"
            placeHolder="Enter reg number"
            onChanged={addOtherTimeActions.updateRegNumber}
            type={'default'}
            value={AddOtherTimeState.regNumber}
          />
          <CommonInputWithLabel
            label="Driver name"
            onChanged={addOtherTimeActions.updateDriverName}
            placeHolder="Enter driver's name"
            type={'default'}
            value={AddOtherTimeState.driverName}
          />
          <CommonInputWithLabel
            label="Mobile number"
            onChanged={addOtherTimeActions.updateDriverTelNumber}
            placeHolder="Enter mobile number"
            type={'default'}
            secureTextEntry={false}
            value={AddOtherTimeState.driverTelNumber}
          />
          <CommonInputWithLabel
            label="start location"
            onChanged={addOtherTimeActions.updateStartLocation}
            placeHolder="Enter start location"
            secureTextEntry={false}
            type={'default'}
            value={AddOtherTimeState.startLocation}
          />
          <CommonInputWithLabel
            label="start time"
            onChanged={addOtherTimeActions.updateStartTime}
            placeHolder="Enter start time"
            secureTextEntry={false}
            type={'default'}
            value={AddOtherTimeState.startTime}
          />
          <View style={styles.commonButtonContainer}>
            {AddOtherTimeState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'ADD'}
                onPressed={() => {
                  addOtherTimeActions
                    .addOtherData()
                    .then(success => {
                      Alert.alert('Success', Alerts.ADD_OTHER_DATA_COMPLETE, [
                        {
                          text: 'OK',
                          onPress: () => navigation.navigate('screen3'),
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

export default AddOtherDetail;
