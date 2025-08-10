// app/(tabs)/add-patient.tsx
import { AddPatientForm } from "@/components/AddPatientForm";
import { useTranslation } from "react-i18next";
import { SafeAreaView, View } from "react-native";

export default function AddPatientScreen() {
  const { t, ready } = useTranslation();

  // Attendre que les traductions soient chargées
  if (!ready) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        <AddPatientForm />
      </View>
    </SafeAreaView>
  );
}
