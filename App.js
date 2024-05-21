import React, {useEffect, useState, useContext} from 'react';
import {StatusBar} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AppColors from './src/config/colors';

//custom components
import HomeScreen from './src/screens/HomeScreen';
import {CustomDrawer} from './src/components/layout/customDrawer/CustomDrawer';
import AnnouncementScreen from './src/screens/AnnouncementScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import PaymentMethodScreen from './src/screens/PaymentMethodScreen';
import MapScreen from './src/screens/MapScreen';
import DirectoryScreen from './src/screens/DirectoryScreen';
import LMSScreen from './src/screens/LMSScreen';
import HelpAndSupportScreen from './src/screens/HelpAndSupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CalenderScreen from './src/screens/CalenderScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import StartScreen from './src/screens/StartScreen';
import OnlineLibraryScreen from './src/screens/OnlineLibraryScreen';
import KnowledgeHubScreen from './src/screens/onlineLibraryScreens/KnowledgeHubScreen';
import TodoScreen from './src/screens/TodoScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import CanteenScreen from './src/screens/CanteenScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import ShuttleScreen from './src/screens/ShuttleScreen';
import AdminProgressScreen from './src/screens/AdminProgressScreen';

//context
import {AppAuthContext} from './src/context/app/AppAuthContext';

const Drawer = createDrawerNavigator();

const App = () => {
  const [splashLoading, setSplashLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplashLoading(false);
    }, 1000);
  }, []);
  const [AppAuthState, setAppAuthState] = useContext(AppAuthContext);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={AppColors.black} />
      {splashLoading ? (
        <LoadingScreen />
      ) : AppAuthState.isloggedIn ? (
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer {...props} />}
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen name="HomeScreen" component={HomeScreen} />
          <Drawer.Screen name="Announcements" component={AnnouncementScreen} />
          <Drawer.Screen name="Progress" component={ProgressScreen} />
          <Drawer.Screen name="AdminProgress" component={AdminProgressScreen} />
          <Drawer.Screen name="PaymentMethod" component={PaymentMethodScreen} />
          <Drawer.Screen name="Map" component={MapScreen} />
          <Drawer.Screen name="Directory" component={DirectoryScreen} />
          <Drawer.Screen name="LMS" component={LMSScreen} />
          <Drawer.Screen
            name="HelpAndSupport"
            component={HelpAndSupportScreen}
          />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Calender" component={CalenderScreen} />
          <Drawer.Screen name="Library" component={OnlineLibraryScreen} />
          <Drawer.Screen name="KnowledgeHub" component={KnowledgeHubScreen} />
          <Drawer.Screen name="Todo" component={TodoScreen} />
          <Drawer.Screen name="Courses" component={CoursesScreen} />
          <Drawer.Screen name="Canteen" component={CanteenScreen} />
          <Drawer.Screen name="Survey" component={SurveyScreen} />
          <Drawer.Screen name="Shuttle" component={ShuttleScreen} />
        </Drawer.Navigator>
      ) : (
        <StartScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
