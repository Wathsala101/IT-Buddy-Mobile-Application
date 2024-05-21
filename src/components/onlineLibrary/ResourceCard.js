import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import CoreDetails from './CoreDetails';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {LibraryContext} from './../../context/library/LibraryContext';
import Alerts from '../../config/alerts';
import Errors from '../../config/errors';

export default function ResourceCard({
  image,
  title,
  auther,
  description,
  downloadUrl,
  id,
}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [libraryState, setLibraryState, libraryActions] =
    useContext(LibraryContext);

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
        <CoreDetails aurther={auther} description={description} title={title} />
      </View>
      <View style={styles.icon}>
        <TouchableOpacity
          onPress={() => {
            if (AppAuthState.isAdmin) {
              Alert.alert('Alert', Alerts.DELETE_RESOURCE, [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    libraryActions
                      .removeBook(id)
                      .then(v => {})
                      .catch(e => {
                        Alert.alert(Errors.SOMETHING_WENT_WRONG);
                      }),
                },
              ]);
            } else {
              Linking.openURL(downloadUrl);
            }
          }}>
          <Icon
            name={AppAuthState.isAdmin ? 'delete' : 'download'}
            size={30}
            color={AppColors.black}
          />
        </TouchableOpacity>
      </View>
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
