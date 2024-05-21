import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const LibraryContext = createContext();

export const LibraryProvider = props => {
  const [LibraryState, setLibraryState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
  });

  function getData(type) {
    setLibraryState({...LibraryState, isLoading: true});

    try {
      database()
        .ref(type)
        .on('value', snapshot => {
          setLibraryState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setLibraryState({
        ...LibraryState,
        error: true,
        isLoading: false,
      });
    }
  }

  const removeBook = id => {
    return new Promise(async (resolve, reject) => {
      try {
        await database().ref(`${DBData.resourceMaterialsRoot}/${id}`).remove();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const reset = () => {
    setLibraryState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    removeBook: removeBook,
  };

  return (
    <LibraryContext.Provider value={[LibraryState, setLibraryState, actions]}>
      {props.children}
    </LibraryContext.Provider>
  );
};
