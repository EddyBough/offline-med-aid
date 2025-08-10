import React from "react";
import { Text, View } from "react-native";

export const SimpleTest: React.FC = () => {
  return (
    <View className="bg-red-500 p-4 m-4 rounded-lg">
      <Text className="text-white text-center font-bold text-lg">
        🎯 Test NativeWind - Rouge avec coins arrondis
      </Text>
    </View>
  );
};
