import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';
import LocalStorage from '../../../config/LocalStorage';
import StorageKeys from '../../../config/StorageKeys';

export const StaffLoginContext = createContext();

export const StaffLoginProvider = props => {
  const [StaffLoginState, setStaffLoginState] = useState({
    isSubmitting: false,
    email: '',
    password: '',
  });

  const updateEmail = email => {
    setStaffLoginState({...StaffLoginState, email: email});
  };

  const updatePassword = password => {
    setStaffLoginState({...StaffLoginState, password: password});
  };

  const _reset = () => {
    setStaffLoginState({
      isSubmitting: false,
      email: '',
      password: '',
    });
  };

  const signIn = () => {
    setStaffLoginState({
      ...StaffLoginState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateEmail(StaffLoginState.email)) {
        setStaffLoginState({
          ...StaffLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (!Validators.validatePassword(StaffLoginState.password)) {
        setStaffLoginState({
          ...StaffLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PASSWORD);
        return;
      }

      try {
        database()
          .ref(DBData.staffRoot)
          .orderByChild('email')
          .equalTo(StaffLoginState.email.toLowerCase())
          .on(
            'value',
            function (snapshot) {
              setStaffLoginState({
                ...StaffLoginState,
                isSubmitting: false,
              });
              if (snapshot.val() == null) {
                reject(Errors.EMAIL_DOES_NOT_EXIST);
              } else {
                snapshot.forEach(function (data) {
                  if (
                    data.child('password').val() == StaffLoginState.password
                  ) {
                    const storeData = {
                      isLoggedIn: true,
                      role: 'staff',
                      email: data.child('email').val(),
                      name: data.child('fullName').val(),
                      id: data.child('id').val(),
                    };

                    LocalStorage.write(
                      StorageKeys.USER_LOCAL_DATA,
                      storeData,
                      true,
                    )
                      .then(val => resolve(data))
                      .catch(e => reject(Errors.SOMETHING_WENT_WRONG));
                  } else {
                    setStaffLoginState({
                      ...StaffLoginState,
                      isSubmitting: false,
                    });
                    reject(Errors.PASSWORD_INCORRECT);
                  }
                });
              }
            },
            e => {
              setStaffLoginState({
                ...StaffLoginState,
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
    <StaffLoginContext.Provider
      value={[StaffLoginState, setStaffLoginState, actions]}>
      {props.children}
    </StaffLoginContext.Provider>
  );
};
