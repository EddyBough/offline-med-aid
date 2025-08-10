import React from "react";
import { ScrollView, Text, View } from "react-native";

export const FinalTest: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Text className="text-3xl font-bold text-center text-blue-600 mb-8">
          🎨 Test Final NativeWind
        </Text>

        <View className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <Text className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Configuration NativeWind
          </Text>
          <Text className="text-gray-600 text-center mb-4">
            Si vous voyez ceci stylé avec des couleurs, des ombres et des
            espacements, NativeWind fonctionne parfaitement !
          </Text>
        </View>

        <View className="space-y-4">
          <View className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4">
            <Text className="text-white font-bold text-center text-lg">
              Dégradé Bleu-Violet
            </Text>
          </View>

          <View className="bg-green-500 rounded-lg p-4 shadow-xl">
            <Text className="text-white font-bold text-center text-lg">
              Vert avec Ombre
            </Text>
          </View>

          <View className="bg-red-500 rounded-lg p-4 border-2 border-red-700">
            <Text className="text-white font-bold text-center text-lg">
              Rouge avec Bordure
            </Text>
          </View>
        </View>

        <View className="mt-8 bg-yellow-100 rounded-lg p-4 border-l-4 border-yellow-500">
          <Text className="text-yellow-800 font-medium text-center">
            ✅ NativeWind est configuré et fonctionne !
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
