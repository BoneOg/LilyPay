import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { getColor, getBorderRadius, getShadowStyles, theme } from '../theme';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'compact';
  size?: 'sm' | 'md' | 'lg';
}

interface TabsContentProps {
  activeTab: string;
  tabId: string;
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md'
}) => {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 12, fontSize: 16 },
    md: { paddingVertical: 12, paddingHorizontal: 16, fontSize: 18 },
    lg: { paddingVertical: 16, paddingHorizontal: 20, fontSize: 20 }
  };

  const currentSize = sizeStyles[size];

  // Adjust sizes for compact variant
  const compactSize = variant === 'compact' ? {
    paddingVertical: currentSize.paddingVertical * 0.75,
    paddingHorizontal: currentSize.paddingHorizontal * 0.75,
    fontSize: currentSize.fontSize * 0.9
  } : currentSize;

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: variant === 'pills' ? getColor('muted') : 'transparent',
        borderRadius: variant === 'pills' ? getBorderRadius('md') : 0,
        padding: variant === 'pills' ? 4 : 0,
        marginBottom: variant === 'compact' ? 12 : 20,
        ...(variant === 'pills' ? getShadowStyles('sm') : {}),
        // For compact variant, add gap between items and align left
        ...(variant === 'compact' ? {
          justifyContent: 'flex-start',
          gap: 8,
        } : {}),
      }}
    >
      {items.map((item, index) => {
        const isActive = activeTab === item.id;
        
        return (
          <Pressable
            key={item.id}
            onPress={() => onTabChange(item.id)}
            style={{
              // Remove flex: 1 for compact variant to allow shrinking to content
              ...(variant === 'compact' ? {} : { flex: 1 }),
              paddingVertical: compactSize.paddingVertical,
              paddingHorizontal: compactSize.paddingHorizontal,
              borderRadius: (variant === 'pills' || variant === 'compact') ? getBorderRadius('sm') : 0,
              backgroundColor: isActive && (variant === 'pills' || variant === 'compact') ? getColor('primary.200') : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              ...(isActive && (variant === 'pills' || variant === 'compact') ? getShadowStyles('sm') : {}),
              ...(variant === 'default' && isActive ? {
                borderBottomWidth: 2,
                borderBottomColor: getColor('primary.500'),
              } : {}),
              // For compact variant, style like pills but with subtle differences
              ...(variant === 'compact' ? {
                borderWidth: 1,
                borderColor: isActive ? getColor('primary.500') : getColor('border'),
                backgroundColor: isActive ? getColor('primary.100') : getColor('muted'),
              } : {}),
            }}
          >
            {item.icon && (
              <View style={{ marginRight: item.label ? 6 : 0 }}>
                {item.icon}
              </View>
            )}
            
            <Text
              style={{
                fontSize: compactSize.fontSize,
                fontFamily: variant === 'compact' ? theme.fonts.medium : theme.fonts.medium,
                color: isActive 
                  ? (variant === 'compact' ? getColor('primary.900') : getColor('foreground'))
                  : getColor('muted-foreground'),
              }}
            >
              {item.label}
              {item.badge && ` (${item.badge})`}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const TabsContent: React.FC<TabsContentProps> = ({ activeTab, tabId, children }) => {
  if (activeTab !== tabId) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {children}
    </View>
  );
};

export default Tabs;
export { TabsContent };