import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FocusScreen from './FocusScreen';
import DashboardScreen from './DashboardScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Focus" component={FocusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;