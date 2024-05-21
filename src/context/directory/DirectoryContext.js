import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const DirectoryContext = createContext();

export const DirectoryProvider = props => {
  const [DirectoryState, setDirectoryState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData(type) {
    setDirectoryState({...DirectoryState, isLoading: true});

    try {
      database()
        .ref(type)
        .on('value', snapshot => {
          setDirectoryState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setDirectoryState({
        ...DirectoryState,
        error: true,
        isLoading: false,
      });
    }
  }

  const remove = async(id, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        await database().ref(`${type}/${id}`).remove();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  const reset = () => {
    setDirectoryState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    remove: remove
  };

  return (
    <DirectoryContext.Provider
      value={[DirectoryState, setDirectoryState, actions]}>
      {props.children}
    </DirectoryContext.Provider>
  );
};
