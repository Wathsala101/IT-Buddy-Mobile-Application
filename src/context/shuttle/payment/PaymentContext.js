import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';

export const ShuttlePatmentContext = createContext();

export const ShuttlePatmentProvider = props => {
  const [ShuttlePatmentState, setShuttlePatmentState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData() {
    setShuttlePatmentState({...ShuttlePatmentState, isLoading: true});

    try {
      database()
        .ref(DBData.shuttlePayementRoot)
        .on('value', snapshot => {
          setShuttlePatmentState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setShuttlePatmentState({
        ...ShuttlePatmentState,
        error: true,
        isLoading: false,
      });
    }
  }

  const remove = id => {
    return new Promise(async (resolve, reject) => {
      try {
        await database().ref(`${DBData.shuttlePayementRoot}/${id}`).remove();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const reset = () => {
    setShuttlePatmentState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    remove: remove,
  };

  return (
    <ShuttlePatmentContext.Provider
      value={[ShuttlePatmentState, setShuttlePatmentState, actions]}>
      {props.children}
    </ShuttlePatmentContext.Provider>
  );
};
