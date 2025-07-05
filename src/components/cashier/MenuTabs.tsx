import React from 'react';
import { View, Text } from 'react-native';
import { ShoppingCart } from 'react-native-feather';
import { getColor, getBorderRadius, getContainerStyles, getShadowStyles, getBorderStyles, theme } from '../../components/theme';
import Tabs, { TabItem, TabsContent } from '../ui/Tabs';
import FoodMenu from './FoodMenu';

interface MenuTabsProps {
  activeTab: 'breakfast' | 'lunch' | 'dinner' | 'cart';
  activeSubTab: 'appetizer' | 'main-course' | 'desserts' | 'drinks';
  cartCount: number;
  onTabChange: (tabId: string) => void;
  onSubTabChange: (subTabId: string) => void;
  onFoodSelect?: (food: any) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({
  activeTab,
  activeSubTab,
  cartCount,
  onTabChange,
  onSubTabChange,
  onFoodSelect,
}) => {
  const containerStyles = getContainerStyles();

  // Define main tab items
  const tabItems: TabItem[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { 
      id: 'cart', 
      label: 'Cart', 
      icon: <ShoppingCart 
        width={18} 
        height={18} 
        color={activeTab === 'cart' ? getColor('foreground') : getColor('muted-foreground')} 
      />,
      badge: cartCount 
    },
  ];

  // Define sub-tab items for menu categories
  const subTabItems: TabItem[] = [
    { id: 'appetizer', label: 'Appetizer' },
    { id: 'main-course', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

  // Sample food data - you can replace this with your actual data
  const getFoodItems = (menuType: string, category: string) => {
    const baseItems = [
      { code: 'BO1', name: 'Waffle Pancake', price: 150 },
      { code: 'BO2', name: 'French Toast', price: 120 },
      { code: 'BO3', name: 'Scrambled Eggs', price: 80 },
      { code: 'BO4', name: 'Bacon & Eggs', price: 200 },
      { code: 'BO5', name: 'Oatmeal Bowl', price: 90 },
      { code: 'BO6', name: 'Fruit Salad', price: 110 },
    ];
    
    // Add more items for demonstration
    const extendedItems = [
      ...baseItems,
      { code: 'BO7', name: 'Pancake Stack', price: 180 },
      { code: 'BO8', name: 'Breakfast Burrito', price: 160 },
      { code: 'BO9', name: 'Avocado Toast', price: 140 },
      { code: 'BO10', name: 'Smoothie Bowl', price: 130 },
    ];
    
    return extendedItems;
  };

  const renderMenuContent = (menuType: string) => (
    <View style={{ flex: 1 }}>
      {/* Sub-tabs for Menu - Compact Pills */}
      <Tabs
        items={subTabItems}
        activeTab={activeSubTab}
        onTabChange={onSubTabChange}
        variant="compact"
        size="sm"
      />
      
      {/* Food Menu Grid */}
      <View style={{ flex: 1, marginTop: 16 }}>
        <FoodMenu
          foodItems={getFoodItems(menuType, activeSubTab)}
          onFoodSelect={onFoodSelect}
        />
      </View>
    </View>
  );

  return (
    <View style={{
      flex: 1, 
      backgroundColor: getColor('card'), 
      borderRadius: getBorderRadius('lg'),
      paddingHorizontal: containerStyles.paddingHorizontal, 
      paddingTop: 20, 
      marginTop: 20,
      ...getShadowStyles('sm'), 
      ...getBorderStyles('sm', 'border'),
    }}>
      {/* Main Tabs - Full Width Pills */}
      <Tabs
        items={tabItems}
        activeTab={activeTab}
        onTabChange={onTabChange}
        variant="pills"
        size="md"
      />

      {/* Tab Content with Sub-tabs */}
      <TabsContent activeTab={activeTab} tabId="breakfast">
        {renderMenuContent('Breakfast')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="lunch">
        {renderMenuContent('Lunch')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="dinner">
        {renderMenuContent('Dinner')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="cart">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            fontSize: 24, 
            fontFamily: theme.fonts.semibold,
            color: getColor('foreground'), 
            marginBottom: 8,
          }}>
            Shopping Cart
          </Text>
          <Text style={{
            fontSize: 16, 
            fontFamily: theme.fonts.regular,
            color: getColor('muted-foreground'), 
            textAlign: 'center',
          }}>
            This is where your cart management will go
          </Text>
        </View>
      </TabsContent>
    </View>
  );
};

export default MenuTabs; 