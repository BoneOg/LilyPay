import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', marginBottom: 24 }}>Hello World</Text>
      <TouchableOpacity
        onPress={onLogout}
        style={{ backgroundColor: '#3d2f6b', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
