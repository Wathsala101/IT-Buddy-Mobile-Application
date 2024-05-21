import React, {createContext, useState} from 'react';
import database from '@react-native-firebase/database';
import DBData from '../../config/DBData';
import Errors from '../../config/errors';
import Validators from '../../validators/Validators';

export const AddCanteenFoodContext = createContext();

export const AddCanteenFoodProvider = props => {
  const [AddCanteenFoodState, setAddCanteenFoodState] = useState({
    isSubmitting: false,
    name: '',
    price: '',
  });

  const updateName = name => {
    setAddCanteenFoodState({...AddCanteenFoodState, name: name});
  };

  const updatePrice = price => {
    setAddCanteenFoodState({...AddCanteenFoodState, price: price});
  };

  const reset = () => {
    setAddCanteenFoodState({
      isSubmitting: false,
      name: '',
      price: '',
    });
  };

  const addFood = type => {
    setAddCanteenFoodState({
      ...AddCanteenFoodState,
      isSubmitting: true,
    });

    return new Promise((resolve, reject) => {
      if (!Validators.validateName(AddCanteenFoodState.name)) {
        setAddCanteenFoodState({
          ...AddCanteenFoodState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_FOOD_NAME);
        return;
      }

      if (!Validators.validateNumber(AddCanteenFoodState.price)) {
        setAddCanteenFoodState({
          ...AddCanteenFoodState,
          isSubmitting: false,
        });
        reject(Errors.INVALID_PRICE);
        return;
      }
      
      try {
        const id = Math.round(Math.random() * 100000000000);
        database()
          .ref(`${type}/${id}`)
          .set({
            id: id,
            name: AddCanteenFoodState.name,
            price: AddCanteenFoodState.price,
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
    updatePrice,
    addFood,
    reset,
  };

  return (
    <AddCanteenFoodContext.Provider
      value={[AddCanteenFoodState, setAddCanteenFoodState, actions]}>
      {props.children}
    </AddCanteenFoodContext.Provider>
  );
};
