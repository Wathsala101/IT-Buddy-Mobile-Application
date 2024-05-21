import React, {useState, useContext} from 'react';
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
import {AppAuthContext} from './../../../src/context/app/AppAuthContext';
import {StudentSignUpContext} from '../../context/onboarding/signup/StudentSignUpContext';

const StudentSignUp = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [AppAuthState, setAppAuthState, actionsAuth] =
    useContext(AppAuthContext);
  const [studentSignupState, setStudentSignupState, actionsSignUp] =
    useContext(StudentSignUpContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.backgroundImage}
        style={styles.backgroundImage}>
        <ScrollView>
          <View style={styles.outerContainer}>
            <Text style={styles.header}>Student Sign up</Text>
            <CommonInputWithLabel
              label="Full name"
              placeHolder="Enter your full name"
              onChanged={actionsSignUp.updateFullName}
              type={'default'}
              value={studentSignupState.fullName}
            />
            <CommonInputWithLabel
              label="E-mail"
              onChanged={actionsSignUp.updateEmail}
              placeHolder="Enter your email"
              type={'email-address'}
              value={studentSignupState.email}
            />
            <CommonInputWithLabel
              label="Password"
              onChanged={actionsSignUp.updatePassword}
              placeHolder="Enter your password"
              type={'default'}
              secureTextEntry={true}
              value={studentSignupState.password}
            />
            <CommonInputWithLabel
              label="Repeat Password"
              onChanged={actionsSignUp.updateConfirmPassword}
              placeHolder="Confirm your password"
              secureTextEntry={true}
              type={'default'}
              value={studentSignupState.confirmPassword}
            />
            <View style={styles.commonButtonContainer}>
              {studentSignupState.isSubmitting ? (
                <ActivityIndicator size="small" color={AppColors.primaryBlue} />
              ) : (
                <CommonButtonAlt
                  text={'SIGN UP'}
                  onPressed={() => {
                    actionsSignUp
                      .signUp()
                      .then(success => {
                        Alert.alert('Success', Alerts.REGISTRATION_COMPLETE, [
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
            <View style={styles.otherLoginContainer}>
              <Text>OR</Text>
              <GoogleSigninButton
                style={styles.googleLogin}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={() => {}}
                disabled={false}
              />
              <View style={styles.bottomPartContainer}>
                <Text>Already have an account? </Text>
                <Text style={styles.loginLabel}> Login</Text>
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
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  outerContainer: {
    marginTop: 50,
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

export default StudentSignUp;
