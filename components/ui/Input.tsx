import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  required?: boolean;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  containerClassName = "",
  className = "",
  ...props
}) => {
  return (
    <View className={`mb-4 ${containerClassName}`}>
      {label && (
        <Text className="text-gray-800 font-semibold text-base mb-2 flex-row items-center">
          {label}
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </Text>
      )}

      <TextInput
        className={`border rounded-lg px-4 py-3 text-base bg-white text-gray-900 placeholder:text-gray-500 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        } ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
