import React, {Component, useState} from 'react';
import {View, ImageBackground, Text, StyleSheet, Image} from 'react-native';
import CommonButton from './../../components/common/CommonButton';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AppImages from '../../config/images';
import AppColors from '../../config/colors';

const ChooseSignInUp = ({navigation}) => {
  const [checked, setChecked] = useState('student');
  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={AppImages.splashScreen}
        style={styles.backgroundImage}>
        {/*TODO:: DO not remove this empty view */}
        <View style={styles.topBarView}></View>
        <View style={styles.innerContainer}>
          <Image
            style={styles.logo}
            source={require('./../../assets/images/logo.png')}
          />
          <Text style={styles.mainTitle}>ITbuddy</Text>
          <Text style={styles.subHeader}>Select the user type to proceed</Text>
          <View style={styles.customRadioButtonOuterContainer}>
            <TouchableOpacity
              onPress={() => {
                setChecked('student');
              }}>
              <View style={styles.customRadioButtonInnerContainer}>
                <RadioButton
                  color={AppColors.black}
                  value="student"
                  status={checked === 'student' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('student')}
                />
                <View style={styles.customRadioButtonImageContainer}>
                  <Image
                    style={styles.customRadioButtonImage}
                    source={require('./../../assets/images/studentRadio.png')}
                  />
                </View>
                <Text style={styles.customRadioButtonText}>Student</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.customRadioButtonOuterContainer}>
            <TouchableOpacity
              onPress={() => {
                setChecked('staff');
              }}>
              <View style={styles.customRadioButtonInnerContainer}>
                <RadioButton
                  color="black"
                  value="staff"
                  status={checked === 'staff' ? 'checked' : 'unchecked'}
                  onPress={() => setChecked('staff')}
                />
                <View style={styles.customRadioButtonImageContainer}>
                  <Image
                    style={styles.customRadioButtonImage}
                    source={require('./../../assets/images/staffRadio.png')}
                  />
                </View>
                <Text style={styles.customRadioButtonText}>Staff</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <CommonButton
              withIcon={false}
              text={'SIGN IN'}
              onPressed={() => {
                if (checked === 'student') {
                  navigation.navigate('screen3');
                } else if (checked === 'staff') {
                  navigation.navigate('screen4');
                }
              }}
            />
            <TouchableOpacity
              style={styles.signUpContainer}
              onPress={() => {
                if (checked === 'student') {
                  navigation.navigate('screen7');
                } else if (checked === 'staff') {
                  navigation.navigate('screen6');
                }
              }}>
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.adminTextContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('screen5');
            }}
            style={styles.adminRow}>
            <Icon name="user" size={20} color={AppColors.primarygrey} />
            <Text style={styles.adminButtonText}>Admin</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: 'transparent',
    flex: 12,
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  topBarView: {
    backgroundColor: 'blue',
    flex: 1,
  },
  logo: {
    height: 70,
    width: 70,
    marginTop: 20,
  },
  mainTitle: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'blue',
    borderBottomWidth: 4,
    borderBottomColor: 'black',
  },
  subHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },
  customRadioButtonOuterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
  },
  customRadioButtonInnerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  customRadioButtonImageContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    marginLeft: 5,
    marginRight: 10,
  },
  customRadioButtonImage: {
    height: 30,
    width: 30,
  },
  customRadioButtonText: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  signUpContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  adminTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  adminButtonText: {
    marginLeft: 10,
  },
  adminRow: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ChooseSignInUp;
