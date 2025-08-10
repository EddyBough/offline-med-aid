import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Text, View } from "react-native";

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  variant?: "default" | "primary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  variant = "default",
  size = "md",
  animated = true,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const variantColors = {
    default: {
      bg: isDark ? "bg-gray-700" : "bg-gray-200",
      fill: "bg-primary-600",
      text: isDark ? "text-gray-300" : "text-gray-700",
    },
    primary: {
      bg: isDark ? "bg-gray-700" : "bg-gray-200",
      fill: "bg-primary-600",
      text: isDark ? "text-gray-300" : "text-gray-700",
    },
    success: {
      bg: isDark ? "bg-gray-700" : "bg-gray-200",
      fill: "bg-green-600",
      text: isDark ? "text-gray-300" : "text-gray-700",
    },
    warning: {
      bg: isDark ? "bg-gray-700" : "bg-gray-200",
      fill: "bg-yellow-600",
      text: isDark ? "text-gray-300" : "text-gray-700",
    },
    error: {
      bg: isDark ? "bg-gray-700" : "bg-gray-200",
      fill: "bg-red-600",
      text: isDark ? "text-gray-300" : "text-gray-700",
    },
  };

  const colors = variantColors[variant];

  return (
    <View className="w-full">
      {(label || showPercentage) && (
        <View className="flex-row justify-between items-center mb-2">
          {label && (
            <Text className={`${textSizes[size]} font-medium ${colors.text}`}>
              {label}
            </Text>
          )}

          {showPercentage && (
            <Text className={`${textSizes[size]} font-medium ${colors.text}`}>
              {Math.round(percentage)}%
            </Text>
          )}
        </View>
      )}

      <View
        className={`w-full ${sizeClasses[size]} ${colors.bg} rounded-full overflow-hidden`}
      >
        <View
          className={`${colors.fill} ${sizeClasses[size]} rounded-full`}
          style={{
            width: `${percentage}%`,
            transition: animated ? "width 0.3s ease-in-out" : "none",
          }}
        />
      </View>

      {!showPercentage && (
        <View className="flex-row justify-between items-center mt-1">
          <Text className={`${textSizes[size]} ${colors.text}`}>{value}</Text>
          <Text className={`${textSizes[size]} ${colors.text}`}>{max}</Text>
        </View>
      )}
    </View>
  );
};
