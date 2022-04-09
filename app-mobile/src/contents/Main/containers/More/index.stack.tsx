import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import moreStack from './routes';
import MoreScreen from './screens';
import MapScreen from './containers/screens/MapScreen';

const Stack = createStackNavigator();

export default function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name={moreStack.index} component={MoreScreen} /> */}
      <Stack.Screen name={moreStack.mapScreen} component={MapScreen} />
    </Stack.Navigator>
  );
}
