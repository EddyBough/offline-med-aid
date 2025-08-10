import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Badge, Card } from "./ui";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  treatment: string;
  date: string;
}

interface PatientCardProps {
  patient: Patient;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onPress,
  onEdit,
  onDelete,
}) => {
  const getGenderBadgeVariant = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "m":
        return "info";
      case "f":
        return "warning";
      default:
        return "default";
    }
  };

  const getGenderLabel = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "m":
        return "Homme";
      case "f":
        return "Femme";
      default:
        return gender || "Non spécifié";
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Card className="p-4 mb-4">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {patient.name}
            </Text>
            <View className="flex-row items-center space-x-2">
              <Badge variant="info" size="sm">
                {patient.age} ans
              </Badge>
              <Badge variant={getGenderBadgeVariant(patient.gender)} size="sm">
                {getGenderLabel(patient.gender)}
              </Badge>
            </View>
          </View>

          <Text className="text-sm text-gray-500">
            {new Date(patient.date).toLocaleDateString("fr-FR")}
          </Text>
        </View>

        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-1">Diagnostic:</Text>
          <Text className="text-gray-900 font-medium">{patient.diagnosis}</Text>
        </View>

        {patient.treatment && (
          <View className="mb-3">
            <Text className="text-sm text-gray-600 mb-1">Traitement:</Text>
            <Text className="text-gray-900 font-medium">
              {patient.treatment}
            </Text>
          </View>
        )}

        <View className="flex-row space-x-2 pt-2 border-t border-gray-100">
          {onEdit && (
            <TouchableOpacity
              onPress={onEdit}
              className="flex-1 bg-primary-100 py-2 px-3 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-primary-700 text-center font-medium text-sm">
                Modifier
              </Text>
            </TouchableOpacity>
          )}

          {onDelete && (
            <TouchableOpacity
              onPress={onDelete}
              className="flex-1 bg-red-100 py-2 px-3 rounded-lg"
              activeOpacity={0.7}
            >
              <Text className="text-red-700 text-center font-medium text-sm">
                Supprimer
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
