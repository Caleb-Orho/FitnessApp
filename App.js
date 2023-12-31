import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutScreen from './screens/WorkOut/WorkoutSreen/WorkoutSreen'
import HomeScreen from './screens/WorkOut/HomeScreen/HomeScreen'
import EditRotine from './screens/WorkOut/HomeScreen/EditRoutine'

import NewRoutine from './screens/WorkOut/NewRoutine/NewRoutine'
import AddExercise from './screens/WorkOut/AddExercise/AddExercise'
import StartRoutine from './screens/WorkOut/StartRoutine/StartRoutine'
import ReplaceExercise from './screens/WorkOut/NewRoutine/ReplaceExercise'

import RoutineData from './screens/WorkOut/RoutineData/RoutineData'
import RoutineHistory from './screens/WorkOut/RoutineData/RoutineHistory'

import EmptyWorkout from './screens/WorkOut/EmptyWorkout/EmptyWorkout'

import ProfileHome from './screens/Profile/ProfileHome/ProfileHome';
import SettingHome from './screens/Profile/Settings/SettingHome';
import Profile from './screens/Profile/Settings/Profile';

import About from './screens/Profile/About/About';

import { createContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

const Stack = createNativeStackNavigator();
export const AppContext = createContext();

export default function App() {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({ name: "", image: "" });
  const [workouts, setWorkouts] = useState(0)
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

  const loadUserInfo = async () => {
    try {
      // Read the contents of userInfo.json
      const userInfoString = await FileSystem.readAsStringAsync(
        `${FileSystem.documentDirectory}userInfo.json`
      );

      // Parse the JSON string to get the user information
      const userInfo = JSON.parse(userInfoString);

      setUser((prevUser) => ({
        ...prevUser,
        name: userInfo.name !== "" ? userInfo.name : prevUser.name,
        image: userInfo.imageUri !== "" ? userInfo.imageUri : prevUser.image,
      }));

    } catch (error) {
      console.error('Error loading user information:', error);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const directoryUri = FileSystem.documentDirectory + "/routines/";

        const countJsonFiles = async (dir) => {
          let count = 0;

          const files = await FileSystem.readDirectoryAsync(dir);

          for (const file of files) {
            const filePath = dir + file;
            const isDirectory = (await FileSystem.getInfoAsync(filePath)).isDirectory;

            if (isDirectory) {
              // Recursively count JSON files in subdirectories
              count += await countJsonFiles(filePath + "/");
            } else if (file.endsWith('.json')) {
              count++;
            }
          }

          return count;
        };

        const numberOfJsonFiles = await countJsonFiles(directoryUri);
        setWorkouts(numberOfJsonFiles)

      } catch (error) {
        console.error('Error reading directory:', error);
      }
    };

    // Call the loadData function when the component mounts
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ setState, state, time, user, setUser, workouts }}>
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
          <Stack.Screen name="EmptyWorkout" component={EmptyWorkout} />
          <Stack.Screen name="ProfileHome" component={ProfileHome} />
          <Stack.Screen name="SettingHome" component={SettingHome} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Profile" component={Profile} />

        </Stack.Navigator>
        {/* <Footer /> */}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

