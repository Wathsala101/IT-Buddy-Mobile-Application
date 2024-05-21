import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import AppImages from '../../config/images';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import AppColors from '../../config/colors';
import Alerts from '../../config/alerts';

//context
import {AddDirectoryRoleContext} from '../../context/directory/AddDirectoryRoleContext';
import {AddCanteenFoodContext} from '../../context/canteen/AddCanteenFoodContext';
import {CanteenContext} from '../../context/canteen/CanteenContext';
import DBData from '../../config/DBData';

const AddFoodScreen = ({navigation, route}) => {
  const [AddCanteenFoodState, setAddCanteenFoodState, actionsAddCanteenFood] =
    useContext(AddCanteenFoodContext);
  const [CanteenState, setCanteenState, actions] = useContext(CanteenContext);

  const getFoodType = () => {
    switch (route.params.type) {
      case DBData.foodRoot:
        return 'food';
      case DBData.beveragesRoot:
        return 'beverage';
      case DBData.groceryRoot:
        return 'grocery';
    }
  };

  useEffect(() => {
    actionsAddCanteenFood.reset();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>Add new {getFoodType()}</Text>
          <CommonInputWithLabel
            label={`${getFoodType()} name`}
            placeHolder={`Enter ${getFoodType()}'s name`}
            onChanged={actionsAddCanteenFood.updateName}
            type={'default'}
            value={AddCanteenFoodState.name}
          />
          <CommonInputWithLabel
            label={`${getFoodType()} price`}
            onChanged={actionsAddCanteenFood.updatePrice}
            placeHolder={`Enter ${getFoodType()}'s price`}
            type={'email-address'}
            value={AddCanteenFoodState.price}
          />
          <View style={styles.commonButtonContainer}>
            {AddCanteenFoodState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'ADD'}
                onPressed={() => {
                  actionsAddCanteenFood
                    .addFood(route.params.type)
                    .then(success => {
                      Alert.alert('Success', Alerts.ADD_FOOD_COMPLETE, [
                        {
                          text: 'OK',
                          onPress: () => {
                            navigation.navigate('screen1');
                            actions.reset();
                            actions.getData(route.params.type);
                          },
                        },
                      ]);
                    })
                    .catch(err => {
                      Alert.alert(err);
                    });
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  outerContainer: {
    marginTop: 60,
    paddingLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  commonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  otherLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'grey',
  },
  googleLogin: {
    width: 250,
    height: 60,
  },
  bottomPartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLabel: {
    color: 'blue',
    marginBottom: 100,
  },
});

export default AddFoodScreen;
