/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ApplyScreen from './screens/ApplyScreen';
import SaveScreen from './screens/SaveScreen';
import ViewScreen from './screens/ViewScreen';
import myJobTopTab from './routes';

const TopTab = createMaterialTopTabNavigator();

export default function MyJobTopTab() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        style: { backgroundColor: '#5864ec' },
        labelStyle: {
          textAlign: 'center',
          textTransform: 'capitalize',
        },
        indicatorStyle: {
          borderBottomColor: '#fff',
          borderBottomWidth: 2,
        },
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        indicatorContainerStyle: {},
      }}
    >
      <TopTab.Screen
        name={myJobTopTab.viewedScreen}
        component={ViewScreen}
        options={{ tabBarLabel: 'Viewed' }}
      />
      <TopTab.Screen
        name={myJobTopTab.appliedScreen}
        component={ApplyScreen}
        options={{ tabBarLabel: 'Applied' }}
      />
      <TopTab.Screen
        name={myJobTopTab.savedScreen}
        component={SaveScreen}
        options={{ tabBarLabel: 'Saved' }}
      />
    </TopTab.Navigator>
  );
}

