import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Utensils } from 'lucide-react-native';
import { getColor, getBorderRadius, getContainerStyles, getShadowStyles, getBorderStyles, theme } from '../../components/theme';

interface OrderTypeProps {
  selected: 'dine-in' | 'take-out' | null;
  onOrderTypeSelect: (type: 'dine-in' | 'take-out') => void;
}

const OrderType: React.FC<OrderTypeProps> = ({ selected, onOrderTypeSelect }) => {
  const containerStyles = getContainerStyles();

  return (
    <View style={{
      flex: 1,
      backgroundColor: getColor('card'), 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: getBorderRadius('lg'), 
      paddingHorizontal: containerStyles.paddingHorizontal,
      ...getShadowStyles('sm'), 
      ...getBorderStyles('sm', 'border'),
    }}>
      {/* Header Row with Coffee Icon, Text, and Dynamic Order Type Badge */}
      <View style={{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 12, 
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Utensils width={24} height={24} color={getColor('primary.500')} />
          <Text style={{
            marginLeft: 8, 
            fontSize: 18, 
            fontFamily: theme.fonts.semibold,
            color: getColor('primary.700'),
          }}>
            Order Type
          </Text>
        </View>
        {selected !== null && (
          <View style={{
            backgroundColor: getColor('primary.500'), 
            borderRadius: getBorderRadius('md'),
            paddingHorizontal: 8, 
            paddingVertical: 4, 
            ...getShadowStyles('sm'),
          }}>
            <Text style={{
              fontSize: 12, 
              fontFamily: theme.fonts.bold,
              color: getColor('primary.foreground'),
            }}>
              {selected === 'dine-in' ? 'Dine In' : 'Take Out'}
            </Text>
          </View>
        )}
      </View>

      {/* Dine In and Take Out Buttons */}
      <View style={{
        width: '100%', 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 6
      }}>
        <Pressable
          onPress={() => onOrderTypeSelect('dine-in')}
          style={{
            backgroundColor: selected === 'dine-in' ? getColor('primary.100') : getColor('muted'),
            borderRadius: getBorderRadius('md'), 
            flex: 1, 
            height: '80%',
            marginRight: 8, 
            justifyContent: 'center', 
            alignItems: 'center',
            ...getShadowStyles('sm'), 
            ...getBorderStyles(selected === 'dine-in' ? 'md' : 'sm', selected === 'dine-in' ? 'primary.500' : 'border'),
          }}
        >
          <Text style={{
            fontSize: 18, 
            fontFamily: theme.fonts.bold,
            color: selected === 'dine-in' ? getColor('primary.700') : getColor('foreground'),
          }}>
            Dine In
          </Text>
        </Pressable>
        
        <Pressable
          onPress={() => onOrderTypeSelect('take-out')}
          style={{
            backgroundColor: selected === 'take-out' ? getColor('primary.100') : getColor('muted'),
            borderRadius: getBorderRadius('md'), 
            flex: 1, 
            height: '80%',
            marginLeft: 8, 
            justifyContent: 'center', 
            alignItems: 'center',
            ...getShadowStyles('sm'), 
            ...getBorderStyles(selected === 'take-out' ? 'md' : 'sm', selected === 'take-out' ? 'primary.500' : 'border'),
          }}
        >
          <Text style={{
            fontSize: 18, 
            fontFamily: theme.fonts.bold,
            color: selected === 'take-out' ? getColor('primary.700') : getColor('foreground'),
          }}>
            Take Out
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default OrderType; 