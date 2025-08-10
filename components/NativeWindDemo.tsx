import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const NativeWindDemo: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Header */}
        <View className="bg-blue-600 rounded-lg p-6 mb-6">
          <Text className="text-white text-2xl font-bold text-center">
            🎨 NativeWind Demo
          </Text>
          <Text className="text-blue-100 text-center mt-2">
            Test des styles Tailwind CSS
          </Text>
        </View>

        {/* Cards */}
        <View className="space-y-4 mb-6">
          <View className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-green-500">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              ✅ Configuration Correcte
            </Text>
            <Text className="text-gray-600">
              Si vous voyez cette carte avec des couleurs et des ombres,
              NativeWind fonctionne parfaitement !
            </Text>
          </View>

          <View className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-blue-500">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              🔧 Classes Utilisées
            </Text>
            <Text className="text-gray-600">
              bg-white, rounded-xl, shadow-lg, p-4, border-l-4, border-blue-500
            </Text>
          </View>

          <View className="bg-white rounded-xl shadow-lg p-4 border-l-4 border-purple-500">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              📱 Composants React Native
            </Text>
            <Text className="text-gray-600">
              View, Text, TouchableOpacity avec className au lieu de style
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <View className="space-y-3">
          <TouchableOpacity className="bg-green-500 rounded-lg p-4 active:bg-green-600">
            <Text className="text-white font-bold text-center text-lg">
              Bouton Vert
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-red-500 rounded-lg p-4 active:bg-red-600">
            <Text className="text-white font-bold text-center text-lg">
              Bouton Rouge
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-purple-500 rounded-lg p-4 active:bg-purple-600">
            <Text className="text-white font-bold text-center text-lg">
              Bouton Violet
            </Text>
          </TouchableOpacity>
        </View>

        {/* Status */}
        <View className="mt-6 bg-yellow-100 rounded-lg p-4 border border-yellow-300">
          <Text className="text-yellow-800 font-medium text-center">
            💡 Si vous ne voyez pas les couleurs, vérifiez la configuration
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
