import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppColors from '../../config/colors';
import {AppAuthContext} from './../../../src/context/app/AppAuthContext';

export default function SaveButton({onPress}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);

  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>Save</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 50,
    backgroundColor: AppColors.primarygrey,
    padding: 10,
    width: 100,
    marginTop: 30,
    marginBottom: -30,
    alignSelf: 'center',
    justifyContent: 'center',
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
