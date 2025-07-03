import React from 'react';
import { View, Text, Alert } from 'react-native';
import { User } from '../../services/database';
import { Button } from '../../components/ui';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center items-center px-8">
      <View className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 w-full max-w-md">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          Welcome to Admin Dashboard
        </Text>
        
        <Text className="text-gray-600 text-center mb-8">
          Welcome, {user.full_name}
        </Text>

        <Button 
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
        />
      </View>
    </View>
  );
}; 