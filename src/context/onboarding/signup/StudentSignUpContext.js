import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';

export const StudentSignUpContext = createContext();

export const StudentSignUpProvider = props => {
  const [studentSignupState, setStudentSignupState] = useState({
    isSubmitting: false,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFullName = fullName => {
    setStudentSignupState({...studentSignupState, fullName: fullName});
  };

  const updateEmail = email => {
    setStudentSignupState({...studentSignupState, email: email});
  };

  const updatePassword = password => {
    setStudentSignupState({...studentSignupState, password: password});
  };

  const updateConfirmPassword = confirmPassword => {
    setStudentSignupState({
      ...studentSignupState,
      confirmPassword: confirmPassword,
    });
  };

  const reset = () => {
    setStudentSignupState({
      isSubmitting: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const signUp = () => {
    setStudentSignupState({
      ...studentSignupState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateName(studentSignupState.fullName)) {
        setStudentSignupState({
          ...studentSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_USER_FULL_NAME);
        return;
      }

      if (!Validators.validateEmail(studentSignupState.email)) {
        setStudentSignupState({
          ...studentSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (
        !Validators.validatePassword(studentSignupState.password) &&
        !Validators.validatePassword(studentSignupState.confirmPassword)
      ) {
        setStudentSignupState({
          ...studentSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PASSWORDALT);
        return;
      }

      if (
        !Validators.validatePasswordMatch(
          studentSignupState.password,
          studentSignupState.confirmPassword,
        )
      ) {
        setStudentSignupState({
          ...studentSignupState,
          isSubmitting: false,
        });
        reject(Errors.PASSWORD_MISMATCHED);
        return;
      }

      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${DBData.studentRoot}/${id}`)
          .set({
            id: id,
            fullName: studentSignupState.fullName,
            email: studentSignupState.email.toLowerCase(),
            password: studentSignupState.password,
          })
          .then(() => resolve('Data set.'))
          .catch(err => reject(Errors.FIREBASE_ERROR))
          .finally(() => {
            reset();
          });
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updateFullName,
    updateEmail,
    updatePassword,
    updateConfirmPassword,
    signUp,
  };

  return (
    <StudentSignUpContext.Provider
      value={[studentSignupState, setStudentSignupState, actions]}>
      {props.children}
    </StudentSignUpContext.Provider>
  );
};
