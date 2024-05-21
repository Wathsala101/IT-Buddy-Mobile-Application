import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert,Linking} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RadiantTopBanner from '../components/common/RadiantTopBanner';
import EventDataCard from '../components/calenderScreen/EventDataCard';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {CalenderContext} from './../context/calender/CalenderContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';
import Alerts from '../config/alerts';

const Stack = createStackNavigator();

export default function CalenderScreen({navigation}) {
  return (
    //TODO : do not use inline styles. use StyleSheet
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
      <Stack.Screen name="First" component={CalenderScreenFirst} />
      <Stack.Screen name="second" component={CalenderScreenSecond} />
    </Stack.Navigator>
  );
}

const CalenderScreenFirst = () => {
  const [CalenderState, setCalenderState, actions] =
    useContext(CalenderContext);

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    actions.reset();
    actions.getData();
  }, []);

  const getMarkedDates = () => {
    let markDatesData = {};
    if (CalenderState.data !== []) {
      let newData = {};
      CalenderState.data.map(val => {
        let key = val.markDate;
        let color = val.color;
        newData[key] = {
          selected: true,
          marked: false,
          selectedColor: color,
        };
      });
      markDatesData = newData;
    }
    return markDatesData;
  };

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
      }}>
      {CalenderState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <ScrollView>
          <RadiantTopBanner title="Calender" />
          <Calendar markedDates={getMarkedDates()} onDayPress={day => {}} />
          {CalenderState.data.map(val => {
            return (
              <TouchableOpacity
                key={Math.random() * 10000000000}
                onPress={() => {
                  setSelectedIndex(CalenderState.data.indexOf(val));
                  Alert.alert('Alert', Alerts.LAUNCH_MEETING, [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        Linking.openURL(val.link);
                      },
                    },
                  ]);
                }}>
                <EventDataCard
                  title={val.title}
                  dateTime={val.dateTime}
                  selected={true}
                  key={val.title}
                  selected={CalenderState.data.indexOf(val) == selectedIndex}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const CalenderScreenSecond = () => {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.white,
      }}>
      <Text>Calender Screen 2</Text>
    </View>
  );
};
