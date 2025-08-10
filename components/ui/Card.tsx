import React from "react";
import { View, ViewProps } from "react-native";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const baseClasses = "bg-white rounded-xl";

  const variantClasses = {
    default: "border border-gray-100",
    elevated: "shadow-lg border-0",
    outlined: "border-2 border-gray-200",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <View className={classes} {...props}>
      {children}
    </View>
  );
};
