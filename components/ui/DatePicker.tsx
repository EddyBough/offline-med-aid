import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';

interface DatePickerProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onValueChange,
  label,
  placeholder = 'Sélectionner une date...',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return placeholder;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR');
    } catch {
      return dateString;
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    // Générer des options pour les 30 derniers jours et les 30 prochains jours
    for (let i = -30; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dateString = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      options.push({
        label: i === 0 ? `Aujourd'hui - ${label}` : label,
        value: dateString
      });
    }
    
    return options;
  };

  const dateOptions = generateDateOptions();

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
            {formatDate(value)}
          </Text>
          <Text className="text-gray-400 text-lg">📅</Text>
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
                {label || 'Sélectionner une date'}
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
              {dateOptions.map((option) => (
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
