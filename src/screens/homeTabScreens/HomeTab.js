import React, {useState, useContext, useEffect} from 'react';
import {Text, View, ScrollView, ImageBackground} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import HomeTile from '../../components/homeTabScreens/HomeTile';
import AppImages from './../../config/images';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {AnnouncementContext} from '../../context/Announcement/AnnouncementContext';
import {CalenderContext} from '../../context/calender/CalenderContext';

export default function HomeTab({navigation}) {
  const [images, setImages] = useState([{}, {}, {}, {}, {}]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [CalenderState, setCalenderState, CalenderActions] =
    useContext(CalenderContext);

  useEffect(() => {
    CalenderActions.reset();
    CalenderActions.getData();
  }, []);

  useEffect(() => {
    let temp = [];
    CalenderState.data.forEach(val => {
      temp.push(val);
    });
    setImages(temp);
  }, [CalenderState]);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <ScrollView>
      <View style={{marginBottom: 40}}>
        <SliderBox
          images={images}
          sliderBoxHeight={200}
          onCurrentImagePressed={
            index => {}
            //console.warn(`image ${index} pressed`)
          }
          circleLoop={false}
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          currentImageEmitter={index => setCurrentIndex(index)}
          ImageComponent={() => {
            return (
              <ImageBackground
                source={AppImages.carouselBackground}
                style={{width: '100%', height: 190}}>
                <View
                  style={{
                    height: 190,
                    width: '100%',
                    backgroundColor: 'tranparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                  }}>
                  <Text style={{fontSize: 25}}>
                    {images[currentIndex].dateTime}
                  </Text>
                  <Text style={{fontSize: 15, color: 'white', marginTop: 20}}>
                    {images[currentIndex].title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      marginTop: 20,
                      marginBottom: 10,
                    }}>
                    Read more...
                  </Text>
                </View>
              </ImageBackground>
            );
          }}
          autoplay={true}
          LoaderComponent={() => {
            return null;
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingLeft: 15,
            paddingRight: 15,
            justifyContent: AppAuthState.isAdmin ? 'center' : 'space-between',
            marginTop: -20,
          }}>
          {AppAuthState.isAdmin ? null : (
            <HomeTile
              icon="calendar"
              title="Calender"
              onPress={() => {
                navigation.navigate('Calender');
              }}
            />
          )}

          <HomeTile
            icon="notifications-outline"
            title="Announcements"
            onPress={() => {
              navigation.navigate('Announcements');
            }}
          />
          <View style={{width: AppAuthState.isAdmin ? 40 : 0}}></View>
          <HomeTile
            icon="map"
            title="map"
            onPress={() => {
              navigation.navigate('Map');
            }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-between',
            marginTop: -40,
          }}>
          {AppAuthState.isStaff ? null : (
            <HomeTile
              icon="insert-chart-outlined"
              title="Progress"
              onPress={() => {
                if (AppAuthState.isAdmin) {
                  navigation.navigate('AdminProgress');
                } else {
                  navigation.navigate('Progress');
                }
              }}
            />
          )}
          {AppAuthState.isStaff ? null : (
            <HomeTile
              icon="wallet-outline"
              title="Payment Details"
              onPress={() => {
                navigation.navigate('PaymentMethod');
              }}
            />
          )}
          <HomeTile
            icon="list"
            title="Directory"
            onPress={() => {
              navigation.navigate('Directory');
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
