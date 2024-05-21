import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const ProgressContext = createContext();

export const ProgressProvider = props => {
  const [ProgressState, setProgressState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData(email) {
    setProgressState({...ProgressState, isLoading: true});
    try {
      database()
        .ref(DBData.progressRoot)
        .orderByChild('studentemail')
        .equalTo(email)
        .on(
          'value',
          function (snapshot) {
            snapshot.forEach(function (data) {
              setProgressState({
                error: undefined,
                data: data.val(),
                isLoading: false,
              });
            });
          },
          e => {
            setProgressState({
              ...ProgressState,
              error: true,
            });
          },
        );
    } catch (e) {
      setProgressState({
        ...ProgressState,
        error: true,
      });
    }
  }

  const getAllData = () => {
    setProgressState({...ProgressState, isLoading: true});

    try {
      database()
        .ref(DBData.progressRoot)
        .on('value', snapshot => {
          console.log(Object.keys(snapshot.val()).map(k => snapshot.val()[k]))
          setProgressState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setProgressState({
        ...ProgressState,
        error: true,
        isLoading: false,
      });
    }
  };

  const reset = () => {
    setProgressState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    getAllData: getAllData,
  };

  return (
    <ProgressContext.Provider
      value={[ProgressState, setProgressState, actions]}>
      {props.children}
    </ProgressContext.Provider>
  );
};
