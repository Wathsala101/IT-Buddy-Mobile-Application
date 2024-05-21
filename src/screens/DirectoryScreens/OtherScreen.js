import React, {useContext, useEffect} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from './../../config/colors';
import MainHeaderLeft from './../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from './../../components/layout/mainHeaderRight/MainHeaderRight';
import {ScrollView} from 'react-native-gesture-handler';
import UserDataCard from '../../components/directoryScreens/UserDataCard';
import RadiantTopBannerAlt from '../../components/common/RadiantTopBannerAlt';
import {DirectoryContext} from '../../context/directory/DirectoryContext';
import DBData from '../../config/DBData';
import FullScreenLoadingIndicator from '../../components/common/FullScreenLoadingIndicator';
import AddRoleData from './AddRoleData';
import AddFloatingButton from '../../components/directoryScreens/AddFloatingButton';

const Stack = createStackNavigator();

export default function OtherScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: AppColors.black,
        headerShown: false,
        headerTitleAlign: 'center',
        title: '',
        headerStyle: {
          backgroundColor: AppColors.white,
          elevation: 0,
        },
        headerLeft: () => <MainHeaderLeft navigation={navigation} />,
        headerRight: () => <MainHeaderRight navigation={navigation} />,
      }}>
      <Stack.Screen name="screen1" component={OtherScreen1} />
      <Stack.Screen name="screen2add" component={AddRoleData} />
    </Stack.Navigator>
  );
}

const OtherScreen1 = ({navigation}) => {
  const [DirectoryState, setDirectoryState, actions] =
    useContext(DirectoryContext);
  useEffect(() => {
    actions.reset();
    actions.getData(DBData.directoryOtherRoot);
  }, []);
  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      {DirectoryState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <>
          <RadiantTopBannerAlt title="Other" />
          <FlatList
            data={DirectoryState.data}
            renderItem={({item}) => (
              <UserDataCard
                designation={item.designation}
                email={item.email}
                name={item.name}
                phone={item.phone}
                id={item.id}
                type={DBData.directoryOtherRoot}
                marginBottom={DirectoryState.data.indexOf(item) == DirectoryState.data.length - 1 ? 100 : 0}
              />
            )}
            keyExtractor={data => data.email}
          />
          <View style={{position: 'absolute', right: 15, bottom: 15}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('screen2add', {
                  type: DBData.directoryOtherRoot,
                });
              }}>
              <AddFloatingButton />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};
