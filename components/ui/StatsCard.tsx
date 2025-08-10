import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface StatsCardProps {
  title: string;
  value: string;
  icon:
    | "house.fill"
    | "paperplane.fill"
    | "chevron.left.forwardslash.chevron.right"
    | "chevron.right"
    | "chevron.up"
    | "chevron.down";
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  onClick?: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  variant = "primary",
  subtitle,
  trend,
  onClick,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const variantColors = {
    primary: {
      bg: isDark ? "bg-primary-900/20" : "bg-primary-50",
      icon: isDark ? "bg-primary-800" : "bg-primary-100",
      text: isDark ? "text-primary-300" : "text-primary-700",
      value: isDark ? "text-primary-100" : "text-primary-900",
      border: isDark ? "border-primary-800/30" : "border-primary-200",
    },
    secondary: {
      bg: isDark ? "bg-gray-800/20" : "bg-gray-50",
      icon: isDark ? "bg-gray-700" : "bg-gray-100",
      text: isDark ? "text-gray-300" : "text-gray-700",
      value: isDark ? "text-gray-100" : "text-gray-900",
      border: isDark ? "border-gray-700/30" : "border-gray-200",
    },
    success: {
      bg: isDark ? "bg-green-900/20" : "bg-green-50",
      icon: isDark ? "bg-green-800" : "bg-green-100",
      text: isDark ? "text-green-300" : "text-green-700",
      value: isDark ? "text-green-100" : "text-green-900",
      border: isDark ? "border-green-800/30" : "border-green-200",
    },
    warning: {
      bg: isDark ? "bg-yellow-900/20" : "bg-yellow-50",
      icon: isDark ? "bg-yellow-800" : "bg-yellow-100",
      text: isDark ? "text-yellow-300" : "text-yellow-700",
      value: isDark ? "text-yellow-100" : "text-yellow-900",
      border: isDark ? "border-yellow-800/30" : "border-yellow-200",
    },
    error: {
      bg: isDark ? "bg-red-900/20" : "bg-red-50",
      icon: isDark ? "bg-red-800" : "bg-red-100",
      text: isDark ? "text-red-300" : "text-red-700",
      value: isDark ? "text-red-100" : "text-red-900",
      border: isDark ? "border-red-800/30" : "border-red-200",
    },
    info: {
      bg: isDark ? "bg-blue-900/20" : "bg-blue-50",
      icon: isDark ? "bg-blue-800" : "bg-blue-100",
      text: isDark ? "text-blue-300" : "text-blue-700",
      value: isDark ? "text-blue-100" : "text-blue-900",
      border: isDark ? "border-blue-800/30" : "border-blue-200",
    },
  };

  const colors = variantColors[variant];

  const CardContent = () => (
    <View className={`p-4 rounded-xl border ${colors.bg} ${colors.border}`}>
      <View className="flex-row items-center justify-between mb-3">
        <View
          className={`w-10 h-10 rounded-lg ${colors.icon} items-center justify-center`}
        >
          <IconSymbol name={icon} size={20} color={colors.text} />
        </View>

        {trend && (
          <View
            className={`flex-row items-center px-2 py-1 rounded-full ${
              trend.isPositive
                ? isDark
                  ? "bg-green-800/30"
                  : "bg-green-100"
                : isDark
                ? "bg-red-800/30"
                : "bg-red-100"
            }`}
          >
            <IconSymbol
              name={trend.isPositive ? "chevron.up" : "chevron.down"}
              size={12}
              color={trend.isPositive ? "#10B981" : "#EF4444"}
            />
            <Text
              className={`ml-1 text-xs font-medium ${
                trend.isPositive ? "text-green-700" : "text-red-700"
              }`}
            >
              {trend.value}%
            </Text>
          </View>
        )}
      </View>

      <Text className={`text-2xl font-bold ${colors.value} mb-1`}>{value}</Text>

      <Text className={`text-sm font-medium ${colors.text}`}>{title}</Text>

      {subtitle && (
        <Text className={`text-xs ${colors.text} mt-1 opacity-80`}>
          {subtitle}
        </Text>
      )}

      {trend && (
        <Text className={`text-xs ${colors.text} mt-2 opacity-60`}>
          {trend.period}
        </Text>
      )}
    </View>
  );

  if (onClick) {
    return (
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={0.8}
        className="flex-1"
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View className="flex-1">
      <CardContent />
    </View>
  );
};
