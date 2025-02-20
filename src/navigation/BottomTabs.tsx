import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    title: 'Home',
    icon: 'home',
  },
  {
    name: 'Search',
    component: SearchScreen,
    title: 'Search',
    icon: 'magnify',
  },
  {
    name: 'Notifications',
    component: NotificationsScreen,
    title: 'Notifications',
    icon: 'bell',
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    title: 'Settings',
    icon: 'cog',
  }
];

const BottomTabs = () => {
  const { setHeaderTitle } = useNavigationContext();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e41e31',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {screens.map(screen => (
        <Tab.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name={screen.icon} color={color} size={24} />
            ),
          }}
          listeners={{
            focus: () => setHeaderTitle(screen.title)
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabs; 