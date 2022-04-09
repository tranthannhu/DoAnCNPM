import employeeAuthStack from './EmployeeAuth/routes';

/**
 * authStack
 */
const authStack = {
  greetingScreen: 'GreetingScreen',
  registerStack: 'registerStack',
  forgotPasswordStack: 'forgotPasswordStack',
  ...employeeAuthStack,
};

export default authStack;
