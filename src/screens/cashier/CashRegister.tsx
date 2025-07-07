import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { getColor } from '../../components/theme';
import TableSelector from '../../components/cashier/TableSelector';
import OrderType from '../../components/cashier/OrderType';
import MenuTabs from '../../components/cashier/MenuTabs';

interface CartItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

interface CashRegisterProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: 'register' | 'transactions') => void;
}

const CashRegister: React.FC<CashRegisterProps> = ({ onLogout }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [selectedOrderType, setSelectedOrderType] = useState<'dine-in' | 'take-out' | null>(null);
  const [activeTab, setActiveTab] = useState<'breakfast' | 'lunch' | 'dinner' | 'cart'>('breakfast');
  const [activeSubTab, setActiveSubTab] = useState<'appetizer' | 'main-course' | 'desserts' | 'drinks'>('appetizer');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as 'breakfast' | 'lunch' | 'dinner' | 'cart');
  };

  const handleSubTabChange = (subTabId: string) => {
    setActiveSubTab(subTabId as 'appetizer' | 'main-course' | 'desserts' | 'drinks');
  };

  const handleFoodSelect = (food: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.code === food.code);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item =>
          item.code === food.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { ...food, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (itemCode: string, newQuantity: number) => {
    setCartItems(prevItems => {
      if (newQuantity === 0) {
        // Remove item if quantity is 0
        return prevItems.filter(item => item.code !== itemCode);
      } else {
        // Update quantity
        return prevItems.map(item =>
          item.code === itemCode
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
    });
  };

  const handleRemoveItem = (itemCode: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.code !== itemCode));
  };

  const handleConfirmOrder = () => {
    // Handle order confirmation logic here
    console.log('Order confirmed:', cartItems);
    console.log('Total paid:', totalPaid);
    console.log('Table:', selected);
    console.log('Order type:', selectedOrderType);
    
    // Clear cart after order confirmation
    setCartItems([]);
    setTotalPaid(0);
  };

  const handleEnterAmountReceived = () => {
    // TODO: Implement amount input logic
    console.log('Enter amount received pressed');
  };

  // Calculate cart count for badge
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getColor('background'), padding: 16 }}>
      {/* Table Selection and Order Type Components - Side by Side */}
      <View
        style={{
          flexDirection: 'row',
          gap: 16,
          height: 160, // or height: '22%' for percentage-based
          marginBottom: 16,
        }}
      >
        <View style={{ flex: 1, height: '100%' }}>
          <TableSelector
            selected={selected}
            onTableSelect={setSelected}
          />
        </View>
        <View style={{ flex: 1, height: '100%' }}>
          <OrderType
            selected={selectedOrderType}
            onOrderTypeSelect={setSelectedOrderType}
          />
        </View>
      </View>
      
      {/* Menu Tabs Component */}
      <MenuTabs
        activeTab={activeTab}
        activeSubTab={activeSubTab}
        cartCount={cartCount}
        cartItems={cartItems}
        totalPaid={totalPaid}
        onTabChange={handleTabChange}
        onSubTabChange={handleSubTabChange}
        onFoodSelect={handleFoodSelect}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onConfirmOrder={handleConfirmOrder}
        onEnterAmountReceived={handleEnterAmountReceived}
      />
    </SafeAreaView>
  );
};

export default CashRegister;