import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getColor, theme, getShadowStyles, colorUsageGuide } from '../theme';

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const navigation = useNavigation();
  const route = useRoute();

  const navItems = [
    { name: 'CashRegister', label: 'Cash Register' },
    { name: 'Transactions', label: 'Transactions' },
  ];

  return (
    <View
      style={{
        backgroundColor: getColor('card'), // Clean white background
        borderBottomWidth: 1,
        borderBottomColor: getColor('border'),
        ...getShadowStyles('sm'),
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          height: 64,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Logo and Navigation Links */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Pressable onPress={() => navigation.navigate('CashRegister' as never)}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: theme.fonts.bold,
                color: getColor('primary.500'), // Brand color for logo
                marginRight: 40,
              }}
            >
              LilyPay
            </Text>
          </Pressable>

          {/* Nav Links */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {navItems.map((item, index) => {
              const isActive = route.name === item.name;

              return (
                <Pressable
                  key={item.name}
                  onPress={() => navigation.navigate(item.name as never)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8,
                    backgroundColor: isActive
                      ? getColor('primary.100') // Light primary for active state
                      : 'transparent',
                    marginLeft: index > 0 ? 12 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: theme.fonts.medium,
                      color: isActive
                        ? getColor('primary.700') // Darker primary for active text
                        : getColor('neutral.600'), // Neutral for inactive text
                    }}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Right: Logout Button */}
        <Pressable
          onPress={onLogout}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
            backgroundColor: getColor('secondary.500'), // Secondary color for logout
            borderWidth: 0.5,
            borderColor: getColor('secondary.600'),
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: theme.fonts.medium,
              color: getColor('neutral.900'), // Dark text for contrast
            }}
          >
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Navbar;