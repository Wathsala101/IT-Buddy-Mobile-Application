import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import AnnouncementCard from '../components/AnnouncementScreen/AnnouncementCard';
import RadiantTopBanner from '../components/common/RadiantTopBanner';
import {AnnouncementContext} from '../context/Announcement/AnnouncementContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';
import {FlatList} from 'react-native-gesture-handler';
import UpdateAnnouncementScreen from './AnnouncementScreens/UpdateAnnouncementScreen';

const Stack = createStackNavigator();

export default function AnnouncementScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={AnnouncementScreen1} />
      <Stack.Screen name="screenAdd" component={UpdateAnnouncementScreen} />
    </Stack.Navigator>
  );
}

const AnnouncementScreen1 = ({navigation}) => {
  const [AnnouncementState, setAnnouncementState, actions] =
    useContext(AnnouncementContext);
  useEffect(() => {
    actions.reset();
    actions.getData();
  }, []);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      {AnnouncementState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <>
          <RadiantTopBanner title="Announcement" />
          <FlatList
            data={AnnouncementState.data}
            renderItem={({item}) => (
              <AnnouncementCard
                image={item.image}
                date={item.date}
                platform={item.platform}
                title={item.title}
                navigation={navigation}
                id={item.id}
              />
            )}
            keyExtractor={data => data.title}
          />
        </>
      )}
    </View>
  );
};
