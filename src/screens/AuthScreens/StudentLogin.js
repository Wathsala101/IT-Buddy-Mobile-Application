import React, {useState, useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import {AppAuthContext} from './../../../src/context/app/AppAuthContext';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import AppImages from '../../config/images';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import {StudentLoginContext} from '../../context/onboarding/login/StudentLoginContext';
import AppColors from '../../config/colors';
import Alerts from '../../config/alerts';
import {TouchableOpacity} from 'react-native-gesture-handler';

const StudentLogin = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [AppAuthState, setAppAuthState, appActions] =
    useContext(AppAuthContext);
  const [studentLoginState, setStudentLoginState, actionsSignIn] =
    useContext(StudentLoginContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.backgroundImage}
        style={styles.outerContainer}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={styles.header}>Student Log In</Text>
            <CommonInputWithLabel
              label="Email"
              onChanged={actionsSignIn.updateEmail}
              placeHolder="Enter your email"
              value={studentLoginState.email}
              type={'email-address'}
            />
            <CommonInputWithLabel
              label="Password"
              onChanged={actionsSignIn.updatePassword}
              placeHolder="Enter your password"
              secureTextEntry={true}
              value={studentLoginState.password}
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
              <Text style={styles.forgetPasswordLabel}>Forgot Password?</Text>
            </View>
            <View style={styles.commonButtonContainer}>
              {studentLoginState.isSubmitting ? (
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
                          false,
                          true,
                          false,
                          data.child('id').val(),
                        );
                      })
                      .catch(err => Alert.alert('Error', err));
                  }}
                />
              )}
            </View>
            <View style={styles.otherLoginContainer}>
              <Text>OR</Text>
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => {}}
                disabled={false}
              />
              <View style={styles.bottomPartContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('screen7');
                  }}>
                  <Text style={styles.signUpLabel}> Sign up</Text>
                </TouchableOpacity>
              </View>
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
    width: '100%',
    height: '110%',
  },
  innerContainer: {
    marginTop: 50,
    paddingLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  forgetPasswordOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  forgetPasswordInnerContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgetPasswordLabel: {
    fontWeight: 'bold',
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

export default StudentLogin;
