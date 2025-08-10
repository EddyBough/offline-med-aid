import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  source?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'circle' | 'rounded';
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  initials,
  size = 'md',
  variant = 'circle',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const shapeClasses = variant === 'circle' ? 'rounded-full' : 'rounded-lg';

  if (source) {
    return (
      <Image
        source={{ uri: source }}
        className={`${sizeClasses[size]} ${shapeClasses}`}
        resizeMode="cover"
      />
    );
  }

  return (
    <View className={`${sizeClasses[size]} ${shapeClasses} bg-primary-600 items-center justify-center`}>
      <Text className={`${textSizeClasses[size]} font-bold text-white`}>
        {initials || '?'}
      </Text>
    </View>
  );
};
