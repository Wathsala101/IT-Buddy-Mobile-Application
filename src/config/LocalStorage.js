import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
  static write = (key, value, isJSON = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(key, isJSON ? JSON.stringify(value) : value);
        resolve('Success');
      } catch (e) {
        reject(e);
      }
    });
  };

  static read = async (key, isJSON = false) => {
    return new Promise(async (resolve, reject) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          resolve(isJSON ? JSON.parse(value) : value);
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  static clear = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.clear();
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  };
}

export default LocalStorage;
