import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import exampleStack from './routes';
import CommonExampleStack from './containers/Common/index.stack.';
import ExampleListScreen from './screens';

const Stack = createStackNavigator();

export default function ExampleStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={exampleStack.exampleList} component={ExampleListScreen} />
      <Stack.Screen name={exampleStack.commonExampleStack} component={CommonExampleStack} />
    </Stack.Navigator>
  );
}
