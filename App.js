// ============================================================================
//  App.js - نسخة مبسّطة ومضمونة
//  Navigation setup مع SimpleBackground + SimpleIcon
//  بدون Reanimated وبدون Vector Icons
// ============================================================================

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SimpleBackground from './src/components/SimpleBackground';
import SimpleIcon from './src/components/SimpleIcon';
import { getCurrentTheme } from './src/theme/themeEngine';
import { useAppStore } from './src/store/appStore';

// Screens
import AdhkarScreen from './src/screens/AdhkarScreen';
import AddZikrScreen from './src/screens/AddZikrScreen';
import NamesOfAllahScreen from './src/screens/NamesOfAllahScreen';
import NameDetailScreen from './src/screens/NameDetailScreen';
import SirrFiBirScreen from './src/screens/SirrFiBirScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Default data
import { DEFAULT_ADHKAR } from './src/data/defaultAdhkar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AdhkarStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdhkarList" component={AdhkarScreen} />
      <Stack.Screen name="AddZikr" component={AddZikrScreen} />
    </Stack.Navigator>
  );
}

function NamesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NamesList" component={NamesOfAllahScreen} />
      <Stack.Screen name="NameDetail" component={NameDetailScreen} />
    </Stack.Navigator>
  );
}

function SirrStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SirrGate" component={SirrFiBirScreen} />
      <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const setTheme = useAppStore((state) => state.setTheme);
  const setAdhkar = useAppStore((state) => state.setAdhkar);
  const adhkar = useAppStore((state) => state.adhkar);
  const theme = getCurrentTheme();

  // Load default adhkar on first launch
  useEffect(() => {
    if (adhkar.length === 0) {
      setAdhkar(DEFAULT_ADHKAR);
    }
    setTheme(theme.key);

    const interval = setInterval(() => {
      const newTheme = getCurrentTheme();
      setTheme(newTheme.key);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(5, 5, 5, 0.85)',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: theme.colors.neonPrimary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          paddingBottom: 8,
          height: 70,
        },
        tabBarActiveTintColor: theme.colors.neonPrimary,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.4)',
        tabBarLabelStyle: {
          fontFamily: 'Cairo-Regular',
          fontSize: 11,
          marginTop: 2,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case 'Adhkar':
              iconName = focused ? 'sparkles' : 'sparkles-outline';
              break;
            case 'Names':
              iconName = focused ? 'star' : 'star-outline';
              break;
            case 'Sirr':
              iconName = focused ? 'shield' : 'shield-outline';
              break;
            case 'Settings':
              iconName = focused ? 'cog' : 'cog-outline';
              break;
          }
          return <SimpleIcon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Adhkar"
        component={AdhkarStack}
        options={{ tabBarLabel: 'أذكاري' }}
      />
      <Tab.Screen
        name="Names"
        component={NamesStack}
        options={{ tabBarLabel: 'أسماء الله' }}
      />
      <Tab.Screen
        name="Sirr"
        component={SirrStack}
        options={{ tabBarLabel: 'سر في بئر' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarLabel: 'إعدادات' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" translucent />
      <NavigationContainer>
        <SimpleBackground>
          <TabNavigator />
        </SimpleBackground>
      </NavigationContainer>
    </>
  );
}
