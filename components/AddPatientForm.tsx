import { insertPatient } from "@/storage/db";
import { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { FormField } from "./FormField";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { DatePicker } from "./ui/DatePicker";
import { Select } from "./ui/Select";

export const AddPatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const genderOptions = [
    { label: "Masculin", value: "M" },
    { label: "Féminin", value: "F" },
    { label: "Autre", value: "A" },
  ];

  const handleSubmit = async () => {
    if (!name.trim() || !diagnosis.trim()) {
      Alert.alert("Erreur", "Le nom et le diagnostic sont requis.");
      return;
    }

    if (age && (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 150)) {
      Alert.alert("Erreur", "L'âge doit être un nombre valide entre 0 et 150.");
      return;
    }

    setIsSubmitting(true);

    try {
      await insertPatient(
        name.trim(),
        age ? parseInt(age) : 0,
        gender,
        diagnosis.trim(),
        treatment.trim(),
        date
      );

      Alert.alert("Succès", "Patient enregistré avec succès !");
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Échec de l'enregistrement. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setGender("");
    setDiagnosis("");
    setTreatment("");
    setDate("");
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <Card className="p-6 mb-6" variant="elevated">
          <Text className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Nouveau Patient
          </Text>

          <View className="space-y-4">
            <FormField
              label="Nom complet *"
              value={name}
              onChange={setName}
              required={true}
              placeholder="Entrez le nom complet"
            />

            <FormField
              label="Âge"
              value={age}
              onChange={setAge}
              placeholder="Entrez l'âge"
            />

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Sexe
              </Text>
              <Select
                value={gender}
                onValueChange={setGender}
                options={genderOptions}
                placeholder="Sélectionnez le sexe"
              />
            </View>

            <FormField
              label="Diagnostic *"
              value={diagnosis}
              onChange={setDiagnosis}
              required={true}
              placeholder="Entrez le diagnostic"
            />

            <FormField
              label="Traitement"
              value={treatment}
              onChange={setTreatment}
              placeholder="Entrez le traitement prescrit"
            />

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Date de consultation
              </Text>
              <DatePicker
                value={date}
                onValueChange={setDate}
                placeholder="Sélectionnez la date"
              />
            </View>
          </View>
        </Card>

        <View className="flex-row space-x-4">
          <Button
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>

          <Button
            onPress={resetForm}
            variant="secondary"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            Réinitialiser
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
