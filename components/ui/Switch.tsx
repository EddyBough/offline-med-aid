import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  label,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8',
  };

  const thumbSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  const thumbPositionClasses = {
    sm: value ? 'translate-x-4' : 'translate-x-0',
    md: value ? 'translate-x-5' : 'translate-x-0',
    lg: value ? 'translate-x-6' : 'translate-x-0',
  };

  const bgClasses = value 
    ? 'bg-primary-600' 
    : 'bg-gray-300';

  const disabledClasses = disabled 
    ? 'opacity-50' 
    : '';

  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        onPress={() => !disabled && onValueChange(!value)}
        className={`${sizeClasses[size]} ${bgClasses} ${disabledClasses} rounded-full p-0.5`}
        activeOpacity={disabled ? 1 : 0.8}
      >
        <View 
          className={`${thumbSizeClasses[size]} bg-white rounded-full shadow-sm ${thumbPositionClasses[size]}`}
        />
      </TouchableOpacity>
      
      {label && (
        <Text className={`ml-3 text-gray-700 ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </Text>
      )}
    </View>
  );
};
