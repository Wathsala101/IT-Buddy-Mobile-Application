import React, {useContext, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MainHeaderLeft from '../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../../components/layout/mainHeaderRight/MainHeaderRight';
import AppColors from '../../config/colors';
import RadiantTopBannerAlt from '../../components/common/RadiantTopBannerAlt';
import ResourceCard from '../../components/onlineLibrary/ResourceCard';
import {LibraryContext} from '../../context/library/LibraryContext';
import DBData from '../../config/DBData';
import FullScreenLoadingIndicator from '../../components/common/FullScreenLoadingIndicator';

const Stack = createStackNavigator();

export default function ResourceMaterialScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={ResourceMaterialScreen1} />
    </Stack.Navigator>
  );
}

const ResourceMaterialScreen1 = () => {
  const [LibraryState, setLibraryState, actions] = useContext(LibraryContext);

  useEffect(() => {
    actions.reset();
    actions.getData(DBData.resourceMaterialsRoot);
  }, []);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      {LibraryState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <>
          <RadiantTopBannerAlt title="Resource materials" icon={'picture-o'} />
          <FlatList
            data={LibraryState.data}
            renderItem={({item}) => (
              <ResourceCard
                image={item.image}
                auther={item.aurther}
                description={item.description}
                title={item.title}
                downloadUrl={item.downloadUrl}
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
