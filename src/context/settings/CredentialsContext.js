import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';
import Errors from '../../config/errors';
import Validators from '../../validators/Validators';

export const CredentialsContext = createContext();

export const CredentialsProvider = props => {
  const [CredentialsState, setCredentialsState] = useState({
    isSubmitting: false,
    password: '',
    newPassword: '',
  });

  const updatePassword = password => {
    setCredentialsState({...CredentialsState, password: password});
  };

  const updateNewPassword = newPassword => {
    setCredentialsState({...CredentialsState, newPassword: newPassword});
  };

  const reset = () => {
    setCredentialsState({
      isSubmitting: false,
      name: '',
      price: '',
    });
  };

  const changePassword = (type, id) => {
    setCredentialsState({
      ...CredentialsState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (
        !Validators.validatePasswordMatch(
          CredentialsState.password,
          CredentialsState.newPassword,
        )
      ) {
        setCredentialsState({
          ...CredentialsState,
          isSubmitting: false,
        });
        reject(Errors.PASSWORD_MISMATCHED);
        return;
      }

      try {
        database()
          .ref(`${type}/${id}`)
          .update({
            password: CredentialsState.newPassword,
          })
          .then(() => resolve('Data updated.'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updatePassword,
    updateNewPassword,
    changePassword,
    reset,
  };

  return (
    <CredentialsContext.Provider
      value={[CredentialsState, setCredentialsState, actions]}>
      {props.children}
    </CredentialsContext.Provider>
  );
};
