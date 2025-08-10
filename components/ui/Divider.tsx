import React from "react";
import { View } from "react-native";

interface DividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Divider: React.FC<DividerProps> = ({
  className = "",
  orientation = "horizontal",
}) => {
  const baseClasses =
    orientation === "horizontal" ? "h-px bg-gray-200" : "w-px bg-gray-200";

  return <View className={`${baseClasses} ${className}`} />;
};
