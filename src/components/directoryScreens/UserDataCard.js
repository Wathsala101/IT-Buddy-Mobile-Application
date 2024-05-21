import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import TextRow from './TextRow';
import Icon from 'react-native-vector-icons/AntDesign';
import AppColors from '../../config/colors';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {DirectoryContext} from '../../context/directory/DirectoryContext';
import Alerts from '../../config/alerts';
import DBData from '../../config/DBData';

export default function UserDataCard({designation, email, name, phone, id, type,marginBottom}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [DirectoryState, setDirectoryState, directoryActions] =
    useContext(DirectoryContext);

  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 15,
          padding: 15,
          marginLeft: 15,
          marginRight: 15,
          marginTop: 10,
          marginBottom: marginBottom
        }}>
        <TextRow title="Name" data={name} />
        <TextRow title="Designation" data={designation} />
        <TextRow title="Email" data={email} />
        <TextRow title="Phone" data={phone} />
        {AppAuthState.isAdmin ? (
          <View style={{position: 'absolute', right: 15, bottom: 15}}>
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
                      directoryActions
                        .remove(id, type)
                        .then(v => {})
                        .catch(e => {
                          Alert.alert(Errors.SOMETHING_WENT_WRONG);
                        }),
                  },
                ]);
              }}>
              <Icon name={'delete'} size={20} color={AppColors.black} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </>
  );
}
const styles = StyleSheet.create({});
