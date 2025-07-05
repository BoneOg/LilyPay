import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { getColor } from '../../components/theme';
import TableSelector from '../../components/cashier/TableSelector';
import MenuTabs from '../../components/cashier/MenuTabs';

interface CashRegisterProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: 'register' | 'transactions') => void;
}

const CashRegister: React.FC<CashRegisterProps> = ({ onLogout }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner' | 'cart'>('breakfast');
  const [activeSubTab, setActiveSubTab] = useState<'appetizer' | 'main-course' | 'desserts' | 'drinks'>('appetizer');
  const [cartCount, setCartCount] = useState(1);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'breakfast' | 'lunch' | 'dinner' | 'cart');
  };

  const handleSubTabChange = (subTabId: string) => {
    setActiveSubTab(subTabId as 'appetizer' | 'main-course' | 'desserts' | 'drinks');
  };

  const handleFoodSelect = (food: any) => {
    // You can add logic here to add food to cart or handle selection
    console.log('Selected food:', food);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getColor('background'), padding: 16 }}>
      {/* Table Selection Component */}
      <TableSelector 
        selected={selected}
        onTableSelect={setSelected}
      />
      
      {/* Menu Tabs Component */}
      <MenuTabs
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        cartCount={cartCount}
        onTabChange={handleTabChange}
        onSubTabChange={handleSubTabChange}
        onFoodSelect={handleFoodSelect}
      />
    </SafeAreaView>
  );
};

export default CashRegister;