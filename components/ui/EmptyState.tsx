import React from "react";
import { Text, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "info",
  action,
}) => {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <View className="items-center">
        <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-4">
          <IconSymbol name={icon} size={32} color="#6B7280" />
        </View>

        <Text className="text-xl font-semibold text-gray-900 text-center mb-2">
          {title}
        </Text>

        <Text className="text-gray-600 text-center mb-6 leading-6">
          {description}
        </Text>

        {action && <View className="w-full">{action}</View>}
      </View>
    </View>
  );
};
