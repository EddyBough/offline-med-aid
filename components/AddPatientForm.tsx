import { insertPatient } from "@/storage/db";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { FormField } from "./FormField";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { DatePicker } from "./ui/DatePicker";
import { Select } from "./ui/Select";

export const AddPatientForm = () => {
  const { t, ready } = useTranslation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Attendre que les traductions soient chargées
  if (!ready) {
    return null;
  }

  const genderOptions = [
    { label: t("common.male"), value: "M" },
    { label: t("common.female"), value: "F" },
    { label: t("common.other"), value: "A" },
  ];

  const handleSubmit = async () => {
    if (!name.trim() || !diagnosis.trim()) {
      Alert.alert(t("common.error"), t("addPatient.validation.nameRequired"));
      return;
    }

    if (age && (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 150)) {
      Alert.alert(t("common.error"), t("addPatient.validation.ageInvalid"));
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

      Alert.alert(t("common.success"), t("addPatient.success"));
      resetForm();
    } catch (error) {
      console.error(error);
      Alert.alert(t("common.error"), t("addPatient.error"));
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
            {t("addPatient.title")}
          </Text>

          <View className="space-y-4">
            <FormField
              label={`${t("addPatient.form.name")} *`}
              value={name}
              onChange={setName}
              required={true}
              placeholder={t("addPatient.form.namePlaceholder")}
            />

            <FormField
              label={t("addPatient.form.age")}
              value={age}
              onChange={setAge}
              placeholder={t("addPatient.form.agePlaceholder")}
            />

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                {t("addPatient.form.gender")}
              </Text>
              <Select
                value={gender}
                onValueChange={setGender}
                options={genderOptions}
                placeholder={t("addPatient.form.genderPlaceholder")}
              />
            </View>

            <FormField
              label={`${t("addPatient.form.diagnosis")} *`}
              value={diagnosis}
              onChange={setDiagnosis}
              required={true}
              placeholder={t("addPatient.form.diagnosisPlaceholder")}
            />

            <FormField
              label={t("addPatient.form.treatment")}
              value={treatment}
              onChange={setTreatment}
              placeholder={t("addPatient.form.treatmentPlaceholder")}
            />

            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                {t("addPatient.form.date")}
              </Text>
              <DatePicker
                value={date}
                onValueChange={setDate}
                placeholder={t("addPatient.form.datePlaceholder")}
              />
            </View>
          </View>
        </Card>

        <View className="flex-row justify-center">
          <Button
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            className="mr-3 w-40"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("common.loading") : t("common.save")}
          </Button>

          <Button
            onPress={resetForm}
            variant="secondary"
            size="lg"
            className="w-40"
            disabled={isSubmitting}
          >
            {t("common.cancel")}
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
