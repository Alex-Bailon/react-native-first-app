import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from './HomeStack';
import SearchStack from './SearchStack';
import NotificationsScreen from '../screens/NotificationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useNavigationContext } from '../context/NavigationContext';
import { useNotifications } from '../context/NotificationsContext';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  name: string;
  color: string;
  size: number;
  showBadge?: boolean;
  badgeCount?: number;
};

const screens = [
  {
    name: 'Home',
    component: HomeStack,
    title: 'Home',
    icon: 'home',
  },
  {
    name: 'Search',
    component: SearchStack,
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

const TabIcon: React.FC<TabIconProps> = ({ name, color, size, showBadge = false, badgeCount = 0 }) => (
  <View style={styles.iconContainer}>
    <MaterialCommunityIcons name={name} color={color} size={size} />
    {showBadge && badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {badgeCount > 99 ? '99+' : badgeCount}
        </Text>
      </View>
    )}
  </View>
);

const BottomTabs = () => {
  const { setHeaderTitle } = useNavigationContext();
  const { unreadCount } = useNotifications();

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
              <TabIcon
                name={screen.icon}
                color={color}
                size={24}
                showBadge={screen.name === 'Notifications'}
                badgeCount={screen.name === 'Notifications' ? unreadCount : 0}
              />
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

const styles = StyleSheet.create({
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -4,
    backgroundColor: '#e41e31',
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default BottomTabs; 