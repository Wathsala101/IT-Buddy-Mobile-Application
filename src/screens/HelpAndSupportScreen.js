import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import TopBanner from '../components/helpAndSupport/TopBanner';
import ContactDetails from '../components/helpAndSupport/ContactDetails';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';

const Stack = createStackNavigator();

export default function HelpAndSupportScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={HelpAndSupportScreen1} />
    </Stack.Navigator>
  );
}

const HelpAndSupportScreen1 = () => {
  return (
    <View style={styles.container}>
      <RadiantTopBannerAlt title="Help and Support" icon="question-circle" />
      <TopBanner />
      <View style={styles.contactDetailContainer}>
        <ContactDetails
          title="IT Help Desk"
          email="helpdesk@sltc.ac.lk"
          telephone="011 2 444 444"
        />
        <View style={styles.divider}></View>
        <ContactDetails
          title="IT Coordinator"
          email="prarthanas@sltc.ac.lk"
          telephone="011 2 333 444"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  contactDetailContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 40,
  },
  divider: {
    height: 40,
  },
});
