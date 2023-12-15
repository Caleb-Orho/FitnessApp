import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from './screens/WorkoutSreen/WorkoutSreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import NewRoutine from './screens/NewRoutine/NewRoutine'
import AddExercise from './screens/AddExercise/AddExercise'
import StartRoutine from './screens/StartRoutine/StartRoutine'
import ReplaceExercise from './screens/NewRoutine/ReplaceExercise'

import { createContext, useState } from 'react';

const Stack = createNativeStackNavigator();
export const AppContext = createContext();

export default function App() {
  const [state] = useState("Test")
  return (
    <AppContext.Provider value={{ state }}>
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

        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

