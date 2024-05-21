import React, {createContext, useEffect, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';
import Validators from '../../validators/Validators';
import Errors from '../../config/errors';

export const AnnouncementContext = createContext();

export const AnnouncementProvider = props => {
  const [AnnouncementState, setAnnouncementState] = useState({
    isLoading: false,
    data: [],
    error: undefined,
    time: '',
    title: '',
    platform: '',
    id: '',
  });

  const updateData = (title, time, platform, id) => {
    setAnnouncementState({
      ...AnnouncementState,
      title: title,
      time: time,
      platform: platform,
      id: id,
    });
  };

  const updateTitle = title => {
    setAnnouncementState({...AnnouncementState, title: title});
  };

  const updateId = id => {
    setAnnouncementState({...AnnouncementState, title: id});
  };

  const updateTime = time => {
    setAnnouncementState({...AnnouncementState, time: time});
  };

  const updatePlatform = platform => {
    setAnnouncementState({...AnnouncementState, platform: platform});
  };

  const updateAnnouncementData = () => {
    setAnnouncementState({
      ...AnnouncementState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateStringNotEmpty(AnnouncementState.time)) {
        setCredentialsState({
          ...CredentialsState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_ANNOUNCEMENT_TIME);
        return;
      }

      if (!Validators.validateStringNotEmpty(AnnouncementState.title)) {
        setCredentialsState({
          ...CredentialsState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_ANNOUNCEMENT_TITLE);
        return;
      }

      if (!Validators.validateStringNotEmpty(AnnouncementState.platform)) {
        setCredentialsState({
          ...CredentialsState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_ANNOUNCEMENT_PLATFORM);
        return;
      }

      try {
        database()
          .ref(`${DBData.announcementRoot}/${AnnouncementState.id}`)
          .update({
            time: AnnouncementState.time,
            title: AnnouncementState.title,
            platform: AnnouncementState.platform,
          })
          .then(() => resolve('Data updated.'));
      } catch (e) {
        reset();
        reject(Errors.SOMETHING_WENT_WRONG);
      }
    });
  };

  function getData() {
    setAnnouncementState({...AnnouncementState, isLoading: true});

    try {
      database()
        .ref(DBData.announcementRoot)
        .on('value', snapshot => {
          setAnnouncementState({
            ...AnnouncementState,
            data: Object.keys(snapshot.val()).map(k => snapshot.val()[k]),
            error: undefined,
            isLoading: false,
          });
        });
    } catch (e) {
      setAnnouncementState({
        ...AnnouncementState,
        error: true,
      });
    }
  }

  const reset = () => {
    setAnnouncementState({
      isLoading: false,
      data: [],
      error: undefined,
      time: '',
      title: '',
      platform: '',
    });
  };

  const actions = {
    getData: getData,
    reset: reset,
    updateTitle: updateTitle,
    updateTime: updateTime,
    updatePlatform: updatePlatform,
    updateAnnouncementData: updateAnnouncementData,
    updateData: updateData,
    updateId: updateId,
  };

  return (
    <AnnouncementContext.Provider
      value={[AnnouncementState, setAnnouncementState, actions]}>
      {props.children}
    </AnnouncementContext.Provider>
  );
};
