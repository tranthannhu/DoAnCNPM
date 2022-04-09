import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import detailJobTopTab from '../routes';
import CompanyIntroduction from './CompanyIntroductionScreen';
import RecruimentScreen from './RecruitmentScreen';

const TopTab = createMaterialTopTabNavigator();

export default function CompanyTobTabs() {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#6e5ce6',
        },
      }}
      backBehavior="none"
    >
      <TopTab.Screen
        options={{ tabBarLabel: 'Introduction' }}
        name={detailJobTopTab.companyIntroduction}
        component={CompanyIntroduction}
      />
      <TopTab.Screen
        options={{ tabBarLabel: 'Recruitment' }}
        name={detailJobTopTab.recruitment}
        component={RecruimentScreen}
      />
    </TopTab.Navigator>
  );
}
