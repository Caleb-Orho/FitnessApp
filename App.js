import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WorkoutScreen from './screens/WorkoutSreen/WorkoutSreen'
export default function App() {
  return (
    // <View className="h-full items-center justify-center bg-red-100">
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


