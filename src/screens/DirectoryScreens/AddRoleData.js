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
import {AddDirectoryRoleContext} from '../../context/directory/AddDirectoryRoleContext';
import DBData from '../../config/DBData';

const AddRoleData = ({navigation, route}) => {
  const [
    AddDirectoryRoleState,
    setAddDirectoryRoleState,
    actionsAddDirectoryRole,
  ] = useContext(AddDirectoryRoleContext);

  const getRole = () => {
    switch (route.params.type) {
      case DBData.directoryAdminRoot:
        return 'admin';
      case DBData.directoryStaffRoot:
        return 'staff';
      case DBData.directoryClubRoot:
        return 'club';
      case DBData.directoryOtherRoot:
        return 'other';
    }
  };

  useEffect(() => {
    actionsAddDirectoryRole.reset();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>Add new {getRole()} role</Text>
          <CommonInputWithLabel
            label="Name"
            placeHolder="Enter role's name"
            onChanged={actionsAddDirectoryRole.updateName}
            type={'default'}
            value={AddDirectoryRoleState.name}
          />
          <CommonInputWithLabel
            label="Designation"
            onChanged={actionsAddDirectoryRole.updateDesignation}
            placeHolder="Enter role's designation"
            type={'email-address'}
            value={AddDirectoryRoleState.designation}
          />
          <CommonInputWithLabel
            label="Email"
            onChanged={actionsAddDirectoryRole.updateEmail}
            placeHolder="Enter role's email"
            type={'default'}
            secureTextEntry={false}
            value={AddDirectoryRoleState.email}
          />
          <CommonInputWithLabel
            label="Phone"
            onChanged={actionsAddDirectoryRole.updatePhone}
            placeHolder="Enter role's phone"
            secureTextEntry={false}
            type={'default'}
            value={AddDirectoryRoleState.phone}
          />
          <View style={styles.commonButtonContainer}>
            {AddDirectoryRoleState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'ADD'}
                onPressed={() => {
                  actionsAddDirectoryRole
                    .addRole(route.params.type)
                    .then(success => {
                      Alert.alert('Success', Alerts.ADD_ROLE_COMPLETE, [
                        {
                          text: 'OK',
                          onPress: () => navigation.navigate('screen1'),
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

export default AddRoleData;
