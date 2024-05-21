import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView} from '@react-navigation/drawer';

import DrawerHeader from '../../drawerHeader/DrawerHeader';
import DrawerItem from './DrawerItem';
import drawerItemsList from './misc/drawerItemsList';
import LogoutButton from './../../common/LogoutButton';
import {AppAuthContext} from '../../../context/app/AppAuthContext';

export function CustomDrawer(props) {
  const staffExludeList = ['Progress', 'Payment Methods'];
  const adminExludeList = ['Payment Methods', 'LMS'];

  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);

  return (
    <View style={styles.container}>
      <DrawerHeader />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContainer}>
          <Drawer.Section>
            {drawerItemsList.map(data => {
              if (
                staffExludeList.includes(data.title) &&
                AppAuthState.isStaff
              ) {
                return null;
              } else if (
                adminExludeList.includes(data.title) &&
                AppAuthState.isAdmin
              ) {
                return null;
              } else {
                return (
                  <DrawerItem props={props} data={data} key={data.title} />
                );
              }
            })}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingRight: 80,
          paddingLeft: 80,
        }}>
        <LogoutButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});
