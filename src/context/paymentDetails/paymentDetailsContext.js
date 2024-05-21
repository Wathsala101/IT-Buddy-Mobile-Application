import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const PaymentDetailsContext = createContext();

export const PaymentDetailsProvider = props => {
  const [PaymentDetailsState, setPaymentDetailsState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData() {
    setPaymentDetailsState({...PaymentDetailsState, isLoading: true});

    try {
      database()
        .ref(DBData.paymentDetailsRoot)
        .on('value', snapshot => {
          setPaymentDetailsState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setPaymentDetailsState({
        ...PaymentDetailsState,
        error: true,
        isLoading: false,
      });
    }
  }

  const reset = () => {
    setPaymentDetailsState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
  };

  return (
    <PaymentDetailsContext.Provider
      value={[PaymentDetailsState, setPaymentDetailsState, actions]}>
      {props.children}
    </PaymentDetailsContext.Provider>
  );
};
