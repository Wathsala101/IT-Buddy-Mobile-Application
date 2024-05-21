import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import {Title} from 'react-native-paper';
import {Avatar} from 'react-native-elements';
import {AppAuthContext} from '../context/app/AppAuthContext';
import BannerWithIcon from '../components/settingsScreen/BannerWithIcon';
import CommonIconWithPrefixIcon from '../components/common/CommonIconWithPrefixIcon';
import SaveButton from '../components/settingsScreen/SaveButton';
import {CredentialsContext} from '../context/settings/CredentialsContext';
import DBData from '../config/DBData';
import Alerts from '../config/alerts';
import Errors from '../config/errors';

const Stack = createStackNavigator();

export default function SettingsScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={SettingsScreen1} />
    </Stack.Navigator>
  );
}

const SettingsScreen1 = () => {
  const [AppAuthState, setAppAuthState, appActions] =
    useContext(AppAuthContext);
  const [CredentialsState, setCredentialsState, actionsCredentials] =
    useContext(CredentialsContext);

  const getType = () => {
    if (AppAuthState.isAdmin) {
      return DBData.adminRoot;
    } else if (AppAuthState.isStudent) {
      return DBData.studentRoot;
    } else if (AppAuthState.isStaff) {
      return DBData.staffRoot;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <RadiantTopBannerAlt title="Settings" icon="gear" />
        <View style={styles.top}></View>
        <Avatar
          rounded
          size={130}
          source={{
            uri: 'https://as2.ftcdn.net/v2/jpg/01/06/60/69/1000_F_106606935_KVsd5V2f626fv1UvqJabxWnLAg4ExmI7.jpg',
          }}
        />
        <Title style={styles.title}>{AppAuthState.userName}</Title>
        <Title style={{marginLeft: 15, marginTop: -20, fontSize: 15}}>
          {AppAuthState.email}
        </Title>
        <View style={{marginTop: -40, width: '100%'}}>
          <BannerWithIcon title="IT & Technical Support" icon="lock" />
          <CommonIconWithPrefixIcon
            icon="lock"
            placeholder="Enter new Password"
            onChangeText={actionsCredentials.updatePassword}
          />
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 0.4,
              marginTop: -10,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <CommonIconWithPrefixIcon
            icon="lock"
            placeholder="Confirm New Password"
            onChangeText={actionsCredentials.updateNewPassword}
          />
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 0.4,
              marginTop: -10,
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
          <SaveButton
            onPress={() => {
              actionsCredentials
                .changePassword(getType(), AppAuthState.id)
                .then(value => Alert.alert(Alerts.UPDATE_PASSWORD_SUCCESSFULL))
                .catch(e => {
                  Errors.SOMETHING_WENT_WRONG;
                });
            }}
          />
          <BannerWithIcon title="Help and Support" icon="questioncircleo" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: 'center',
  },
  title: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: AppColors.black,
    paddingTop: 10,
    paddingBottom: 10,
  },
  top: {
    marginTop: 20,
  },
});
