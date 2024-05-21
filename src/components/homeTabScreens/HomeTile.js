import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppColors from '../../config/colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function HomeTile({title, icon, onPress = () => {}}) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.container}>
        {/* Home tab*/}
        {icon == 'map' ? (
          <TouchableOpacity onPress={onPress}>
            <IconEntypo name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'calendar' ? (
          <TouchableOpacity onPress={onPress}>
            <IconAntDesign name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'notifications-outline' ? (
          <TouchableOpacity onPress={onPress}>
            <IconIonicons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'insert-chart-outlined' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'wallet-outline' ? (
          <TouchableOpacity onPress={onPress}>
            <IconIonicons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'list' ? (
          <TouchableOpacity onPress={onPress}>
            <IconFeather name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}

        {/* Study tab*/}
        {icon == 'bookshelf' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'clipboard-list-outline' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'linkedin' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'monitor-dashboard' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}

        {/* Service tab*/}
        {icon == 'bus-alt' ? (
          <TouchableOpacity onPress={onPress}>
            <IconFontAwesome5 name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'building' ? (
          <TouchableOpacity onPress={onPress}>
            <IconFontAwesome5 name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'food-bank' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'checklist' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}

        {/* Services tab*/}
        {icon == 'ios-fast-food-outline' ? (
          <TouchableOpacity onPress={onPress}>
            <IconIonicons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
         {icon == 'food-fork-drink' ? (
          <TouchableOpacity onPress={onPress}>
            <IconMaterialCommunityIcons name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
        {icon == 'luggage-cart' ? (
          <TouchableOpacity onPress={onPress}>
            <IconFontAwesome5 name={icon} size={70} color="#011f4b" />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={{marginTop: 10}}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: 50,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: AppColors.white,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    elevation: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
