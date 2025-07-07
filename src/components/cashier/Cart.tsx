import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Plus, Minus, Trash2, ShoppingCart, DollarSign } from 'lucide-react-native';
import { getColor, getBorderRadius, getShadowStyles, getBorderStyles, theme } from '../../components/theme';
import { FoodItem } from '../../hooks/FoodList';

interface CartItem extends FoodItem {
  quantity: number;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemCode: string, newQuantity: number) => void;
  onRemoveItem: (itemCode: string) => void;
  onConfirmOrder: () => void;
  onEnterAmountReceived: () => void;
  totalPaid?: number;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onConfirmOrder,
  onEnterAmountReceived,
  totalPaid = 0,
}) => {
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateChange = () => {
    return totalPaid - calculateTotal();
  };

  const total = calculateTotal();
  const change = calculateChange();

  const renderCartItem = (item: CartItem) => (
    <View
      key={item.code}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: getColor('card'),
        borderRadius: getBorderRadius('md'),
        marginBottom: 8,
        ...getShadowStyles('sm'),
        ...getBorderStyles('sm', 'border'),
      }}
    >
      {/* Item Info */}
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontFamily: theme.fonts.semibold,
          color: getColor('foreground'),
          marginBottom: 4,
        }}>
          {item.name}
        </Text>
        <Text style={{
          fontSize: 14,
          fontFamily: theme.fonts.medium,
          color: getColor('muted-foreground'),
        }}>
          {item.code} - ₱{item.price}
        </Text>
      </View>

      {/* Quantity Controls */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 12,
      }}>
        <Pressable
          onPress={() => onUpdateQuantity(item.code, Math.max(0, item.quantity - 1))}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: getColor('muted'),
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          <Minus width={16} height={16} color={getColor('foreground')} />
        </Pressable>

        <Text style={{
          fontSize: 16,
          fontFamily: theme.fonts.bold,
          color: getColor('foreground'),
          minWidth: 30,
          textAlign: 'center',
        }}>
          {item.quantity}
        </Text>

        <Pressable
          onPress={() => onUpdateQuantity(item.code, item.quantity + 1)}
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: getColor('primary.100'),
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8,
          }}
        >
          <Plus width={16} height={16} color={getColor('primary.700')} />
        </Pressable>
      </View>

      {/* Delete Button */}
      <Pressable
        onPress={() => onRemoveItem(item.code)}
        style={{
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: getColor('destructive.DEFAULT'),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Trash2 width={16} height={16} color={getColor('destructive.foreground')} />
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, flexDirection: 'row', gap: 16, marginBottom: 20 }}>
      {/* Left Column - Food Item List */}
      <View style={{ flex: 1 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <ShoppingCart 
            width={20} 
            height={20} 
            color={getColor('foreground')} 
            style={{ marginRight: 8 }}
          />
          <Text style={{
            fontSize: 18,
            fontFamily: theme.fonts.semibold,
            color: getColor('foreground'),
          }}>
            Food Items
          </Text>
        </View>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {cartItems.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 40,
            }}>
              <Text style={{
                fontSize: 16,
                fontFamily: theme.fonts.medium,
                color: getColor('muted-foreground'),
                textAlign: 'center',
              }}>
                No items in cart
              </Text>
            </View>
          ) : (
            cartItems.map(renderCartItem)
          )}
        </ScrollView>
      </View>

      {/* Right Column - Total Summary */}
      <View style={{ 
        width: 280,
        backgroundColor: getColor('muted'),
        borderRadius: getBorderRadius('lg'),
        padding: 16,
        ...getShadowStyles('sm'),
        ...getBorderStyles('sm', 'border'),
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 16,
        }}>
          <DollarSign 
            width={20} 
            height={20} 
            color={getColor('foreground')} 
            style={{ marginRight: 8 }}
          />
          <Text style={{
            fontSize: 18,
            fontFamily: theme.fonts.semibold,
            color: getColor('foreground'),
          }}>
            Order Summary
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Summary Details */}
          <View style={{ marginBottom: 24 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.medium,
              color: getColor('foreground'),
            }}>
              Total:
            </Text>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.bold,
              color: getColor('foreground'),
            }}>
              ₱{total.toFixed(2)}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.medium,
              color: getColor('foreground'),
            }}>
              Paid:
            </Text>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.bold,
              color: getColor('primary.600'),
            }}>
              ₱{totalPaid.toFixed(2)}
            </Text>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.medium,
              color: getColor('foreground'),
            }}>
              Change:
            </Text>
            <Text style={{
              fontSize: 16,
              fontFamily: theme.fonts.bold,
              color: change >= 0 ? getColor('primary.600') : getColor('destructive.DEFAULT'),
            }}>
              ₱{change.toFixed(2)}
            </Text>
          </View>

          <View style={{
            height: 1,
            backgroundColor: getColor('muted-foreground'),
            marginVertical: 8,
          }} />
        </View>

        {/* Enter Amount Received Button */}
        <Pressable
          onPress={onEnterAmountReceived}
          disabled={cartItems.length === 0}
          style={{
            backgroundColor: cartItems.length === 0 
              ? getColor('muted-foreground') 
              : getColor('secondary.500'),
            borderRadius: getBorderRadius('md'),
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: 'center',
            marginBottom: 12,
            ...getShadowStyles('sm'),
          }}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: theme.fonts.semibold,
            color: getColor('secondary.foreground'),
          }}>
            Enter Amount Received
          </Text>
        </Pressable>

        {/* Confirm Order Button */}
        <Pressable
          onPress={onConfirmOrder}
          disabled={cartItems.length === 0 || totalPaid < total}
          style={{
            backgroundColor: cartItems.length === 0 || totalPaid < total 
              ? getColor('primary.500') 
              : getColor('primary.500'),
            borderRadius: getBorderRadius('md'),
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: 'center',
            ...getShadowStyles('sm'),
          }}
        >
          <Text style={{
            fontSize: 16,
            fontFamily: theme.fonts.semibold,
            color: getColor('primary.foreground'),
          }}>
            Confirm Order
          </Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Cart;