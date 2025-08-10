import React from "react";
import { Text, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  variant?: "default" | "primary" | "secondary";
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  text,
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const variantColors = {
    default: "text-gray-600",
    primary: "text-primary-600",
    secondary: "text-gray-500",
  };

  return (
    <View className="items-center justify-center p-4">
      <View className={`${sizeClasses[size]} items-center justify-center`}>
        <IconSymbol
          name="arrow.clockwise"
          size={size === "sm" ? 20 : size === "md" ? 28 : 40}
          color={variant === "primary" ? "#3B82F6" : "#6B7280"}
        />
      </View>

      {text && (
        <Text
          className={`${textSizes[size]} ${variantColors[variant]} mt-3 text-center`}
        >
          {text}
        </Text>
      )}
    </View>
  );
};
