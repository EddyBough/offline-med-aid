import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses = "rounded-xl font-semibold items-center justify-center";

  const variantClasses = {
    primary: "bg-primary-600",
    secondary: "bg-gray-200",
    outline: "bg-transparent border border-primary-600",
    danger: "bg-red-600",
  };

  const sizeClasses = {
    sm: "px-4 py-2",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <TouchableOpacity className={classes} activeOpacity={0.8} {...props}>
      <Text
        className={`font-semibold ${
          variant === "outline" ? "text-primary-600" : "text-white"
        }`}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
