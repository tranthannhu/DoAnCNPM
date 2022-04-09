import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import authStack from './routes';
import GreetingScreen from './Index';
import EmployeeAuthStack from './EmployeeAuth/index.stack';
import EmployeeLoginScreen from './EmployeeAuth/Login';
import employeeAuthStack from './EmployeeAuth/routes';
import RegisterScreen from './EmployeeAuth/Register';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={authStack.greetingScreen} component={EmployeeLoginScreen} />
      <Stack.Screen
        name={employeeAuthStack.jobSeekerRegisterScreen}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
}
