import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import employeeAuthStack from './routes';
import EmployeeLoginScreen from './Login';
import RegisterScreen from './Register';

const Stack = createStackNavigator();

export default function EmployeeAuthStack() {
  return (
    <>
      <Stack.Screen
        name={employeeAuthStack.employeeLoginScreen}
        component={EmployeeLoginScreen}
      />
      <Stack.Screen
        name={employeeAuthStack.jobSeekerRegisterScreen}
        component={RegisterScreen}
      />
    </>
  );
}
