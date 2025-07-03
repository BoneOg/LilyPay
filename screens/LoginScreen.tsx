import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { databaseService, User } from '../services/database';
import { Card, Input, Button } from '../components/ui';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setIsLoading(true);
    try {
      const user = await databaseService.authenticateUser(username, password);
      if (user) {
        onLogin(user);
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 justify-center px-8">
      <Card className="p-8">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-8">
          LilyPay Login
        </Text>
        
        <View className="space-y-4">
          <Input
            label="Username"
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Input
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Button 
            title={isLoading ? 'Logging in...' : 'Login'}
            onPress={handleLogin}
            disabled={isLoading}
            className="mt-6"
          />
        </View>

        <View className="mt-6 p-4 bg-blue-50 rounded-lg">
          <Text className="text-blue-800 text-sm text-center">
            Demo Credentials:{'\n'}
            Admin: admin / admin123{'\n'}
            Cashier: cashier / cashier123
          </Text>
        </View>
      </Card>
    </View>
  );
}; 