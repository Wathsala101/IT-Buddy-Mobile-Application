import React, {useContext, useEffect} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import AppImages from '../config/images';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import SurveyCard from '../components/surveyScreen/SurveyCard';
import {SurveyContext} from '../context/survey/SurveyContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';
import SurveyAddScreen from './SurveyScreens/SurveyAddScreen';
import AddFloatingButton from '../components/directoryScreens/AddFloatingButton';
import {AppAuthContext} from '../context/app/AppAuthContext';

const Stack = createStackNavigator();

export default function SurveyScreen({navigation}) {
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
      <Stack.Screen name="screen1" component={SurveyScreen1} />
      <Stack.Screen name="screenAdd" component={SurveyAddScreen} />
    </Stack.Navigator>
  );
}

const SurveyScreen1 = ({navigation}) => {
  const [SurveyState, setSurveyState, actions] = useContext(SurveyContext);
  const [AppAuthState, setAppAuthState, AppAuthActions] =
    useContext(AppAuthContext);

  useEffect(() => {
    actions.getData();
  }, []);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View>
      <RadiantTopBannerAlt title="Survey" />
      <ImageBackground
        source={AppImages.surveyBackground}
        style={{width: '100%', height: '90%'}}>
        {SurveyState.isLoading ? (
          <FullScreenLoadingIndicator />
        ) : (
          <>
            <FlatList
              data={SurveyState.data}
              renderItem={({item}) => (
                <SurveyCard
                  description={item.description}
                  id={item.id}
                  navigation={navigation}
                />
              )}
              keyExtractor={data => data.id}
            />
            {AppAuthState.isAdmin ? (
              <View
                style={{
                  position: 'absolute',
                  right: Dimensions.get('window').width / 2.5,
                  bottom: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('screenAdd', {
                      id: 'description',
                      description: 'description',
                    });
                  }}>
                  <AddFloatingButton
                    backgroundColor={AppColors.white}
                    textColor={AppColors.primaryBlue}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
  },
});
