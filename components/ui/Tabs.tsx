import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TabItem {
  key: string;
  title: string;
  icon?: string;
  badge?: string | number;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  variant?: "default" | "pills" | "underline";
  scrollable?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onTabPress,
  variant = "default",
  scrollable = false,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const getTabClasses = (isActive: boolean) => {
    const baseClasses = "px-4 py-2 rounded-lg flex-row items-center";

    if (variant === "pills") {
      return `${baseClasses} ${
        isActive
          ? "bg-primary-600"
          : isDark
          ? "bg-gray-800 text-gray-300"
          : "bg-gray-100 text-gray-600"
      }`;
    }

    if (variant === "underline") {
      return `${baseClasses} border-b-2 ${
        isActive ? "border-primary-600" : "border-transparent"
      }`;
    }

    // default variant
    return `${baseClasses} ${
      isActive
        ? "bg-primary-50 text-primary-700"
        : isDark
        ? "text-gray-400"
        : "text-gray-600"
    }`;
  };

  const getTextClasses = (isActive: boolean) => {
    if (variant === "pills") {
      return `font-medium ${isActive ? "text-white" : ""}`;
    }

    return `font-medium ${isActive ? "text-primary-700" : ""}`;
  };

  const TabContent = () => (
    <View className="flex-row space-x-2">
      {items.map((item) => {
        const isActive = activeTab === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            onPress={() => onTabPress(item.key)}
            className={getTabClasses(isActive)}
            activeOpacity={0.7}
          >
            <Text className={getTextClasses(isActive)}>{item.title}</Text>

            {item.badge && (
              <View
                className={`ml-2 px-2 py-1 rounded-full ${
                  isActive ? "bg-primary-100" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    isActive ? "text-primary-700" : "text-gray-600"
                  }`}
                >
                  {item.badge}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <TabContent />
      </ScrollView>
    );
  }

  return (
    <View className="px-4">
      <TabContent />
    </View>
  );
};
