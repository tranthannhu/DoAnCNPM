import * as React from 'react';
import { Icon, withTheme } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  bottomNavigationBarHeight,
} from '@themes/ThemeComponent/Common/CommonProps';
import { withTranslation } from 'react-i18next';
import { compose } from 'recompose';
import { StyleSheet } from 'react-native';
import mainBottomTab from './routes';
import HomeStack from './containers/Home/index.stack';
import ExploreStack from './containers/Explore/index.stack';
import MyJobScreen from './containers/MyJobs/screens';
import ProfileStack from './containers/Profile/index.stack';
import exploreStack from './containers/Explore/routes';

const BottomTabs = createBottomTabNavigator();

function MainBottomTab(props: any) {
  const {
    theme: {
      colors: { bgColor, primary },
    },
    t,
  } = props;

  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: true,
        activeTintColor: primary,
        activeBackgroundColor: primary,
        inactiveTintColor: primary,
        style: StyleSheet.flatten([
          {
            height: bottomNavigationBarHeight,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 5,
            borderTopColor: 'transparent',
            padding: 10,
            backgroundColor: bgColor,
          },
          {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,
            elevation: 9,
          },
        ]),
        tabStyle: {
          // backgroundColor: bgColor,
          backgroundColor: 'transparent',
          height: 55,
          paddingTop: 8,
          borderRadius: 20,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <BottomTabs.Screen
        name={mainBottomTab.homeStack}
        component={HomeStack}
        options={{
          tabBarLabel: t('bottom_tab:home'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="home"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon
              name="home-outline"
              type="material-community"
              color={color}
              size={22}
            />
          )),
        }}
      />

      <BottomTabs.Screen
        name={mainBottomTab.briefcaseStack}
        component={MyJobScreen}
        options={{
          tabBarLabel: t('bottom_tab:myjob'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="briefcase"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon
              name="briefcase-outline"
              type="material-community"
              color={color}
              size={22}
            />
          )),
        }}
      />
      <BottomTabs.Screen
        name={mainBottomTab.exploreStack}
        component={ExploreStack}
        listeners={({ navigation }) => ({
          tabLongPress: (e) => {
            // Prevent default action
            // e.preventDefault();

            // Do something with the `navigation` object
            navigation.navigate(mainBottomTab.exploreStack, { screen: exploreStack.index }); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          },
        })}
        options={{
          tabBarLabel: t('bottom_tab:explore'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="newspaper"
              type="material-community"
              color={color}
              size={26}
            />
          ) : (
            <Icon
              name="newspaper"
              type="material-community"
              color={color}
              size={22}
            />
          )),
        }}
      />

      <BottomTabs.Screen
        name={mainBottomTab.profileStack}
        component={ProfileStack}
        options={{
          tabBarLabel: t('bottom_tab:Profile'),
          tabBarIcon: ({ focused, color, size }) => (focused ? (
            <Icon
              name="bars"
              type="font-awesome"
              color={color}
              size={26}
            />
          ) : (
            <Icon
              name="bars"
              type="font-awesome"
              color={color}
              size={22}
            />
          )),
        }}
      />
    </BottomTabs.Navigator>

  );
}

export default compose(withTheme, withTranslation())(MainBottomTab);
