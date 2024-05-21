import React, {useContext} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CoreDetails from './CoreDetails';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AnnouncementContext} from '../../context/Announcement/AnnouncementContext';

export default function AnnouncementCard({
  image,
  title,
  date,
  platform,
  navigation,
  id
}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [AnnouncementState, setAnnouncementState, announcementActions] =
    useContext(AnnouncementContext);
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          style={{width: 100, height: 100}}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={styles.core}>
        <CoreDetails date={date} platform={platform} title={title} />
      </View>
      {AppAuthState.isAdmin ? (
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={() => {
              announcementActions.updateData(title, date, platform, id);
              navigation.navigate('screenAdd');
            }}>
            <Icon name={'edit'} size={30} color={AppColors.black} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => {}}>
            <Icon name={'navigate-next'} size={30} color={AppColors.black} />
            <Icon
              style={{marginLeft: -20}}
              name={'navigate-next'}
              size={30}
              color={AppColors.black}
            />
          </TouchableOpacity>
        </View>
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
  },
  image: {
    flex: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  core: {
    flex: 4,
  },
  icon: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
