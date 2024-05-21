import React, {useContext, useEffect, useState} from 'react';
import {View, ScrollView, Text, ImageBackground} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import Chart from './../components/progressScreen/Chart';
import RadiantTopBanner from '../components/common/RadiantTopBanner';
import TableData from '../components/progressScreen/TableData';
import AppImages from '../config/images';
import CommonButton from '../components/common/CommonButton';
import {ProgressContext} from '../context/progress/ProgressContext';
import {AppAuthContext} from './../context/app/AppAuthContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';
import {Picker} from '@react-native-picker/picker';
import DBData from '../config/DBData';

const Stack = createStackNavigator();

export default function AdminProgressScreen({navigation}) {
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
      <Stack.Screen name="First" component={AdminProgressScreenFirst} />
    </Stack.Navigator>
  );
}

const AdminProgressScreenFirst = () => {
  const [ProgressState, setProgressState, actions] =
    useContext(ProgressContext);
  const [selectedTodoType, setSelectedTodoType] = useState(null);
  const [mailArray, setMailArray] = useState([]);

  const [AppAuthState, setAppAuthState, actionsApp] =
    useContext(AppAuthContext);

  const [CGPA, setCGPA] = useState(0.0);

  useEffect(() => {
    actions.getAllData();
  }, []);


  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      {ProgressState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <Picker
          selectedValue={selectedTodoType}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedTodoType(itemValue)
          }>
          <Picker.Item label="Personal" value={DBData.todoPersonalRoot} />
          <Picker.Item label="Hurry" value={DBData.todoHurryRoot} />
          <Picker.Item label="Shopping" value={DBData.todoShoppingRoot} />
          <Picker.Item label="University" value={DBData.todoUniversityRoot} />
          <Picker.Item label="Work" value={DBData.todoWorkRoot} />
        </Picker>
      )}
    </View>
  );
};
