import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface AlertProps {
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  onClose?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onClose,
  action,
}) => {
  const typeClasses = {
    info: "bg-blue-50 border-blue-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
    error: "bg-red-50 border-red-200",
  };

  const iconMap = {
    info: "ℹ️",
    success: "✅",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <View className={`p-4 border rounded-lg ${typeClasses[type]} mb-4`}>
      <View className="flex-row items-start">
        <Text className="text-lg mr-3">{iconMap[type]}</Text>
        <View className="flex-1">
          <Text className="font-semibold text-gray-900 mb-1">{title}</Text>
          {message && (
            <Text className="text-gray-700 text-sm mb-3">{message}</Text>
          )}

          <View className="flex-row space-x-3">
            {action && (
              <TouchableOpacity
                onPress={action.onPress}
                className="px-4 py-2 rounded-lg bg-blue-600"
                activeOpacity={0.8}
              >
                <Text className="text-white font-medium text-sm">
                  {action.label}
                </Text>
              </TouchableOpacity>
            )}

            {onClose && (
              <TouchableOpacity
                onPress={onClose}
                className="px-4 py-2 rounded-lg bg-gray-200"
                activeOpacity={0.8}
              >
                <Text className="text-gray-700 font-medium text-sm">
                  Fermer
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
