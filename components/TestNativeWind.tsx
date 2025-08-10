import React from "react";
import { Text, View } from "react-native";

export const TestNativeWind: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-blue-100 p-4">
      <Text className="text-2xl font-bold text-blue-800 mb-4">
        Test NativeWind
      </Text>
      <View className="bg-white rounded-lg p-6 shadow-lg">
        <Text className="text-lg text-gray-700">
          Si vous voyez ce texte stylé, NativeWind fonctionne !
        </Text>
        <View className="mt-4 bg-green-500 rounded p-3">
          <Text className="text-white font-semibold text-center">
            Bouton vert avec ombre
          </Text>
        </View>
      </View>
    </View>
  );
};
