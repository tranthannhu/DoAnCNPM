import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import JobDetailScreen from '../../../../screens/JobDetailScreen';
import ExploreScreen from './screens';
import exploreStack from './routes';
import EmployerScreens from './containers/screens/EmployerDetail';
import FilterScreen from './containers/screens/FilterScreen';
import ApplyScreen from './containers/screens/ApplyScreen';
import CompanyDetailScreen from './containers/screens/CompanyDetailScreen';
import SearchScreen from './containers/screens/SearchScreen';
import SelectTagsScreen from '@src/screens/SelectTagsScreen';

const Stack = createStackNavigator();

export default function ExploreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={exploreStack.index} component={ExploreScreen} />
      <Stack.Screen name="JobDetailScreen" component={JobDetailScreen} />
      <Stack.Screen name={exploreStack.FilterScreen} component={FilterScreen} />
      <Stack.Screen
        name={exploreStack.employerscreens}
        component={EmployerScreens}
      />
      <Stack.Screen
        name={exploreStack.selectCateScreen}
        component={SelectTagsScreen}
      />
      <Stack.Screen name={exploreStack.applyScreen} component={ApplyScreen} />

      <Stack.Screen
        name={exploreStack.companyDetailScreen}
        component={CompanyDetailScreen}
      />

      <Stack.Screen name={exploreStack.searchScreen} component={SearchScreen} />
    </Stack.Navigator>
  );
}
