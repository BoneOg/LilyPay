import React, { useState } from 'react';
import { View, Text, ScrollView, LayoutChangeEvent } from 'react-native';
import { getColor, getBorderRadius, getShadowStyles, theme } from '../../components/theme';
import CardButton from '../ui/Card';

interface FoodItem {
  code: string;
  name: string;
  price: number;
}

interface FoodMenuProps {
  foodItems: FoodItem[];
  onFoodSelect?: (food: FoodItem) => void;
}

const FoodMenu: React.FC<FoodMenuProps> = ({
  foodItems,
  onFoodSelect
}) => {
  const numColumns = 5;
  const gap = 4; // 4px gap between cards
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const cardWidth =
    containerWidth !== null
      ? (containerWidth - gap * (numColumns - 1)) / numColumns
      : undefined;

  const renderFoodCard = (food: FoodItem, index: number) => {
    const isLastInRow = (index + 1) % numColumns === 0;
    return (
      <CardButton
        key={food.code}
        onPress={() => onFoodSelect?.(food)}
        style={{
          marginRight: isLastInRow ? 0 : gap,
          width: cardWidth,
        }}
      >
        <View style={{ 
          height: '100%', 
          position: 'relative',
          padding: 2,
        }}>
          {/* Food Code - Fixed at top */}
          <Text style={{
            fontSize: 32,
            fontFamily: theme.fonts.bold,
            color: getColor('foreground'),
            textAlign: 'center',
            marginTop: 1,
          }}>
            {food.code}
          </Text>
          
          {/* Food Name - Fixed in middle */}
          <Text style={{
            fontSize: 12,
            fontFamily: theme.fonts.medium,
            color: getColor('muted-foreground'),
            textAlign: 'center',
            maxWidth: '100%',
            paddingHorizontal: 4,
            marginTop: 2,
          }}>
            {food.name}
          </Text>
          
          {/* Price Badge - Fixed width for 5 digits + peso sign */}
          <View style={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            right: 0,
            alignItems: 'center', // Centers the badge horizontally
          }}>
            <View style={{
              backgroundColor: getColor('accent2.500'),
              borderRadius: getBorderRadius('sm'),
              paddingVertical: 4,
              paddingHorizontal: 8,
              alignItems: 'center',
              justifyContent: 'center',
              width: 70, // Fixed width instead of minWidth
              marginBottom: 10,
              ...getShadowStyles('sm'),
            }}>
            <Text style={{
              fontSize: 14,
              fontFamily: theme.fonts.bold,
              color: getColor('foreground'),
              textAlign: 'center',
            }}>
              ₱{food.price}
            </Text>
            </View>
          </View>
        </View>
      </CardButton>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          width: '100%',
        }}
        onLayout={handleLayout}
      >
        {containerWidth &&
          foodItems.map((food, index) => renderFoodCard(food, index))}
      </View>
    </ScrollView>
  );
};

export default FoodMenu;