import React, {useContext} from 'react';
import {View, StyleSheet, Alert, Text} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnnouncementContext} from '../../context/Announcement/AnnouncementContext';
import {OtherTimeContext} from '../../context/shuttle/other/OtherTimeContext';
import NumberTag from './NumberTag';
import Alerts from '../../config/alerts';
import Errors from '../../config/errors';

export default function OtherDetailCard({
  regNumber,
  StartLocation,
  startTime,
  driverName,
  DriverNo,
  index,
  id,
}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [
    OtherTimeContextState,
    setOtherTimeContextState,
    OtherTimeContextActions,
  ] = useContext(OtherTimeContext);
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <NumberTag number={index} />
      </View>
      <View style={styles.core}>
        <Text style={{color: AppColors.primaryBlue}}>Registration Number</Text>
        <Text style={{color: AppColors.primaryBlue}}>Starting Location</Text>
        <Text style={{color: AppColors.primaryBlue}}>Starting Time</Text>
        <Text style={{color: AppColors.primaryBlue}}>Driver Name</Text>
        <Text style={{color: AppColors.primaryBlue}}>Driver Tel No</Text>
      </View>
      <View
        style={{
          height: '90%',
          width: 1,
          backgroundColor: '#909090',
          marginRight: 10,
        }}></View>
      <View style={styles.icon}>
        <View style={styles.core}>
          <Text style={{}}>{regNumber}</Text>
          <Text style={{}}>{StartLocation}</Text>
          <Text style={{}}>{startTime}</Text>
          <Text style={{}}>{driverName}</Text>
          <Text style={{}}>{DriverNo}</Text>
        </View>
      </View>
      {AppAuthState.isAdmin ? (
        <View
          style={{
            position: 'absolute',
            right: 0,
            alignItems: 'center',
            alignContent: 'center',
            alignSelf: 'center',
          }}>
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
                  onPress: () =>
                    OtherTimeContextActions.deleteById(id)
                      .then(v => {})
                      .catch(e => {
                        Alert.alert(Errors.SOMETHING_WENT_WRONG);
                      }),
                },
              ]);
            }}>
            <Icon name={'delete'} size={30} color={AppColors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 5,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginRight: 20,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  core: {
    flex: 4,
  },
  icon: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',
  },
});
