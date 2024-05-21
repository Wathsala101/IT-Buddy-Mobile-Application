import React, {useContext, useEffect} from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../../config/colors';
import MainHeaderLeft from '../../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../../components/common/RadiantTopBannerAlt';
import {ScrollView} from 'react-native-gesture-handler';
import FoodTable from '../../components/canteenScreens/FoodTable';
import {CanteenContext} from '../../context/canteen/CanteenContext';
import DBData from '../../config/DBData';
import FullScreenLoadingIndicator from '../../components/common/FullScreenLoadingIndicator';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import AddFoodScreen from './AddFoodScreen';

const Stack = createStackNavigator();

export default function FoodScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={FoodScreen1} />
      <Stack.Screen name="screenAdd" component={AddFoodScreen} />
    </Stack.Navigator>
  );
}

const FoodScreen1 = ({navigation}) => {
  const [CanteenState, setCanteenState, actions] = useContext(CanteenContext);
  const [AppAuthState, setAppAuthState, appAuthActions] =
    useContext(AppAuthContext);

  useEffect(() => {
    actions.reset();
    actions.getData(DBData.foodRoot);
  }, []);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      {CanteenState.isLoading ? (
        <FullScreenLoadingIndicator />
      ) : (
        <ScrollView>
          <RadiantTopBannerAlt
            title="Food"
            onPress={() => {
              navigation.navigate('screenAdd', {type: DBData.foodRoot});
            }}
          />
          <View>
            <FoodTable data={CanteenState.data} />
          </View>
        </ScrollView>
      )}
    </View>
  );
};
