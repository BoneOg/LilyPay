import React from 'react';
import { View, Text } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { getColor, getBorderRadius, getContainerStyles, getShadowStyles, getBorderStyles, theme } from '../../components/theme';
import Tabs, { TabItem, TabsContent } from '../ui/Tabs';
import FoodMenu from './FoodMenu';
import Cart from './Cart';
import { useFoodList } from '../../hooks/FoodList';

interface CartItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

interface MenuTabsProps {
  activeTab: 'breakfast' | 'lunch' | 'dinner' | 'cart';
  activeSubTab: 'appetizer' | 'main-course' | 'desserts' | 'drinks';
  cartCount: number;
  cartItems: CartItem[];
  totalPaid: number;
  onTabChange: (tabId: string) => void;
  onSubTabChange: (subTabId: string) => void;
  onFoodSelect?: (food: any) => void;
  onUpdateQuantity: (itemCode: string, newQuantity: number) => void;
  onRemoveItem: (itemCode: string) => void;
  onConfirmOrder: () => void;
  onEnterAmountReceived: () => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({
  activeTab,
  activeSubTab,
  cartCount,
  cartItems,
  totalPaid,
  onTabChange,
  onSubTabChange,
  onFoodSelect,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
  onEnterAmountReceived,
}) => {
  const containerStyles = getContainerStyles();
  const { getFoodItems } = useFoodList();

  // Define main tab items
  const tabItems: TabItem[] = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { 
      id: 'cart', 
      label: `Cart (${cartCount})`, 
      icon: <ShoppingCart 
        width={18} 
        height={18} 
        color={activeTab === 'cart' ? getColor('foreground') : getColor('muted-foreground')} 
      />
    },
  ];

  // Define sub-tab items for menu categories
  const subTabItems: TabItem[] = [
    { id: 'appetizer', label: 'Appetizer' },
    { id: 'main-course', label: 'Main Course' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'drinks', label: 'Drinks' },
  ];

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
          foodItems={getFoodItems(menuType as 'breakfast' | 'lunch' | 'dinner', activeSubTab)}
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
      marginTop: 8,
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
        {renderMenuContent('breakfast')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="lunch">
        {renderMenuContent('lunch')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="dinner">
        {renderMenuContent('dinner')}
      </TabsContent>

      <TabsContent activeTab={activeTab} tabId="cart">
        <View style={{ flex: 1, marginTop: 16 }}>
          <Cart 
            cartItems={cartItems}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onConfirmOrder={onConfirmOrder}
            onEnterAmountReceived={onEnterAmountReceived}
            totalPaid={totalPaid}
          />
        </View>
      </TabsContent>
    </View>
  );
};

export default MenuTabs; 