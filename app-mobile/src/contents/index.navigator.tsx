import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainBottomTab from '@contents/Main/index.bottomtab';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from '@themes';
import rootStack from './routes';
import { themeSelector } from './Config/redux/selector';
import { ThemeEnum } from './Config/redux/constant';
import AuthStack from './Auth/containers/index.stack';

const Stack = createStackNavigator();

export default function RootStack() {
  const themeSelectorData = useSelector((state) => themeSelector(state));
  const backgroundColor = themeSelectorData === ThemeEnum.LIGHT
    ? lightTheme.colors.bgColor
    : darkTheme.colors.bgColor;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor },
      }}
    >
      <Stack.Screen
        name={rootStack.mainBottomTab}
        component={MainBottomTab}
      />
      <Stack.Screen
        name={rootStack.authStack}
        component={AuthStack}
      />
    </Stack.Navigator>
  );
}
