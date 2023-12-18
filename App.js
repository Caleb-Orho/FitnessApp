import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from './screens/WorkoutSreen/WorkoutSreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import EditRotine from './screens/HomeScreen/EditRoutine'

import NewRoutine from './screens/NewRoutine/NewRoutine'
import AddExercise from './screens/AddExercise/AddExercise'
import StartRoutine from './screens/StartRoutine/StartRoutine'
import ReplaceExercise from './screens/NewRoutine/ReplaceExercise'

import RoutineData from './screens/RoutineData/RoutineData'
import RoutineHistory from './screens/RoutineData/RoutineHistory'

import { createContext, useState } from 'react';

const Stack = createNativeStackNavigator();
export const AppContext = createContext();

export default function App() {
  const [state, setState] = useState(false);

  const time = Array.from({ length: (10 * 60) / 5 + 1 }, (_, index) => {
    const timeInSeconds = index * 5;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (timeInSeconds === 0) {
      return "OFF";
    } else if (seconds === 0) {
      return `${minutes} min`;
    } else {
      return `${minutes} min ${seconds} sec`;
    }
  });

  return (
    <AppContext.Provider value={{ setState, state, time }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
          <Stack.Screen name="NewRoutine" component={NewRoutine} />
          <Stack.Screen name="AddExercise" component={AddExercise} />
          <Stack.Screen name="StartRoutine" component={StartRoutine} />
          <Stack.Screen name="ReplaceExercise" component={ReplaceExercise} />
          <Stack.Screen name="EditRotine" component={EditRotine} />
          <Stack.Screen name="RoutineData" component={RoutineData} />
          <Stack.Screen name="RoutineHistory" component={RoutineHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

