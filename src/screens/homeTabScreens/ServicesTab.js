import * as React from 'react';
import {Image, View, StyleSheet, ScrollView, Linking} from 'react-native';
import RadiantTopBannerAlt from '../../components/common/RadiantTopBannerAlt';
import HomeTile from '../../components/homeTabScreens/HomeTile';
import AppImages from '../../config/images';

export default function ServicesTab({navigation}) {
  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View>
        <RadiantTopBannerAlt title="Services" />
        <Image style={styles.tinyLogo} source={AppImages.serviceTabBanner} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 55,
            paddingRight: 55,
            justifyContent: 'space-between',
            marginTop: -20,
          }}>
          <HomeTile
            icon="bus-alt"
            title="Shuttle"
            onPress={() => {
              navigation.navigate('Shuttle');
            }}
          />
          <HomeTile icon="building" title="Hub" onPress={() => {Linking.openURL("https://hostels.sltc.ac.lk/")}}/>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 55,
            paddingRight: 55,
            justifyContent: 'space-between',
            marginTop: -20,
          }}>
          <HomeTile
            icon="food-bank"
            title="Canteen"
            onPress={() => {
              navigation.navigate('Canteen');
            }}
          />
          <HomeTile
            icon="clipboard-list-outline"
            title="Surveys"
            onPress={() => {
              navigation.navigate('Survey');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
  },
});
