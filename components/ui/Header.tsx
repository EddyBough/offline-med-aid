import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface HeaderProps {
  title: string;
  subtitle?: string;
  leftAction?: {
    icon: string;
    onPress: () => void;
  };
  rightAction?: {
    icon: string;
    onPress: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftAction,
  rightAction,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View
      className={`px-4 py-4 border-b ${
        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"
      }`}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {leftAction && (
            <TouchableOpacity
              onPress={leftAction.onPress}
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{
                backgroundColor: isDark ? "#374151" : "#F3F4F6",
              }}
            >
              <IconSymbol
                name={leftAction.icon}
                size={20}
                color={isDark ? "#D1D5DB" : "#6B7280"}
              />
            </TouchableOpacity>
          )}

          <View className="flex-1">
            <Text
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {title}
            </Text>
            {subtitle && (
              <Text
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {rightAction && (
          <TouchableOpacity
            onPress={rightAction.onPress}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{
              backgroundColor: isDark ? "#374151" : "#F3F4F6",
            }}
          >
            <IconSymbol
              name={rightAction.icon}
              size={20}
              color={isDark ? "#D1D5DB" : "#6B7280"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
