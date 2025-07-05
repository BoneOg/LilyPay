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
          marginBottom: 8,
          marginRight: isLastInRow ? 0 : gap,
          width: cardWidth,
        }}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{
            fontSize: 20,
            fontFamily: theme.fonts.bold,
            color: getColor('foreground'),
            marginBottom: 4,
          }}>
            {food.code}
          </Text>
          <Text style={{
            fontSize: 12,
            fontFamily: theme.fonts.medium,
            color: getColor('muted-foreground'),
            textAlign: 'center',
            marginBottom: 6,
            maxWidth: 80,
          }}>
            {food.name}
          </Text>
          <View style={{
            backgroundColor: getColor('accent2.500'),
            borderRadius: getBorderRadius('sm'),
            paddingHorizontal: 8,
            paddingVertical: 4,
            ...getShadowStyles('sm'),
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: theme.fonts.bold,
              color: getColor('foreground'),
            }}>
              ₱{food.price}
            </Text>
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