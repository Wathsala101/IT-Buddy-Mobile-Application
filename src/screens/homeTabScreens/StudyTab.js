import React, {useContext} from 'react';
import {Image, View, StyleSheet, ScrollView, Linking} from 'react-native';
import RadiantTopBannerAlt from '../../components/common/RadiantTopBannerAlt';
import HomeTile from '../../components/homeTabScreens/HomeTile';
import AppImages from '../../config/images';
import {AppAuthContext} from '../../context/app/AppAuthContext';

export default function StudyTab({navigation}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View>
        <RadiantTopBannerAlt title="Study Corner" />
        <Image style={styles.tinyLogo} source={AppImages.studyCornerBanner} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 55,
            paddingRight: 55,
            justifyContent: AppAuthState.isAdmin ? 'center' : 'space-between',
            marginTop: -20,
          }}>
          <HomeTile
            icon="bookshelf"
            title="Library"
            onPress={() => navigation.navigate('Library')}
          />
          {!AppAuthState.isAdmin ? (
            <HomeTile
              icon="clipboard-list-outline"
              title="To-do-list"
              onPress={() => navigation.navigate('Todo')}
            />
          ) : null}
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
            icon="linkedin"
            title="LMS"
            onPress={() => {
              Linking.openURL('https://lms.sltc.ac.lk/');
            }}
          />
          <HomeTile
            icon="monitor-dashboard"
            title="Courses"
            onPress={() => navigation.navigate('Courses')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: 200,
  },
});
