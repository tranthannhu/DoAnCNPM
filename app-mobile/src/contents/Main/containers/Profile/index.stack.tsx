import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import profileStack from './routes';
import ProfileScreen from './screens';
import CVScreen from './containers/screens/CVScreen';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={profileStack.index} component={ProfileScreen} />
      <Stack.Screen
        name={profileStack.CVScreen}
        component={CVScreen}
      />
    </Stack.Navigator>
  );
}
