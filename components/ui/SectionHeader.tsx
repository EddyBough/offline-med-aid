import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  action,
}) => {
  return (
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
        {subtitle && (
          <Text className="text-gray-600 text-base mt-1">{subtitle}</Text>
        )}
      </View>

      {action && (
        <TouchableOpacity
          onPress={action.onPress}
          className="px-4 py-2 rounded-lg bg-primary-100"
          activeOpacity={0.8}
        >
          <Text className="text-primary-700 font-semibold text-sm">
            {action.label}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
