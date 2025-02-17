import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomTabs from './BottomTabs';
import AccountScreen from '../screens/AccountScreen';
import HelpScreen from '../screens/HelpScreen';
import { useNavigationContext } from '../context/NavigationContext';

const Drawer = createDrawerNavigator();

const screens = [
  {
    name: 'Main',
    component: BottomTabs,
    title: 'Home'
  },
  {
    name: 'Account',
    component: AccountScreen,
    title: 'My Account'
  },
  {
    name: 'Help',
    component: HelpScreen,
    title: 'Help & Support'
  }
];

const DrawerNavigator = () => {
  const { headerTitle, setHeaderTitle } = useNavigationContext();

  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        // headerLeft: () => (
        //   <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
        //     {navigation.canGoBack() && (
        //       <TouchableOpacity 
        //         style={{ marginRight: 8 }}
        //         onPress={() => navigation.goBack()}
        //       >
        //         <Ionicons name="arrow-back" size={24} color="black" />
        //       </TouchableOpacity>
        //     )}
        //     <TouchableOpacity
        //       onPress={() => navigation.openDrawer()}
        //     >
        //       <Ionicons name="menu" size={24} color="black" />
        //     </TouchableOpacity>
        //   </View>
        // ),
        headerTitle: headerTitle
      })}
    >
      {screens.map(screen => (
        <Drawer.Screen 
          key={screen.name}
          name={screen.name} 
          component={screen.component}
          listeners={{
            focus: () => setHeaderTitle(screen.title),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator; 