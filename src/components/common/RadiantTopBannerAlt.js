import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import AppColors from '../../config/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import AppImages from '../../config/images';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function RadiantTopBannerAlt({title, icon, onPress = () => {}}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={AppImages.topBannerContainer}
        style={{width: '100%'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Icon name={icon} size={30} color={AppColors.black} />
          {AppAuthState.isAdmin &&
          (title == 'Food' || title == 'Beverages' || title == 'Grocery') ? (
            <TouchableOpacity onPress={onPress}>
              <IconAntDesign
                name={'pluscircleo'}
                size={30}
                color={AppColors.black}
              />
            </TouchableOpacity>
          ) : null}
          <Text style={styles.text}>{title}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.secondoryBlue,
    width: '100%',
  },
  text: {
    paddingLeft: 12,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
