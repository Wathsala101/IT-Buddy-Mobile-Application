import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AppColors from '../../config/colors';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BottomModalSheet({title, data, navigation, type, additional}) {
  const [checked, setChecked] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{color: AppColors.white, fontSize: 30, textAlign: 'left'}}>
            {title}
          </Text>
          <Text
            style={{color: AppColors.white, fontSize: 10, textAlign: 'left'}}>
            {data.length} tasks
          </Text>
        </View>
        <View>
          {checked != '' ? (
            <TouchableOpacity
              onPress={() => {
                additional();
                navigation.navigate('screenAdd', {
                  description: description,
                  id: checked.toString(),
                  type: type
                });
              }}>
              <Icon name={'edit'} size={30} color={AppColors.white} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={data => data.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setChecked(item.id);
              setDescription(item.details);
            }}>
            <View
              style={{
                paddingTop: 20,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
              }}>
              <RadioButton
                color={'black'}
                value="student"
                status={checked == item.id ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(item.id);
                  setDescription(item.details);
                }}
              />
              <Text style={{fontSize: 15}}>{item.details}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({});
