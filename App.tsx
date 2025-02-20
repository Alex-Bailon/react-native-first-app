import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from './src/context/NavigationContext';
import { NotificationsProvider } from './src/context/NotificationsContext';

export default function App() {
  return (
    <NavigationProvider>
      <NotificationsProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </NotificationsProvider>
    </NavigationProvider>
  );
}
