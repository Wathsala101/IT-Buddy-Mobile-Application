import React, { useRef } from "react";
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AppColors from '../../config/colors';

export default function TodoCard({
  title,
  description,
  textColor,
  backgroundColor,
  onPress
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 15,
          backgroundColor: backgroundColor,
          borderRadius: 10,
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 15, color: AppColors.white}}>{title}</Text>
        <Text style={{color: AppColors.white}}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({});
