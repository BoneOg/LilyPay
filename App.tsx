import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import { AdminDashboard } from './src/screens/admin/AdminDashboard';
import CashierNavigator from './src/navigation/CashierNavigator';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { theme } from './src/components/theme';

const customFonts = {
  'Quicksand-Bold': require('./assets/fonts/Quicksand-Bold.ttf'),
  'Quicksand-Light': require('./assets/fonts/Quicksand-Light.ttf'),
  'Quicksand-Medium': require('./assets/fonts/Quicksand-Medium.ttf'),
  'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf'),
  'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf'),
};

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(customFonts);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  if (!fontsLoaded) {
    return null;
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser.role === 'admin' ? (
          <Stack.Screen name="AdminDashboard">
            {(props) => <AdminDashboard user={currentUser} onLogout={handleLogout} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="CashierNavigator">
            {(props) => <CashierNavigator user={currentUser} onLogout={handleLogout} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
