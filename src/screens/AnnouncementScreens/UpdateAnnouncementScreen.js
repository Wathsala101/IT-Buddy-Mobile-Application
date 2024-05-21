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
import DBData from '../../config/DBData';

const UpdateAnnouncementScreen = ({navigation}) => {
  const [AnnouncementState, setAnnouncementState, announcementActions] =
    useContext(AnnouncementContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>Update announcement</Text>
          <CommonInputWithLabel
            label={'Time'}
            placeHolder={`Enter the time`}
            onChanged={announcementActions.updateTime}
            type={'default'}
            value={AnnouncementState.time}
          />
          <CommonInputWithLabel
            label={'Title'}
            onChanged={announcementActions.updateTitle}
            placeHolder={`Enter the title`}
            type={'default'}
            value={AnnouncementState.title}
          />
          <CommonInputWithLabel
            label={'Platform'}
            onChanged={announcementActions.updatePlatform}
            placeHolder={`Enter the platform name`}
            type={'default'}
            value={AnnouncementState.platform}
          />
          <View style={styles.commonButtonContainer}>
            {AnnouncementState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'UPDATE'}
                onPressed={() => {
                  announcementActions
                    .updateAnnouncementData()
                    .then(success => {
                      Alert.alert('Success', Alerts.SUCCESS_UPDATE, [
                        {
                          text: 'OK',
                          onPress: () => {
                            navigation.navigate('screen1');
                            announcementActions.reset();
                            announcementActions.getData();
                          },
                        },
                      ]);
                    })
                    .catch(err => {
                      Alert.alert(err);
                    });
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
    marginTop: 20,
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

export default UpdateAnnouncementScreen;
