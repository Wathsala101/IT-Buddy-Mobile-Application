import React, {createContext, useEffect, useState} from 'react';
import LocalStorage from '../../config/LocalStorage';

export const AppAuthContext = createContext();

export const AppAuthProvider = props => {
  useEffect(() => {
    appStart();
  }, []);

  const [AppAuthState, setAppAuthState] = useState({
    isloggedIn: false,
    isAdmin: false,
    isStudent: false,
    isStaff: false,
    userName: '',
    email: '',
    id: ''
  });

  const logIn = (email, userName, isAdmin, isStudent, isStaff, id) => {
    setAppAuthState({
      isloggedIn: true,
      isAdmin: isAdmin,
      isStudent: isStudent,
      isStaff: isStaff,
      userName: userName,
      email: email,
      id: id
    });
  };

  const logOut = () => {
    return new Promise((resolve, reject) => {
      LocalStorage.clear()
        .then(() => {
          setAppAuthState({...AppAuthState, isloggedIn: false});
          resolve();
        })
        .catch(e => reject(e));
    });
  };

  const appStart = () => {
    LocalStorage.read('userLocalData', true).then(value => {
      if (value['isLoggedIn'] == true) {
        setAppAuthState({
          isloggedIn: true,
          userName: value['name'],
          email: value['email'],
          id: value['id'],
          isAdmin: value['role'] == 'admin' ? true : false,
          isStudent: value['role'] == 'student' ? true : false,
          isStaff: value['role'] == 'staff' ? true : false,
        });
      }
    });
  };

  const actions = {
    logIn,
    logOut,
    appStart,
  };

  return (
    <AppAuthContext.Provider value={[AppAuthState, setAppAuthState, actions]}>
      {props.children}
    </AppAuthContext.Provider>
  );
};
