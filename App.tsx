import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from './src/context/NavigationContext';

export default function App() {
  return (
    <NavigationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </NavigationProvider>
  );
}
