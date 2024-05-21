import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../../config/DBData';
import Errors from '../../../config/errors';
import Validators from '../../../validators/Validators';

export const AddOtherTimeContext = createContext();

export const AddOtherTimeProvider = props => {
  const [AddOtherTimeState, setAddOtherTimeState] = useState({
    isSubmitting: false,
    regNumber: '',
    driverName: '',
    driverTelNumber: '',
    startLocation: '',
    startTime: '',
  });

  const updateRegNumber = regNumber => {
    setAddOtherTimeState({...AddOtherTimeState, regNumber: regNumber});
  };

  const updateDriverName = driverName => {
    setAddOtherTimeState({...AddOtherTimeState, driverName: driverName});
  };

  const updateDriverTelNumber = driverTelNumber => {
    setAddOtherTimeState({
      ...AddOtherTimeState,
      driverTelNumber: driverTelNumber,
    });
  };

  const updateStartLocation = startLocation => {
    setAddOtherTimeState({...AddOtherTimeState, startLocation: startLocation});
  };

  const updateStartTime = startTime => {
    setAddOtherTimeState({...AddOtherTimeState, startTime: startTime});
  };

  const reset = () => {
    setAddOtherTimeState({
      isSubmitting: false,
      regNumber: '',
      driverName: '',
      driverTelNumber: '',
      startLocation: '',
      startTime: '',
    });
  };

  const addOtherData = type => {
    setAddOtherTimeState({
      ...AddOtherTimeState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateStringNotEmpty(AddOtherTimeState.regNumber)) {
        setAddOtherTimeState({
          ...AddOtherTimeState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_REG_NAME);
        return;
      }

      if (!Validators.validateName(AddOtherTimeState.driverName)) {
        setAddOtherTimeState({
          ...AddOtherTimeState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_DRIVER_NAME);
        return;
      }

      if (!Validators.validateMobileNumber(AddOtherTimeState.driverTelNumber)) {
        setAddOtherTimeState({
          ...AddOtherTimeState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_MOBILE_NUMBER);
        return;
      }

      if (!Validators.validateStringNotEmpty(AddOtherTimeState.startLocation)) {
        setAddOtherTimeState({
          ...AddOtherTimeState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_START_LOCATION);
        return;
      }

      if (!Validators.validateStringNotEmpty(AddOtherTimeState.startTime)) {
        setAddOtherTimeState({
          ...AddOtherTimeState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_START_TIME);
        return;
      }

      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${DBData.shuttleOtherRoot}/${id}`)
          .set({
            id: id,
            driverName: AddOtherTimeState.driverName,
            driverTelNumber: AddOtherTimeState.driverTelNumber,
            regNumber: AddOtherTimeState.regNumber,
            startLocation: AddOtherTimeState.startLocation,
            startTime: AddOtherTimeState.startTime,
          })
          .then(() => resolve('ok'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  const actions = {
    updateRegNumber,
    updateDriverName,
    updateDriverTelNumber,
    updateStartLocation,
    updateStartTime,
    reset,
    addOtherData
  };

  return (
    <AddOtherTimeContext.Provider
      value={[AddOtherTimeState, setAddOtherTimeState, actions]}>
      {props.children}
    </AddOtherTimeContext.Provider>
  );
};
