import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const CanteenContext = createContext();

export const CanteenProvider = props => {
  const [CanteenState, setCanteenState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData(type) {
    setCanteenState({...CanteenState, isLoading: true});

    try {
      database()
        .ref(type)
        .on('value', snapshot => {
          setCanteenState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setCanteenState({
        ...CanteenState,
        error: true,
        isLoading: false,
      });
    }
  }

  const reset = () => {
    setCanteenState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
  };

  return (
    <CanteenContext.Provider
      value={[CanteenState, setCanteenState, actions]}>
      {props.children}
    </CanteenContext.Provider>
  );
};
