import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  maxWidth = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800',
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPressIn={() => setIsVisible(true)}
        onPressOut={() => setIsVisible(false)}
        activeOpacity={1}
      >
        {children}
      </TouchableOpacity>
      
      {isVisible && (
        <View className={`absolute z-50 ${positionClasses[position]}`}>
          <View 
            className="bg-gray-800 rounded-lg px-3 py-2"
            style={{ maxWidth }}
          >
            <Text className="text-white text-sm text-center">
              {content}
            </Text>
          </View>
          
          {/* Arrow */}
          <View className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`} />
        </View>
      )}
    </View>
  );
};
