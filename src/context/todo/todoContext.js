import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';
import Errors from '../../config/errors';

export const TodoContext = createContext();

export const TodoProvider = props => {
  const [TodoState, setTodoState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
    description: '',
  });

  const updateDescription = description => {
    setTodoState({...TodoState, description: description});
  };

  const updateTodo = (id, type, email) => {
    setTodoState({
      ...TodoState,
      isSubmitting: true,
    });
    return new Promise(async (resolve, reject) => {
      try {
        database()
          .ref(`${type}/${id}`)
          .set({
            id: id,
            details: TodoState.description,
            user: email,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const addTodo = (type, email) => {
    setTodoState({
      ...TodoState,
      isSubmitting: true,
    });
    return new Promise(async (resolve, reject) => {
      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${type}/${id}`)
          .set({
            id: id,
            details: TodoState.description,
            user: email,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  function getData() {
    setTodoState({...TodoState, isLoading: true});

    try {
      database()
        .ref(DBData.todoRoot)
        .on('value', snapshot => {
          setTodoState({
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setTodoState({
        ...TodoState,
        error: true,
        isLoading: false,
      });
    }
  }

  const reset = () => {
    setTodoState({isLoading: false, data: [], error: undefined});
  };

  const actions = {
    getData: getData,
    reset: reset,
    updateDescription: updateDescription,
    updateTodo: updateTodo,
    addTodo: addTodo,
  };

  return (
    <TodoContext.Provider value={[TodoState, setTodoState, actions]}>
      {props.children}
    </TodoContext.Provider>
  );
};
