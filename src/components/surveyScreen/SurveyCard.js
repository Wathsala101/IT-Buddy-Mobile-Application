import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground, Alert} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AppImages from '../../config/images';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Alerts from '../../config/alerts';
import {SurveyContext} from '../../context/survey/SurveyContext';
import Errors from '../../config/errors';

export default function SurveyCard({description, id, navigation}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [SurveyState, setSurveyState, surveyActions] =
    useContext(SurveyContext);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderTopWidth: 1,
        borderTopColor: AppColors.black,
        marginTop: 10,
      }}>
      <View style={{width: 10}}>
        <ImageBackground
          source={AppImages.serveyCardBackground}
          style={{width: '100%', height: 70}}></ImageBackground>
        <Text style={{color: 'transparent'}}>.</Text>
      </View>
      <View style={{flex: 8, padding: 15}}>
        <Text>{description}</Text>
      </View>
      <View style={{flex: 1, padding: 15}}>
        {AppAuthState.isAdmin ? (
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Alert', Alerts.DELETE_ITEM, [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    surveyActions
                      .removeSurvey(id)
                      .then(val => {})
                      .catch(e => {
                        Alert.alert(Errors.SOMETHING_WENT_WRONG);
                      });
                  },
                },
              ]);
            }}>
            <IconAntDesign name={'delete'} size={20} color={AppColors.black} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('screenAdd', {
                id: id,
                description: description,
              });
            }}>
            <Icon name={'edit'} size={20} color={AppColors.black} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({});
