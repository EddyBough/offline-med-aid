import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Rechercher...",
  onClear,
  onSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-6">
      <View
        className={`flex-row items-center bg-white border rounded-xl px-4 py-3 shadow-sm ${
          isFocused ? "border-blue-500 shadow-md" : "border-gray-200"
        }`}
      >
        <IconSymbol
          name="magnifyingglass"
          size={20}
          color={isFocused ? "#3B82F6" : "#9CA3AF"}
        />

        <TextInput
          className="flex-1 ml-3 text-base text-gray-900"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={onSubmit}
          returnKeyType="search"
        />

        {value.length > 0 && onClear && (
          <TouchableOpacity
            onPress={onClear}
            className="ml-2 p-1 rounded-full bg-gray-100"
            activeOpacity={0.7}
          >
            <IconSymbol name="xmark" size={16} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
