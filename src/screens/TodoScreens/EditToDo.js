import React, {useContext, useEffect} from 'react';
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

//context
import Errors from '../../config/errors';
import { TodoContext } from '../../context/todo/todoContext';
import { AppAuthContext } from '../../context/app/AppAuthContext';

const TodoAddScreen = ({navigation, route}) => {
    const [todoState, settodoState, todoActions] =
    useContext(TodoContext);
    const [AppAuthState, setAppAuthState, appAuthActions] =
    useContext(AppAuthContext);


  useEffect(() => {
    todoActions.updateDescription(route.params.description);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.outerContainer}>
          <Text style={styles.header}>
            {route.params.description == 'description'
              ? 'add todo'
              : 'update todo'}
          </Text>
          <CommonInputWithLabel
            label={'to do details'}
            placeHolder={`Enter the to do details`}
            onChanged={todoActions.updateDescription}
            type={'default'}
            value={todoState.description}
            multiline={true}
          />

          <View style={styles.commonButtonContainer}>
            {todoState.isSubmitting ? (
              <ActivityIndicator size="small" color={AppColors.primaryBlue} />
            ) : (
              <CommonButtonAlt
                withIcon={false}
                text={route.params.description == 'description' ? 'ADD' : 'UPDATE'}
                onPressed={() => {
                  if (route.params.description == 'description') {
                    todoActions
                      .addTodo()
                      .then(val => {
                        todoActions.getData();
                        navigation.navigate('screen1');
                      })
                      .catch(e => Alert.alert(Errors.SOMETHING_WENT_WRONG));
                  } else {
                    todoActions
                      .updateTodo(route.params.id, route.params.type, AppAuthState.email)
                      .then(val => {
                        todoActions.getData();
                        navigation.navigate('screen1');
                      })
                      .catch(e => Alert.alert(Errors.SOMETHING_WENT_WRONG));
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

export default TodoAddScreen;
