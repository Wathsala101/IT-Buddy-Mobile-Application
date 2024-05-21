import React, {useRef, useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AppColors from '../config/colors';
import MainHeaderLeft from '../components/layout/mainheaderLeft/MainHeaderLeft';
import MainHeaderRight from '../components/layout/mainHeaderRight/MainHeaderRight';
import RadiantTopBannerAlt from '../components/common/RadiantTopBannerAlt';
import TodoCard from '../components/TodoScreen/TodoCard';
import FloatingButton from '../components/TodoScreen/FloatingButton';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TodoContext} from '../context/todo/todoContext';
import FullScreenLoadingIndicator from '../components/common/FullScreenLoadingIndicator';
import {AppAuthContext} from '../context/app/AppAuthContext';
import BottomModalSheet from '../components/TodoScreen/BottomModalSheet';
import TodoAddScreen from './TodoScreens/EditToDo';
import DBData from '../config/DBData';
import AddToDoScreen from './TodoScreens/AddToDoScreen';

const Stack = createStackNavigator();

export default function TodoScreen({navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: AppColors.black,
        headerShown: true,
        headerTitleAlign: 'center',
        title: '',
        headerStyle: {
          backgroundColor: AppColors.white,
          elevation: 0,
        },
        headerLeft: () => <MainHeaderLeft navigation={navigation} />,
        headerRight: () => <MainHeaderRight navigation={navigation} />,
      }}>
      <Stack.Screen name="screen1" component={TodoScreen1} />
      <Stack.Screen name="screenAdd" component={TodoAddScreen} />
      <Stack.Screen name="screenAddAlt" component={AddToDoScreen} />
    </Stack.Navigator>
  );
}

const TodoScreen1 = ({navigation}) => {
  const refRBSheet = useRef();
  const [backgroundColor, setBackgroundColor] = useState(AppColors.primarygrey);
  const [title, setTitle] = useState('');
  const [type, setType] = useState(DBData.todoHurryRoot);
  const [data, setData] = useState([]);

  const [TodoState, setTodoState, actions] = useContext(TodoContext);
  const [AppAuthState, setAppAuthState, actionsAppAuth] =
    useContext(AppAuthContext);

  const [workData, setWorkData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [shopping, setShoppingData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [hurryData, setHurryData] = useState([]);

  useEffect(() => {
    actions.getData();
  }, []);

  useEffect(() => {
    if (TodoState.data[0] != undefined) {
      let work = Object.keys(TodoState.data[0])
        .map(k => TodoState.data[0][k])
        .filter(value => value['user'] == AppAuthState.email);

      setWorkData(work);

      let university = Object.keys(TodoState.data[1])
        .map(k => TodoState.data[1][k])
        .filter(value => value['user'] == AppAuthState.email);

      setUniversityData(university);

      let shopping = Object.keys(TodoState.data[2])
        .map(k => TodoState.data[2][k])
        .filter(value => value['user'] == AppAuthState.email);

      setShoppingData(shopping);

      let personal = Object.keys(TodoState.data[3])
        .map(k => TodoState.data[3][k])
        .filter(value => value['user'] == AppAuthState.email);

      setPersonalData(personal);

      let hurry = Object.keys(TodoState.data[4])
        .map(k => TodoState.data[4][k])
        .filter(value => value['user'] == AppAuthState.email);

      setHurryData(hurry);
    }
  }, [TodoState.data]);

  return (
    //TODO : do not use inline styles. use StyleSheet
    <View
      style={{
        flex: 1,
        backgroundColor: AppColors.white,
      }}>
      <RadiantTopBannerAlt title="To-do List" />
      {!TodoState.isLoading ? (
        <ScrollView>
          <View style={{padding: 15}}>
            <TodoCard
              title="Hurry"
              description={`${hurryData.length} tasks`}
              backgroundColor={AppColors.lightergrey}
              onPress={() => {
                refRBSheet.current.open();
                setBackgroundColor(AppColors.lightergrey);
                setTitle('Hurry');
                setData(hurryData);
                setType(DBData.todoHurryRoot);
              }}
            />
            <TodoCard
              title="Work"
              description={`${workData.length} tasks`}
              backgroundColor={'#A1DEA4'}
              onPress={() => {
                refRBSheet.current.open();
                setBackgroundColor('#A1DEA4');
                setTitle('Work');
                setData(workData);
                setType(DBData.todoWorkRoot);
              }}
            />
            <TodoCard
              title="Shopping"
              description={`${shopping.length} tasks`}
              backgroundColor={'#F45E6D'}
              onPress={() => {
                refRBSheet.current.open();
                setBackgroundColor('#F45E6D');
                setTitle('Shopping');
                setData(shopping);
                setType(DBData.todoShoppingRoot);
              }}
            />
            <TodoCard
              title="University"
              description={`${universityData.length} tasks`}
              backgroundColor={'#FFE761'}
              onPress={() => {
                refRBSheet.current.open();
                setBackgroundColor('#FFE761');
                setTitle('University');
                setData(universityData);
                setType(DBData.todoUniversityRoot);
              }}
            />
            <TodoCard
              title="Personal"
              description={`${personalData.length} tasks`}
              backgroundColor={'#B678FF'}
              onPress={() => {
                refRBSheet.current.open();
                setBackgroundColor('#B678FF');
                setTitle('Personal');
                setData(personalData);
                setType(DBData.todoPersonalRoot);
              }}
            />
          </View>
        </ScrollView>
      ) : (
        <FullScreenLoadingIndicator />
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            height: Dimensions.get('window').height - 100,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: backgroundColor,
          },
        }}>
        <BottomModalSheet
          title={title}
          data={data}
          navigation={navigation}
          type={type}
          additional={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity onPress={() => {navigation.navigate("screenAddAlt")}}>
          <FloatingButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};
