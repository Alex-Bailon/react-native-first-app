import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';
import { useNavigationContext } from '../context/NavigationContext';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
    title: 'Home'
  },
  {
    name: 'Details',
    component: DetailsScreen,
    title: 'Details'
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    title: 'My Profile'
  }
];

const HomeStack = () => {
  const { setHeaderTitle } = useNavigationContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {screens.map(screen => (
        <Stack.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component}
          listeners={{
            focus: () => setHeaderTitle(screen.title)
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack; 