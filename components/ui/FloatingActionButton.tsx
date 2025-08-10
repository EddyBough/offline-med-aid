import React from "react";
import { TouchableOpacity } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface FloatingActionButtonProps {
  icon: string;
  onPress: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  disabled?: boolean;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  size = "md",
  variant = "primary",
  disabled = false,
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-14 h-14",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 28,
  };

  const variantClasses = {
    primary: "bg-blue-600",
    secondary: "bg-gray-600",
    success: "bg-green-600",
    warning: "bg-yellow-600",
    error: "bg-red-600",
  };

  const disabledClasses = disabled ? "opacity-50" : "";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} rounded-full items-center justify-center shadow-lg absolute bottom-6 right-6 active:scale-95`}
      activeOpacity={disabled ? 1 : 0.8}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      <IconSymbol name={icon} size={iconSizes[size]} color="white" />
    </TouchableOpacity>
  );
};
