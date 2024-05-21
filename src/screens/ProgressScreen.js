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

const Stack = createStackNavigator();

export default function ProgressScreen({navigation}) {
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
      <Stack.Screen name="First" component={ProgressScreenFirst} />
    </Stack.Navigator>
  );
}

const ProgressScreenFirst = () => {
  const [ProgressState, setProgressState, actions] =
    useContext(ProgressContext);

  const [AppAuthState, setAppAuthState, actionsApp] =
    useContext(AppAuthContext);

  const [CGPA, setCGPA] = useState(0.0);

  useEffect(() => {
    actions.reset();
    actions.getData(AppAuthState.email);
  }, []);

  useEffect(() => {
    if (
      ProgressState.data['gpa'] !== undefined &&
      ProgressState.data['gpa'].length > 0
    ) {
      let dataArr = ProgressState.data['gpa'].split(', ');
      let total = 0.0;
      dataArr.forEach(element => {
        total = total + Number.parseFloat(element);
      });
      setCGPA(parseFloat(total / 4).toFixed(2));
    }
  }, [ProgressState]);

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
        <>
          <RadiantTopBanner title="Progress" />
          <ScrollView>
            {ProgressState.data['gpa'] == undefined ? (
              <FullScreenLoadingIndicator />
            ) : (
              <Chart studentGpa={ProgressState.data['gpa']} />
            )}
            <View style={{paddingLeft: 15, paddingRight: 15}}>
              <Text style={{fontSize: 20}}>CGPA : {CGPA}</Text>
              <View>
                <ImageBackground
                  source={AppImages.carouselBackground}
                  style={{width: '100%', height: 250}}>
                  <TableData
                    topGpa={ProgressState.data['batchTopGpa']}
                    studentGpa={ProgressState.data['gpa']}
                  />
                </ImageBackground>
                <View
                  style={{
                    justifyContent: 'center',
                    padding: 10,
                    alignItems: 'center',
                  }}>
                  <CommonButton
                    onPressed={() => {}}
                    text="STUDENT PORTAL"
                    withIcon={false}
                  />
                </View>
                <View style={{height: 50}}></View>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};
