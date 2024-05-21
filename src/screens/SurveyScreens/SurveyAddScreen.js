import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import AppColors from '../../config/colors';
import Alerts from '../../config/alerts';

//context
import {AddCanteenFoodContext} from '../../context/canteen/AddCanteenFoodContext';
import {CanteenContext} from '../../context/canteen/CanteenContext';
import {AnnouncementContext} from '../../context/Announcement/AnnouncementContext';
import {SurveyContext} from '../../context/survey/SurveyContext';
import DBData from '../../config/DBData';
import Errors from '../../config/errors';

const SurveyAddScreen = ({navigation, route}) => {
  const [SurveyState, setSurveyState, surveyActions] =
    useContext(SurveyContext);

  useEffect(() => {
    surveyActions.updateDescription(route.params.description);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>
            {route.params.description == 'description'
              ? 'add survey data'
              : 'update survey data'}
          </Text>
          <CommonInputWithLabel
            label={'Description'}
            placeHolder={`Enter the description`}
            onChanged={surveyActions.updateDescription}
            type={'default'}
            value={SurveyState.description}
            multiline={true}
          />

          <View style={styles.commonButtonContainer}>
            {SurveyState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={route.params.description == 'description' ? 'ADD' : 'UPDATE'}
                onPressed={() => {
                  if (route.params.description == 'description') {
                    surveyActions
                      .addSurvey(route.params.id)
                      .then(val => {
                        surveyActions.getData();
                        navigation.navigate('screen1');
                      })
                      .catch(e => Alert.alert(Errors.SOMETHING_WENT_WRONG));
                  } else {
                    surveyActions
                      .updateSurvey(route.params.id)
                      .then(val => {
                        surveyActions.getData();
                        navigation.navigate('screen1');
                      })
                      .catch(e => Alert.alert(Errors.SOMETHING_WENT_WRONG));
                  }
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  outerContainer: {
    marginTop: 40,
    paddingLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  commonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  otherLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'grey',
  },
  googleLogin: {
    width: 250,
    height: 60,
  },
  bottomPartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLabel: {
    color: 'blue',
    marginBottom: 100,
  },
});

export default SurveyAddScreen;
