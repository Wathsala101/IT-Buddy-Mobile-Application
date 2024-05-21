import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {AppAuthContext} from './../../../src/context/app/AppAuthContext';
import Errors from '../../config/errors';

export default function LogoutButton() {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);

  return (
    <TouchableOpacity
      onPress={() => {
        actions
          .logOut()
          .then(() => {})
          .catch(e => Alert.alert(Errors.SOMETHING_WENT_WRONG));
      }}
      style={styles.ButtonContainer}>
      <View style={styles.innerContainer}>
        <Icon name="power" size={20} color={AppColors.white} />
        <Text style={styles.text}>Logout</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 50,
    backgroundColor: AppColors.primaryBlue,
    padding: 5,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 15,
  },
});
