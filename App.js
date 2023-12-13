import React, { createContext, useReducer, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from './screens/WorkoutSreen/WorkoutSreen'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import NewRoutine from './screens/NewRoutine/NewRoutine'
import AddExercise from './screens/AddExercise/AddExercise'

// Create a context
const AppContext = createContext();

// Define initial state and reducer function
const initialState = {
  // Your shared values go here
  sharedValue: 'Initial Value',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SHARED_VALUE':
      return {
        ...state,
        sharedValue: action.payload,
      };
    // Add more cases for other actions if needed

    default:
      return state;
  }
};

const Stack = createNativeStackNavigator();

// Create a custom hook to use the context
const useAppContext = () => {
  return useContext(AppContext);
};


export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
          <Stack.Screen name="NewRoutine" component={NewRoutine} />
          <Stack.Screen name="AddExercise" component={AddExercise} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}


