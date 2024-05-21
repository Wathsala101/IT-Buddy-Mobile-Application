import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';
import LocalStorage from '../../../config/LocalStorage';
import StorageKeys from '../../../config/StorageKeys';

export const AdminLoginContext = createContext();

export const AdminLoginProvider = props => {
  const [AdminLoginState, setAdminLoginState] = useState({
    isSubmitting: false,
    email: '',
    password: '',
  });

  const updateEmail = email => {
    setAdminLoginState({...AdminLoginState, email: email});
  };

  const updatePassword = password => {
    setAdminLoginState({...AdminLoginState, password: password});
  };

  const _reset = () => {
    setAdminLoginState({
      isSubmitting: false,
      email: '',
      password: '',
    });
  };

  const signIn = () => {
    setAdminLoginState({
      ...AdminLoginState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateEmail(AdminLoginState.email)) {
        setAdminLoginState({
          ...AdminLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (!Validators.validatePassword(AdminLoginState.password)) {
        setAdminLoginState({
          ...AdminLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PASSWORD);
        return;
      }

      try {
        database()
          .ref(DBData.adminRoot)
          .orderByChild('email')
          .equalTo(AdminLoginState.email.toLowerCase())
          .on(
            'value',
            function (snapshot) {
              setAdminLoginState({
                ...AdminLoginState,
                isSubmitting: false,
              });
              if (snapshot.val() == null) {
                reject(Errors.EMAIL_DOES_NOT_EXIST);
              } else {
                snapshot.forEach(function (data) {
                  if (
                    data.child('password').val() == AdminLoginState.password
                  ) {
                    const storeData = {
                      isLoggedIn: true,
                      role: 'admin',
                      email: data.child('email').val(),
                      name: data.child('fullName').val(),
                    };

                    LocalStorage.write(
                      StorageKeys.USER_LOCAL_DATA,
                      storeData,
                      true,
                    )
                      .then(val => resolve(data))
                      .catch(e => reject(Errors.SOMETHING_WENT_WRONG));
                  } else {
                    setAdminLoginState({
                      ...AdminLoginState,
                      isSubmitting: false,
                    });
                    reject(Errors.PASSWORD_INCORRECT);
                  }
                });
              }
            },
            e => {
              setAdminLoginState({
                ...AdminLoginState,
                isSubmitting: false,
              });
              reject(Errors.SOMETHING_WENT_WRONG);
            },
          );
      } catch (e) {
        _reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updateEmail,
    updatePassword,
    signIn,
  };

  return (
    <AdminLoginContext.Provider
      value={[AdminLoginState, setAdminLoginState, actions]}>
      {props.children}
    </AdminLoginContext.Provider>
  );
};
