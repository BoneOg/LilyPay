import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MapPin } from 'react-native-feather';
import { getColor, getBorderRadius, getContainerStyles, getShadowStyles, getBorderStyles, theme } from '../../components/theme';

interface TableSelectorProps {
  selected: number | null;
  onTableSelect: (index: number) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ selected, onTableSelect }) => {
  const containerStyles = getContainerStyles();

  return (
    <View style={{
      height: '18%', 
      backgroundColor: getColor('card'), 
      justifyContent: 'center', 
      alignItems: 'center',
      borderRadius: getBorderRadius('lg'), 
      paddingHorizontal: containerStyles.paddingHorizontal,
      ...getShadowStyles('sm'), 
      ...getBorderStyles('sm', 'border'),
    }}>
      {/* Header Row with Map Pin, Text, and Dynamic Table Badge */}
      <View style={{
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 12, 
        justifyContent: 'space-between'
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MapPin width={24} height={24} color={getColor('primary.500')} />
          <Text style={{
            marginLeft: 8, 
            fontSize: 18, 
            fontFamily: theme.fonts.semibold,
            color: getColor('primary.700'),
          }}>
            Select Table
          </Text>
        </View>
        {selected !== null && (
          <View style={{
            backgroundColor: getColor('primary.500'), 
            borderRadius: getBorderRadius('md'),
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            ...getShadowStyles('sm'),
          }}>
            <Text style={{
              fontSize: 14, 
              fontFamily: theme.fonts.bold,
              color: getColor('primary.foreground'),
            }}>
              Table {selected + 1}
            </Text>
          </View>
        )}
      </View>

      {/* 6 Card Boxes in a Row */}
      <View style={{
        width: '100%', 
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        {[...Array(6)].map((_, idx) => {
          const isActive = selected === idx;
          return (
            <Pressable
              key={idx}
              onPress={() => onTableSelect(idx)}
              style={{
                backgroundColor: isActive ? getColor('primary.100') : getColor('muted'),
                borderRadius: getBorderRadius('md'), 
                flex: 1, 
                height: '80%',
                marginRight: idx < 5 ? 8 : 0, 
                justifyContent: 'center', 
                alignItems: 'center',
                ...getShadowStyles('sm'), 
                ...getBorderStyles(isActive ? 'md' : 'sm', isActive ? 'primary.500' : 'border'),
              }}
            >
              <Text style={{
                fontSize: 18, 
                fontFamily: theme.fonts.bold,
                color: isActive ? getColor('primary.700') : getColor('foreground'),
              }}>
                {`T${idx + 1}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TableSelector; 