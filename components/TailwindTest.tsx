import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const TailwindTest: React.FC = () => {
  return (
    <View className="flex-1 bg-gray-100 p-6">
      <View className="bg-white rounded-xl shadow-lg p-6 mb-4">
        <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
          🎨 Test NativeWind
        </Text>
        <Text className="text-gray-600 text-center mb-4">
          Si vous voyez ceci stylé, NativeWind fonctionne !
        </Text>

        <View className="space-y-3">
          <View className="bg-blue-500 rounded-lg p-3">
            <Text className="text-white font-semibold text-center">
              Carte bleue
            </Text>
          </View>

          <View className="bg-green-500 rounded-lg p-3">
            <Text className="text-white font-semibold text-center">
              Carte verte
            </Text>
          </View>

          <View className="bg-purple-500 rounded-lg p-3">
            <Text className="text-white font-semibold text-center">
              Carte violette
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="bg-red-500 rounded-lg p-4 active:bg-red-600">
        <Text className="text-white font-bold text-center text-lg">
          Bouton de Test
        </Text>
      </TouchableOpacity>
    </View>
  );
};
