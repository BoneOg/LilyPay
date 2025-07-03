import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { databaseService, User } from './services/database';
import { LoginScreen } from './screens/LoginScreen';
import { AdminDashboard } from './screens/admin/AdminDashboard';
import { CashierDashboard } from './screens/cashier/CashierDashboard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      await databaseService.initDatabase();
      setDbInitialized(true);
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize app:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      case 'cashier':
        return <CashierDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return <CashierDashboard user={currentUser} onLogout={handleLogout} />;
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-4">LilyPay</Text>
        <Text className="text-gray-600 text-lg">Initializing database...</Text>
      </View>
    );
  }

  if (!dbInitialized) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-4">LilyPay</Text>
        <Text className="text-red-600 text-lg">Failed to initialize database</Text>
      </View>
    );
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
      {renderDashboard()}
      <StatusBar style="auto" />
    </>
  );
}
