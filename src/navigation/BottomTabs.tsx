import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import SearchScreen from '../screens/SearchScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useNavigationContext } from '../context/NavigationContext';

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: 'Home',
    component: HomeStack,
    title: 'Home'
  },
  {
    name: 'Search',
    component: SearchScreen,
    title: 'Search'
  },
  {
    name: 'Notifications',
    component: NotificationsScreen,
    title: 'Notifications'
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    title: 'Settings'
  }
];

const BottomTabs = () => {
  const { setHeaderTitle } = useNavigationContext();

  return (
    <Tab.Navigator>
      {screens.map(screen => (
        <Tab.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component}
          options={{ headerShown: false }}
          listeners={{
            focus: () => setHeaderTitle(screen.title)
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs; 