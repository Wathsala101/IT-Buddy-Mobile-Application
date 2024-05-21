import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';
import LocalStorage from '../../../config/LocalStorage';
import StorageKeys from '../../../config/StorageKeys';

export const StudentLoginContext = createContext();

export const StudentLoginProvider = props => {
  const [studentLoginState, setStudentLoginState] = useState({
    isSubmitting: false,
    email: '',
    password: '',
  });

  const updateEmail = email => {
    setStudentLoginState({...studentLoginState, email: email});
  };

  const updatePassword = password => {
    setStudentLoginState({...studentLoginState, password: password});
  };

  const _reset = () => {
    setStudentLoginState({
      isSubmitting: false,
      email: '',
      password: '',
    });
  };

  const signIn = () => {
    setStudentLoginState({
      ...studentLoginState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateEmail(studentLoginState.email)) {
        setStudentLoginState({
          ...studentLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (!Validators.validatePassword(studentLoginState.password)) {
        setStudentLoginState({
          ...studentLoginState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PASSWORD);
        return;
      }

      try {
        database()
          .ref(DBData.studentRoot)
          .orderByChild('email')
          .equalTo(studentLoginState.email.toLowerCase())
          .on(
            'value',
            function (snapshot) {
              setStudentLoginState({
                ...studentLoginState,
                isSubmitting: false,
              });
              if (snapshot.val() == null) {
                reject(Errors.EMAIL_DOES_NOT_EXIST);
              } else {
                snapshot.forEach(function (data) {
                  if (
                    data.child('password').val() == studentLoginState.password
                  ) {
                    const storeData = {
                      isLoggedIn: true,
                      role: 'student',
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
                    setStudentLoginState({
                      ...studentLoginState,
                      isSubmitting: false,
                    });
                    reject(Errors.PASSWORD_INCORRECT);
                  }
                });
              }
            },
            e => {
              setStudentLoginState({
                ...studentLoginState,
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
    <StudentLoginContext.Provider
      value={[studentLoginState, setStudentLoginState, actions]}>
      {props.children}
    </StudentLoginContext.Provider>
  );
};
