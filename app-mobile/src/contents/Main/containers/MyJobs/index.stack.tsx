import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyJobScreen from './screens';
import MyJobTab from './routes';

const Stack = createStackNavigator();

export default function MyJobStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={MyJobTab.myJob}
        component={MyJobScreen}
      />
    </Stack.Navigator>
  );
}
