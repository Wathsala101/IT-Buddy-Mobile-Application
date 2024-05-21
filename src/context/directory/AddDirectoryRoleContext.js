import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';
import Errors from '../../config/errors';
import Validators from '../../validators/Validators';

export const AddDirectoryRoleContext = createContext();

export const AddDirectoryRoleProvider = props => {
  const [AddDirectoryRoleState, setAddDirectoryRoleState] = useState({
    isSubmitting: false,
    email: '',
    name: '',
    designation: '',
    phone: '',
  });

  const updateName = name => {
    setAddDirectoryRoleState({...AddDirectoryRoleState, name: name});
  };

  const updateEmail = email => {
    setAddDirectoryRoleState({...AddDirectoryRoleState, email: email});
  };

  const updateDesignation = designation => {
    setAddDirectoryRoleState({
      ...AddDirectoryRoleState,
      designation: designation,
    });
  };

  const updatePhone = phone => {
    setAddDirectoryRoleState({...AddDirectoryRoleState, phone: phone});
  };

  const reset = () => {
    setAddDirectoryRoleState({
      isSubmitting: false,
      email: '',
      name: '',
      designation: '',
      phone: '',
    });
  };

  const addRole = type => {
    setAddDirectoryRoleState({
      ...AddDirectoryRoleState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateName(AddDirectoryRoleState.name)) {
        setAddDirectoryRoleState({
          ...AddDirectoryRoleState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_USER_NAME);
        return;
      }

      if (!Validators.validateEmail(AddDirectoryRoleState.email)) {
        setAddDirectoryRoleState({
          ...AddDirectoryRoleState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_EMAIL);
        return;
      }

      if (!Validators.validateName(AddDirectoryRoleState.designation)) {
        setAddDirectoryRoleState({
          ...AddDirectoryRoleState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_DESIGNATION);
        return;
      }

      if (!Validators.validateMobileNumber(AddDirectoryRoleState.phone)) {
        setAddDirectoryRoleState({
          ...AddDirectoryRoleState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_MOBILE_NUMBER);
        return;
      }

      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${type}/${id}`)
          .set({
            id: id,
            designation: AddDirectoryRoleState.designation,
            email: AddDirectoryRoleState.email,
            name: AddDirectoryRoleState.name,
            phone: AddDirectoryRoleState.phone,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updateName,
    updateEmail,
    updateDesignation,
    updatePhone,
    addRole,
    reset,
  };

  return (
    <AddDirectoryRoleContext.Provider
      value={[AddDirectoryRoleState, setAddDirectoryRoleState, actions]}>
      {props.children}
    </AddDirectoryRoleContext.Provider>
  );
};
