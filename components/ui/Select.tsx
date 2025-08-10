import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Sélectionner...',
  label,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-800 font-semibold text-base mb-2">
          {label}
        </Text>
      )}
      
      <TouchableOpacity
        onPress={() => !disabled && setIsOpen(true)}
        className={`border rounded-lg px-4 py-3 bg-white ${
          disabled 
            ? 'border-gray-200 bg-gray-50' 
            : 'border-gray-300'
        }`}
        activeOpacity={disabled ? 1 : 0.8}
      >
        <View className="flex-row items-center justify-between">
          <Text className={`text-base ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
            {displayText}
          </Text>
          <Text className="text-gray-400 text-lg">▼</Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white rounded-t-xl max-h-96">
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-bold text-gray-900">
                {label || 'Sélectionner'}
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-gray-100"
                activeOpacity={0.7}
              >
                <Text className="text-gray-600 font-semibold">✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView className="p-2">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onValueChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`p-3 rounded-lg mb-1 ${
                    option.value === value 
                      ? 'bg-primary-100 border border-primary-200' 
                      : 'bg-white'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className={`font-medium ${
                    option.value === value ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};
