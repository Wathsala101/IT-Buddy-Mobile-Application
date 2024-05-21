import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CommonButton({
  onPressed,
  text,
  withIcon = true,
  buttonColor = AppColors.primaryBlue,
  textColor = AppColors.white
}) {
  return (
    <TouchableOpacity
      onPress={onPressed}
      style={[styles.ButtonContainer, {backgroundColor: buttonColor}]}>
      <View style={styles.innerContainer}>
        <Text style={[styles.textTitle, {marginRight: !withIcon ? 0 : 40, color: textColor,}]}>
          {text}
        </Text>
        {!withIcon ? null : (
          <Icon name="arrow-forward" size={20} color={textColor} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 50,
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
    fontWeight: 'bold',
    fontSize: 15,
  },
});
