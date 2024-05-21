import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CommonButtonAlt({onPressed, text, withIcon = true}) {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.ButtonContainer}>
      <View style={styles.innerContainer}>
        <Text style={styles.textTitle}>{text}</Text>
        {!withIcon ? null : (
          <Icon name="arrow-forward" size={20} color={AppColors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 20,
    backgroundColor: AppColors.primaryBlue,
    padding: 15,
    width: 240,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  textTitle: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
