import React from 'react';
import { View, Pressable, ViewStyle } from 'react-native';
import { getColor, getBorderRadius, getShadowStyles, getBorderStyles } from '../theme';

interface CardButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

const CardButton: React.FC<CardButtonProps> = ({ 
  children, 
  onPress, 
  style 
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: getColor('card'),
          borderRadius: getBorderRadius('md'),
          padding: 0,
          height: 160,
          justifyContent: 'center',
          alignItems: 'center',
          ...getShadowStyles('sm'),
          ...getBorderStyles('sm', 'border'),
        },
        style
      ]}
    >
      {children}
    </Pressable>
  );
};

export default CardButton;
