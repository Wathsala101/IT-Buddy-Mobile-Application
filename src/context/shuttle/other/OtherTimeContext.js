import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';

export const OtherTimeContext = createContext();

export const OtherTimeProvider = props => {
  const [OtherTimeState, setOtherTimeState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData() {
    setOtherTimeState({...OtherTimeState, isLoading: true});

    try {
      database()
        .ref(DBData.shuttleOtherRoot)
        .on('value', snapshot => {
          setOtherTimeState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setOtherTimeState({
        ...OtherTimeState,
        error: true,
        isLoading: false,
      });
    }
  }

  const deleteById = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await database().ref(`${DBData.shuttleOtherRoot}/${id}`).remove();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  const reset = () => {
    setOtherTimeState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    deleteById: deleteById
  };

  return (
    <OtherTimeContext.Provider
      value={[OtherTimeState, setOtherTimeState, actions]}>
      {props.children}
    </OtherTimeContext.Provider>
  );
};
