import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import {AppAuthContext} from './../../../src/context/app/AppAuthContext';
import { AdminLoginContext } from '../../context/onboarding/login/AdminLoginContext';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import AppImages from '../../config/images';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import AppColors from '../../config/colors';

const AdminLogin = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [AppAuthState, setAppAuthState, appActions] =
    useContext(AppAuthContext);
  const [AdminLoginState, setAdminLoginState, actionsSignIn] =
    useContext(AdminLoginContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.backgroundImage}
        style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.outerContainer}>
            <Text style={styles.header}>Admin Log In</Text>
            <CommonInputWithLabel
              label="Email"
              onChanged={actionsSignIn.updateEmail}
              placeHolder="Enter your email"
              value={AdminLoginState.email}
              type={'email-address'}
            />
            <CommonInputWithLabel
              label="Password"
              onChanged={actionsSignIn.updatePassword}
              placeHolder="Enter your password"
              secureTextEntry={true}
              value={AdminLoginState.password}
            />
            <View style={styles.forgetPasswordOuterContainer}>
              <View style={styles.forgetPasswordInnerContainer}>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {}}
                  value={isEnabled}
                />
                <Text>Remember Me</Text>
              </View>
              <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </View>
            <View style={styles.commonButtonContainer}>
              {AdminLoginState.isSubmitting ? (
                <ActivityIndicator size="small" color={AppColors.primaryBlue} />
              ) : (
                <CommonButtonAlt
                  text={'LOG IN'}
                  onPressed={() => {
                    actionsSignIn
                      .signIn()
                      .then(data => {
                        appActions.logIn(
                          data.child('email').val(),
                          data.child('fullName').val(),
                          true,
                          false,
                          false,
                          data.child('id').val(),
                        );
                      })
                      .catch(err => Alert.alert('Error', err));
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  outerContainer: {
    marginTop: 50,
    paddingLeft: 20,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  forgetPasswordOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
    marginTop: 50,
  },
  forgetPasswordInnerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetPasswordText: {fontWeight: 'bold'},
  commonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  otherLoginOptionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'grey',
  },
  googleButton: {
    width: 250,
    height: 60,
  },
  bottomPartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  signUpLabel: {
    color: 'blue',
  },
});

export default AdminLogin;
