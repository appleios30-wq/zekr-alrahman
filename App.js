// ============================================================================
//  App.js - نسخة مبسّطة ومضمونة مع ErrorBoundary و SafeAreaProvider
// ============================================================================

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import SimpleBackground from './src/components/SimpleBackground';
import SimpleIcon from './src/components/SimpleIcon';
import { getCurrentTheme } from './src/theme/themeEngine';
import { useAppStore } from './src/store/appStore';

import AdhkarScreen from './src/screens/AdhkarScreen';
import AddZikrScreen from './src/screens/AddZikrScreen';
import NamesOfAllahScreen from './src/screens/NamesOfAllahScreen';
import NameDetailScreen from './src/screens/NameDetailScreen';
import SirrFiBirScreen from './src/screens/SirrFiBirScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import SettingsScreen from './src/screens/SettingsScreen';

import { DEFAULT_ADHKAR } from './src/data/defaultAdhkar';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, backgroundColor: '#050505', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Text style={{ color: '#FF0040', fontSize: 18, marginBottom: 10, fontFamily: 'sans-serif' }}>
            ❌ حدث خطأ في التطبيق
          </Text>
          <Text style={{ color: '#aaa', fontSize: 12, textAlign: 'center', marginBottom: 20 }}>
            {this.state.error?.message || 'خطأ غير معروف'}
          </Text>
          <Text style={{ color: '#666', fontSize: 11 }}>
            أبلغ المطور بهذا الخطأ
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

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

  useEffect(() => {
    try {
      if (adhkar.length === 0) {
        setAdhkar(DEFAULT_ADHKAR);
      }
      setTheme(theme.key);
    } catch (e) {
      console.warn('Error loading adhkar:', e);
    }

    const interval = setInterval(() => {
      try {
        const newTheme = getCurrentTheme();
        setTheme(newTheme.key);
      } catch (e) {}
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
          fontFamily: 'sans-serif',
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
      <Tab.Screen name="Adhkar" component={AdhkarStack} options={{ tabBarLabel: 'أذكاري' }} />
      <Tab.Screen name="Names" component={NamesStack} options={{ tabBarLabel: 'أسماء الله' }} />
      <Tab.Screen name="Sirr" component={SirrStack} options={{ tabBarLabel: 'سر في بئر' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'إعدادات' }} />
    </Tab.Navigator>
  );
}

// Loading screen
function LoadingScreen() {
  const theme = getCurrentTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bgDeep, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.colors.neonPrimary, fontSize: 16 }}>✨ Zekr Alrahman</Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontsError, setFontsError] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Cairo-Regular': require('./assets/fonts/Cairo-Regular.ttf'),
          'Cairo-Bold': require('./assets/fonts/Cairo-Bold.ttf'),
          'Amiri-Regular': require('./assets/fonts/Amiri-Regular.ttf'),
          'Amiri-Bold': require('./assets/fonts/Amiri-Bold.ttf'),
          'ArefRuqaa': require('./assets/fonts/ArefRuqaa-Regular.ttf'),
          'ReemKufi': require('./assets/fonts/ReemKufi-Regular.ttf'),
        });
      } catch (e) {
        console.warn('Fonts failed to load:', e.message);
        setFontsError(true);
      }
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <StatusBar style="light" translucent />
        <NavigationContainer>
          <SimpleBackground>
            <TabNavigator />
          </SimpleBackground>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
