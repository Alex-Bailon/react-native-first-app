import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import AccountScreen from '../screens/AccountScreen';
import HelpScreen from '../screens/HelpScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Main" 
        component={BottomTabs}
      />
      <Drawer.Screen name="Account" component={AccountScreen} />
      <Drawer.Screen name="Help" component={HelpScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 