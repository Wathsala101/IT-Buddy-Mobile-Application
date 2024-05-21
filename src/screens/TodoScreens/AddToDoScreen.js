import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import CommonButtonAlt from './../../components/common/CommonButtonAlt';
import CommonInputWithLabel from '../../components/common/CommonInputWithLabel';
import AppColors from '../../config/colors';
import Alerts from '../../config/alerts';
import {TodoContext} from '../../context/todo/todoContext';
import {AppAuthContext} from '../../context/app/AppAuthContext';

//context
import {SurveyContext} from '../../context/survey/SurveyContext';
import {Picker} from '@react-native-picker/picker';
import DBData from '../../config/DBData';

const AddToDoScreen = ({navigation}) => {
  const [AppAuthState, setAppAuthState, appAuthActions] =
    useContext(AppAuthContext);
  const [TodoState, setTodoState, todoActions] = useContext(TodoContext);

  const [selectedTodoType, setSelectedTodoType] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>add todo</Text>
          <View style={{height: 20}}></View>
          <Text style={{color: AppColors.lightergrey}}>Choose todo type</Text>
          <Picker
            selectedValue={selectedTodoType}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTodoType(itemValue)
            }>
            <Picker.Item label="Personal" value={DBData.todoPersonalRoot} />
            <Picker.Item label="Hurry" value={DBData.todoHurryRoot} />
            <Picker.Item label="Shopping" value={DBData.todoShoppingRoot} />
            <Picker.Item label="University" value={DBData.todoUniversityRoot} />
            <Picker.Item label="Work" value={DBData.todoWorkRoot} />
          </Picker>
          <CommonInputWithLabel
            label={'Description'}
            placeHolder={`Enter the description`}
            onChanged={todoActions.updateDescription}
            type={'default'}
            value={TodoState.description}
            multiline={true}
          />
          <View style={styles.commonButtonContainer}>
            {TodoState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={'ADD'}
                onPressed={() => {
                  if (selectedTodoType == null) {
                    Alert.alert('Please choose a todo type');
                  } else {
                    todoActions
                      .addTodo(selectedTodoType, AppAuthState.email)
                      .then(success => {
                        Alert.alert('Success', Alerts.ADD_OTHER_DATA_COMPLETE, [
                          {
                            text: 'OK',
                            onPress: () => navigation.navigate('screen1'),
                          },
                        ]);
                      })
                      .catch(err => {
                        Alert.alert(err);
                      });
                  }
                }}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '110%',
  },
  outerContainer: {
    marginTop: 40,
    paddingLeft: 20,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 35,
  },
  commonButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  otherLoginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 24,
    color: 'grey',
  },
  googleLogin: {
    width: 250,
    height: 60,
  },
  bottomPartContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  loginLabel: {
    color: 'blue',
    marginBottom: 100,
  },
});

export default AddToDoScreen;
