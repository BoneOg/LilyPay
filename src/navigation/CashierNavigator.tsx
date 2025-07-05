import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Layout from '../components/cashier/Layout';
import CashRegister from '../screens/cashier/CashRegister';
import Transactions from '../screens/cashier/Transactions';

export type CashierStackParamList = {
  CashRegister: { user: any; onLogout: () => void; onNavigate: (page: 'register' | 'transactions') => void };
  Transactions: undefined;
};

const Stack = createStackNavigator<CashierStackParamList>();

interface CashierNavigatorProps {
  user?: any;
  onLogout?: () => void;
}

const CashierNavigator: React.FC<CashierNavigatorProps> = ({ user, onLogout }) => {
  const handleNavigate = (page: 'register' | 'transactions') => {
    // Navigation is handled by the Navbar component
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CashRegister"
    >
      <Stack.Screen name="CashRegister">
        {(props) => (
          <Layout onLogout={onLogout}>
            <CashRegister 
              user={user} 
              onLogout={onLogout || (() => {})} 
              onNavigate={handleNavigate} 
            />
          </Layout>
        )}
      </Stack.Screen>
      <Stack.Screen name="Transactions">
        {(props) => (
          <Layout onLogout={onLogout}>
            <Transactions />
          </Layout>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default CashierNavigator; 