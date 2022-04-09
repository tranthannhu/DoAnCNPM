import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import detailJobTopTab from '../routes';
import InformationScreen from './InformationScreen';
import CompanyScreen from './CompanyScreen';
import RelatedJobScreen from './RelatedJobScreen';

const TopTab = createMaterialTopTabNavigator();

export default function MyJobTopTab() {
  return (
    <TopTab.Navigator
      tabBarOptions={{ labelStyle: { fontSize: 12, width: 100 } }}
      backBehavior="none"
    >
      <TopTab.Screen
        options={{ tabBarLabel: 'Information' }}
        name={detailJobTopTab.jobInformationScreen}
        component={InformationScreen}
      />
      <TopTab.Screen
        options={{ tabBarLabel: 'Company' }}
        name={detailJobTopTab.companySreens}
        component={CompanyScreen}
      />
      <TopTab.Screen
        options={{ tabBarLabel: 'Related Job' }}
        name={detailJobTopTab.relatedJobScreens}
        component={RelatedJobScreen}
      />
    </TopTab.Navigator>
  );
}
