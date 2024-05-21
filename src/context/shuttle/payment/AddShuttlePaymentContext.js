import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';

export const AddShuttlePaymentContext = createContext();

export const AddShuttlePaymentProvider = props => {
  const [AddShuttlePaymentState, setAddShuttlePaymentState] = useState({
    isSubmitting: false,
    route: '',
    halfRide: '',
    fullRide: '',
  });

  const updateRoute = route => {
    setAddShuttlePaymentState({...AddShuttlePaymentState, route: route});
  };

  const updateHalfRide = halfRide => {
    setAddShuttlePaymentState({...AddShuttlePaymentState, halfRide: halfRide});
  };

  const updateFullRide = fullRide => {
    setAddShuttlePaymentState({...AddShuttlePaymentState, fullRide: fullRide});
  };

  const reset = () => {
    setAddShuttlePaymentState({
      isSubmitting: false,
      route: '',
      halfRide: '',
      fullRide: '',
    });
  };

  const AddShuttlePayment = type => {
    setAddShuttlePaymentState({
      ...AddShuttlePaymentState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateStringNotEmpty(AddShuttlePaymentState.route)) {
        setAddOtherTimeState({
          ...AddShuttlePaymentState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_ROUTE);
        return;
      }

      if (!Validators.validateNumber(AddShuttlePaymentState.fullRide)) {
        setAddOtherTimeState({
          ...AddShuttlePaymentState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_FULL_ROUTE);
        return;
      }

      if (!Validators.validateNumber(AddShuttlePaymentState.halfRide)) {
        setAddShuttlePaymentState({
          ...AddShuttlePaymentState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_HALF_ROUTE);
        return;
      }

      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${DBData.shuttlePayementRoot}/${id}`)
          .set({
            id: id,
            route: AddShuttlePaymentState.route,
            halfRide: AddShuttlePaymentState.halfRide,
            fullRide: AddShuttlePaymentState.fullRide,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updateRoute,
    updateHalfRide,
    updateFullRide,
    AddShuttlePayment,
    reset,
  };

  return (
    <AddShuttlePaymentContext.Provider
      value={[AddShuttlePaymentState, setAddShuttlePaymentState, actions]}>
      {props.children}
    </AddShuttlePaymentContext.Provider>
  );
};
