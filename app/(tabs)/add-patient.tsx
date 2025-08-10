// app/(tabs)/add-patient.tsx
import { AddPatientForm } from "@/components/AddPatientForm";
import { Header } from "@/components/ui/Header";
import { SafeAreaView, View } from "react-native";

export default function AddPatientScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="Nouveau Patient" />
      <View className="flex-1">
        <AddPatientForm />
      </View>
    </SafeAreaView>
  );
}
