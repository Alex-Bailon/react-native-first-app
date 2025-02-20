import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/SearchScreen';
import DetailsScreen from '../screens/Home/DetailsScreen';
import { useNavigationContext } from '../context/NavigationContext';

const Stack = createStackNavigator();

const SearchStack = () => {
  const { setHeaderTitle } = useNavigationContext();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{ headerShown: false }}
        listeners={{
          focus: () => setHeaderTitle('Search')
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={({ route }) => ({
          headerTitle: 'Product Details',
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
        })}
      />
    </Stack.Navigator>
  );
};

export default SearchStack; 