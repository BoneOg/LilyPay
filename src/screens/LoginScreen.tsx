import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '../services/database';
import { getColor, theme, getShadowStyles, getBorderRadius } from '../components/theme';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

// Predefined users
const PREDEFINED_USERS = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    full_name: 'System Administrator',
    is_active: 1
  },
  {
    id: 2,
    username: 'cashier',
    password: 'cashier123',
    role: 'cashier',
    full_name: 'Default Cashier',
    is_active: 1
  }
];

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setIsLoading(false);
      return;
    }
    
    // Check against predefined users
    const user = PREDEFINED_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      console.log(`User authenticated: ${user.username} (${user.role})`);
      onLogin(user as User);
    } else {
      console.log(`Login failed for user: ${username}`);
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getColor('background') }}>
      <LinearGradient
        colors={[getColor('accent2.200'), getColor('background')]} // Soft lavender gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
          <View style={{ 
            flex: 1, 
            justifyContent: 'center', 
            alignItems: 'center', 
            paddingHorizontal: 32, 
            paddingVertical: 48 
          }}>
            {/* Main Card */}
            <View style={{ 
              width: '100%', 
              maxWidth: 400, 
              backgroundColor: getColor('card'), 
              borderRadius: getBorderRadius('lg') * 3, // 24px rounded corners
              ...getShadowStyles('xl'), // More prominent shadow
              borderWidth: 1,
              borderColor: getColor('border'),
              overflow: 'hidden' 
            }}>
              {/* Header */}
              <View style={{ 
                paddingTop: 48, 
                paddingBottom: 32, 
                paddingHorizontal: 32, 
                alignItems: 'center' 
              }}>
                <Text style={{ 
                  fontFamily: theme.fonts.bold, 
                  fontSize: 42, 
                  color: getColor('primary.500'), // Brand color for logo
                  marginBottom: 8, 
                  textAlign: 'center' 
                }}>
                  LilyPay
                </Text>
                <Text style={{ 
                  fontFamily: theme.fonts.regular, 
                  fontSize: 18, 
                  color: getColor('neutral.600'), // Secondary text
                  textAlign: 'center' 
                }}>
                  Point of Sale System
                </Text>
              </View>
              
              {/* Form */}
              <View style={{ paddingHorizontal: 32, paddingBottom: 32 }}>
                {/* Username Input */}
                <TextInput
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  style={{ 
                    fontFamily: theme.fonts.regular, 
                    height: 56, 
                    paddingHorizontal: 16, 
                    fontSize: 18, 
                    borderWidth: 2, 
                    borderColor: getColor('border'), 
                    borderRadius: getBorderRadius('lg') * 2, // 16px
                    backgroundColor: getColor('background'), 
                    color: getColor('foreground'), 
                    marginBottom: 16 
                  }}
                  placeholderTextColor={getColor('muted-foreground')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
                
                {/* Password Input */}
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{ 
                    fontFamily: theme.fonts.regular, 
                    height: 56, 
                    paddingHorizontal: 16, 
                    fontSize: 18, 
                    borderWidth: 2, 
                    borderColor: getColor('border'), 
                    borderRadius: getBorderRadius('lg') * 2, // 16px
                    backgroundColor: getColor('background'), 
                    color: getColor('foreground'), 
                    marginBottom: 16 
                  }}
                  placeholderTextColor={getColor('muted-foreground')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
               
                {/* Error Message */}
                {error ? (
                  <Text style={{ 
                    fontFamily: theme.fonts.regular, 
                    color: getColor('destructive.DEFAULT'), 
                    fontSize: 14, 
                    textAlign: 'center', 
                    marginBottom: 8 
                  }}>
                    {error}
                  </Text>
                ) : null}
                
                {/* Login Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isLoading}
                  style={{ 
                    width: '100%', 
                    height: 56, 
                    borderRadius: getBorderRadius('lg') * 2, // 16px
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    backgroundColor: isLoading ? getColor('primary.300') : getColor('primary.500'), 
                    marginTop: 8,
                    ...getShadowStyles('sm') // Subtle shadow for button
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={{ 
                    fontFamily: theme.fonts.semibold, 
                    color: getColor('primary.foreground'), 
                    fontSize: 18, 
                    fontWeight: '600' 
                  }}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default LoginScreen;