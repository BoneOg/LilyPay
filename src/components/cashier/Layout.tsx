import React from 'react';
import { View } from 'react-native';
import Navbar from './Navbar';
import { getColor } from '../theme';

interface LayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: getColor('background'),
      }}
    >
      <Navbar onLogout={onLogout} />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Layout;