import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';

export const StaffSignUpContext = createContext();

export const StaffSignUpProvider = props => {
  const [StaffSignupState, setStaffSignupState] = useState({
    isSubmitting: false,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFullName = fullName => {
    setStaffSignupState({...StaffSignupState, fullName: fullName});
  };

  const updateEmail = email => {
    setStaffSignupState({...StaffSignupState, email: email});
  };

  const updatePassword = password => {
    setStaffSignupState({...StaffSignupState, password: password});
  };

  const updateConfirmPassword = confirmPassword => {
    setStaffSignupState({
      ...StaffSignupState,
      confirmPassword: confirmPassword,
    });
  };

  const reset = () => {
    setStaffSignupState({
      isSubmitting: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const signUp = () => {
    setStaffSignupState({
      ...StaffSignupState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateName(StaffSignupState.fullName)) {
        setStaffSignupState({
          ...StaffSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_USER_FULL_NAME);
        return;
      }

      if (!Validators.validateEmail(StaffSignupState.email)) {
        setStaffSignupState({
          ...StaffSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (
        !Validators.validatePassword(StaffSignupState.password) &&
        !Validators.validatePassword(StaffSignupState.confirmPassword)
      ) {
        setStaffSignupState({
          ...StaffSignupState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PASSWORDALT);
        return;
      }

      if (
        !Validators.validatePasswordMatch(
          StaffSignupState.password,
          StaffSignupState.confirmPassword,
        )
      ) {
        setStaffSignupState({
          ...StaffSignupState,
          isSubmitting: false,
        });
        reject(Errors.PASSWORD_MISMATCHED);
        return;
      }

      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${DBData.staffRoot}/${id}`)
          .set({
            id: id,
            fullName: StaffSignupState.fullName,
            email: StaffSignupState.email.toLowerCase(),
            password: StaffSignupState.password,
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
    <StaffSignUpContext.Provider
      value={[StaffSignupState, setStaffSignupState, actions]}>
      {props.children}
    </StaffSignUpContext.Provider>
  );
};
