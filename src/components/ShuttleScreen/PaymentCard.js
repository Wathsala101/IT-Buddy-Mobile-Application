import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import Alerts from '../../config/alerts';
import AppColors from '../../config/colors';
import Errors from '../../config/errors';
import {AppAuthContext} from '../../context/app/AppAuthContext';
import {ShuttlePatmentContext} from '../../context/shuttle/payment/PaymentContext';

export default function PaymentCard({route, priceFull, priceHalf, id}) {
  const [AppAuthState, setAppAuthState, actions] = useContext(AppAuthContext);
  const [ShuttlePatmentState, setShuttlePatmentState, shuttleActions] =
    useContext(ShuttlePatmentContext);
  return (
    <View
      style={{
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <View>
        <Text>{route}</Text>
      </View>
      <View>
        <Text>Full ride</Text>
        <Text>Half ride</Text>
      </View>
      <View>
        <Text>{priceFull}</Text>
        <Text>{priceHalf}</Text>
      </View>
      {AppAuthState.isAdmin ? (
        <View style={{position: 'absolute', right: -50}}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Alert', Alerts.DELETE_ITEM, [
                {
                  text: 'Cancel',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () =>
                    shuttleActions
                      .remove(id)
                      .then(v => {})
                      .catch(e => {
                        Alert.alert(Errors.SOMETHING_WENT_WRONG);
                      }),
                },
              ]);
            }}>
            <Icon name={'delete'} size={20} color={AppColors.black} />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({});
