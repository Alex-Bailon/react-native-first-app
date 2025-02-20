import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionContent}>{children}</View>
  </View>
);

type SettingsItemProps = {
  icon: string;
  iconColor?: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
};

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  iconColor = '#666',
  title,
  subtitle,
  onPress,
  rightElement,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
      <MaterialCommunityIcons name={icon} size={24} color={iconColor} />
    </View>
    <View style={styles.settingsItemContent}>
      <Text style={styles.settingsItemTitle}>{title}</Text>
      {subtitle && <Text style={styles.settingsItemSubtitle}>{subtitle}</Text>}
    </View>
    <View style={styles.settingsItemRight}>
      {rightElement || (
        <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
      )}
    </View>
  </TouchableOpacity>
);

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SettingsSection title="Account">
          <SettingsItem
            icon="account"
            iconColor="#2196F3"
            title="Profile"
            subtitle="John Doe • john@example.com"
          />
          <SettingsItem
            icon="shield-account"
            iconColor="#4CAF50"
            title="Security"
            subtitle="Password, 2FA, Privacy"
          />
          <SettingsItem
            icon="credit-card"
            iconColor="#FF9800"
            title="Payment Methods"
            subtitle="Credit Cards, PayPal"
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsItem
            icon="bell"
            iconColor="#e41e31"
            title="Push Notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#ddd', true: '#e41e3150' }}
                thumbColor={notificationsEnabled ? '#e41e31' : '#999'}
              />
            }
          />
          <SettingsItem
            icon="email"
            iconColor="#673AB7"
            title="Email Notifications"
            rightElement={
              <Switch
                value={emailNotifications}
                onValueChange={setEmailNotifications}
                trackColor={{ false: '#ddd', true: '#e41e3150' }}
                thumbColor={emailNotifications ? '#e41e31' : '#999'}
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingsItem
            icon="theme-light-dark"
            iconColor="#607D8B"
            title="Dark Mode"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#ddd', true: '#e41e3150' }}
                thumbColor={darkMode ? '#e41e31' : '#999'}
              />
            }
          />
          <SettingsItem
            icon="translate"
            iconColor="#009688"
            title="Language"
            subtitle="English (US)"
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            icon="help-circle"
            iconColor="#8E24AA"
            title="Help Center"
            subtitle="FAQs, Contact Support"
          />
          <SettingsItem
            icon="file-document"
            iconColor="#795548"
            title="Terms & Privacy"
          />
          <SettingsItem
            icon="information"
            iconColor="#607D8B"
            title="About"
            subtitle="Version 1.0.0"
          />
        </SettingsSection>

        <TouchableOpacity style={styles.signOutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="#e41e31" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingsItemContent: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingsItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  settingsItemRight: {
    marginLeft: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e41e31',
    marginLeft: 8,
  },
});

export default SettingsScreen; 