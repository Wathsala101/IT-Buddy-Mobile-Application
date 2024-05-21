import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';

export const SurveyContext = createContext();

export const SurveyProvider = props => {
  const [SurveyState, setSurveyState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
    description: '',
    id: '',
  });

  const updateDescription = description => {
    setSurveyState({...SurveyState, description: description});
  };

  const updateId = id => {
    setSurveyState({...SurveyState, id: id});
  };

  function getData() {
    setSurveyState({...SurveyState, isLoading: true});

    try {
      database()
        .ref(DBData.surveyRoot)
        .on('value', snapshot => {
          setSurveyState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setSurveyState({
        ...SurveyState,
        error: true,
        isLoading: false,
      });
    }
  }

  const removeSurvey = id => {
    return new Promise(async (resolve, reject) => {
      try {
        await database().ref(`${DBData.surveyRoot}/${id}`).remove();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };

  const addSurvey = id => {
    setSurveyState({
      ...SurveyState,
      isSubmitting: true,
    });
    return new Promise(async (resolve, reject) => {
      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${DBData.surveyRoot}/${id}`)
          .set({
            id: id,
            description: SurveyState.description,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const updateSurvey = id => {
    setSurveyState({
      ...SurveyState,
      isSubmitting: true,
    });
    return new Promise(async (resolve, reject) => {
      try {
        database()
          .ref(`${DBData.surveyRoot}/${id}`)
          .update({
            description: SurveyState.description,
          })
          .then(() => resolve('Data updated.'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const reset = () => {
    setSurveyState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    removeSurvey: removeSurvey,
    updateDescription: updateDescription,
    updateSurvey: updateSurvey,
    updateId: updateId,
    addSurvey: addSurvey
  };

  return (
    <SurveyContext.Provider value={[SurveyState, setSurveyState, actions]}>
      {props.children}
    </SurveyContext.Provider>
  );
};
