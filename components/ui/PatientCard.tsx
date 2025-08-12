import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { Badge } from "./Badge";
import { IconSymbol } from "./IconSymbol";

interface PatientCardProps {
  patient: {
    id: number;
    name: string;
    age?: number;
    gender?: string;
    diagnosis: string;
    treatment?: string;
    date?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onEdit,
  onDelete,
}) => {
  const { t, ready } = useTranslation();

  const getGenderBadgeVariant = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case "m":
      case "male":
      case "masculin":
        return "info" as const;
      case "f":
      case "female":
      case "féminin":
        return "success" as const;
      default:
        return "default" as const;
    }
  };

  const getGenderIcon = (gender?: string) => {
    switch (gender?.toLowerCase()) {
      case "m":
      case "male":
      case "masculin":
        return "♂";
      case "f":
      case "female":
      case "féminin":
        return "♀";
      default:
        return "?";
    }
  };

  return (
    <View className="bg-white rounded-xl border border-gray-200 shadow-sm mb-3 overflow-hidden">
      {/* Header avec nom et actions */}
      <View className="flex-row justify-between items-start p-4 pb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900 mb-1">
            {patient.name}
          </Text>
          <View className="flex-row items-center space-x-2">
            {patient.age && (
              <Text className="text-sm text-gray-600">
                {patient.age} {ready ? t("patients.age").toLowerCase() : "ans"}
              </Text>
            )}
            {patient.age && patient.gender && (
              <Text className="text-gray-300">•</Text>
            )}
            {patient.gender && (
              <Badge variant={getGenderBadgeVariant(patient.gender)} size="sm">
                <Text className="text-xs mr-1">
                  {getGenderIcon(patient.gender)}
                </Text>
                <Text className="text-xs">{patient.gender}</Text>
              </Badge>
            )}
          </View>
        </View>

        {/* Actions */}
        <View className="flex-row space-x-3 ml-4">
          {onEdit && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="w-8 h-8 rounded-lg bg-gray-100 items-center justify-center"
              activeOpacity={0.7}
            >
              <IconSymbol name="pencil" size={16} color="#6B7280" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="w-8 h-8 rounded-lg bg-red-50 items-center justify-center"
              activeOpacity={0.7}
            >
              <IconSymbol name="trash" size={16} color="#EF4444" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Contenu principal */}
      <View className="px-4 pb-4">
        {/* Diagnostic */}
        <View className="bg-blue-50 rounded-lg p-3 mb-3">
          <Text className="text-xs font-medium text-blue-700 mb-1 uppercase tracking-wide">
            {ready ? t("patients.diagnosis") : "DIAGNOSTIC"}
          </Text>
          <Text className="text-sm text-blue-900 leading-5">
            {patient.diagnosis}
          </Text>
        </View>

        {/* Traitement */}
        {patient.treatment && (
          <View className="bg-green-50 rounded-lg p-3 mb-3">
            <Text className="text-xs font-medium text-green-700 mb-1 uppercase tracking-wide">
              {ready ? t("patients.treatment") : "TRAITEMENT"}
            </Text>
            <Text className="text-sm text-green-900 leading-5">
              {patient.treatment}
            </Text>
          </View>
        )}

        {/* Footer avec date */}
        {patient.date && (
          <View className="flex-row items-center pt-2 border-t border-gray-100">
            <IconSymbol name="calendar" size={14} color="#9CA3AF" />
            <Text className="text-xs text-gray-500 ml-2">{patient.date}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
