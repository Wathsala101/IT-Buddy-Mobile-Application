import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const CalenderContext = createContext();

export const CalenderProvider = props => {
  const [CalenderState, setCalenderState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData() {
    setCalenderState({...CalenderState, isLoading: true});

    try {
      database()
        .ref(DBData.eventRoot)
        .on('value', snapshot => {
          setCalenderState({
            ...CalenderState,
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setCalenderState({
        ...CalenderState,
        error: true,
      });
    }
  }

  const reset = () => {
    setCalenderState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset
  };

  return (
    <CalenderContext.Provider
      value={[CalenderState, setCalenderState, actions]}>
      {props.children}
    </CalenderContext.Provider>
  );
};
