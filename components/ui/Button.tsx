import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg items-center justify-center';
  const variantClasses = {
    primary: 'bg-blue-500 active:bg-blue-600',
    secondary: 'bg-gray-300 active:bg-gray-400'
  };
  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-800 font-semibold'
  };

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <Text className={textClasses[variant]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}; 