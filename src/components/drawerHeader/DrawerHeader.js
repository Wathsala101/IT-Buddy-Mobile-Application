import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import AppColors from '../../config/colors';
import {Avatar} from 'react-native-elements';
import { AppAuthContext } from '../../context/app/AppAuthContext';

export default function DrawerHeader() {
  const [AppAuthState, setAppAuthState, appActions] =
  useContext(AppAuthContext);

  return (
    <View style={styles.drawerHeaderContainer}>
      <View style={styles.titleSecondoryContainer}>
        <View style={{marginLeft: 15}}>
        <Avatar
          rounded
          size={130}
          source={{
            uri: 'https://as2.ftcdn.net/v2/jpg/01/06/60/69/1000_F_106606935_KVsd5V2f626fv1UvqJabxWnLAg4ExmI7.jpg',
          }}
        />
        </View>
        <Title style={styles.title}>{AppAuthState.userName}</Title>
        <Title style={{ marginLeft: 15,marginTop: -20, fontSize: 15}}>{AppAuthState.email}</Title>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerHeaderContainer: {
    padding: 0,
    backgroundColor: AppColors.white,
    marginTop: -9,
  },
  titleSecondoryContainer: {
    flexDirection: 'row',
    marginTop: 15,
    display: 'flex',
    flexDirection: "column"
  },
  title: {
    marginTop: 15,
    marginLeft: 15,
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: AppColors.black,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
