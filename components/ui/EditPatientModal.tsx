import { PatientRepo } from "@/storage/patientRepo";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { FormField } from "../FormField";
import { Button } from "./Button";
import { DatePicker } from "./DatePicker";
import { Input } from "./Input";
import { Modal } from "./Modal";
import { Select } from "./Select";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  diagnosis: string;
  treatment: string;
  date: string;
}

interface EditPatientModalProps {
  visible: boolean;
  onClose: () => void;
  patient: Patient | null;
  onPatientUpdated: () => void;
}

export const EditPatientModal: React.FC<EditPatientModalProps> = ({
  visible,
  onClose,
  patient,
  onPatientUpdated,
}) => {
  const { t, ready } = useTranslation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialiser les valeurs quand le patient change
  useEffect(() => {
    if (patient) {
      setName(patient.name);
      setAge(patient.age.toString());
      setGender(patient.gender);
      setDiagnosis(patient.diagnosis);
      setTreatment(patient.treatment || "");
      setDate(patient.date || "");
    }
  }, [patient]);

  const genderOptions = ready
    ? [
        { label: t("common.male"), value: "M" },
        { label: t("common.female"), value: "F" },
        { label: t("common.other"), value: "A" },
      ]
    : [
        { label: "Masculin", value: "M" },
        { label: "Féminin", value: "F" },
        { label: "Autre", value: "A" },
      ];

  const handleSubmit = async () => {
    if (!patient) return;

    if (!name.trim() || !diagnosis.trim()) {
      Alert.alert(
        ready ? t("common.error") : "Erreur",
        ready
          ? t("editPatient.validation.nameRequired")
          : "Le nom et le diagnostic sont requis."
      );
      return;
    }

    if (age && (isNaN(Number(age)) || Number(age) < 0 || Number(age) > 150)) {
      Alert.alert(
        ready ? t("common.error") : "Erreur",
        ready
          ? t("editPatient.validation.ageInvalid")
          : "L'âge doit être un nombre valide entre 0 et 150."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      PatientRepo.update(
        patient.id,
        name.trim(),
        age ? parseInt(age) : 0,
        gender,
        diagnosis.trim(),
        treatment.trim(),
        date
      );

      Alert.alert(
        ready ? t("common.success") : "Succès",
        ready ? t("editPatient.success") : "Patient modifié avec succès !"
      );
      onPatientUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      Alert.alert(
        ready ? t("common.error") : "Erreur",
        ready
          ? t("editPatient.error")
          : "Erreur lors de la modification du patient."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!patient) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={ready ? t("editPatient.title") : "Modifier le patient"}
      variant="default"
    >
      <ScrollView
        style={{ maxHeight: 500 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="p-4 space-y-4">
          <FormField
            label={
              ready ? `${t("editPatient.form.name")} *` : "Nom du patient *"
            }
            value={name}
            onChange={setName}
            required={true}
            placeholder={
              ready
                ? t("editPatient.form.namePlaceholder")
                : "Entrez le nom complet"
            }
          />

          <Input
            label={ready ? t("editPatient.form.age") : "Âge"}
            value={age}
            onChangeText={setAge}
            placeholder={
              ready ? t("editPatient.form.agePlaceholder") : "Entrez l'âge"
            }
            keyboardType="numeric"
          />

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              {ready ? t("editPatient.form.gender") : "Genre"}
            </Text>
            <Select
              value={gender}
              onValueChange={setGender}
              placeholder={
                ready
                  ? t("editPatient.form.genderPlaceholder")
                  : "Sélectionnez le genre"
              }
              options={genderOptions}
            />
          </View>

          <Input
            label={
              ready ? `${t("editPatient.form.diagnosis")} *` : "Diagnostic *"
            }
            value={diagnosis}
            onChangeText={setDiagnosis}
            required={true}
            placeholder={
              ready
                ? t("editPatient.form.diagnosisPlaceholder")
                : "Entrez le diagnostic"
            }
            multiline
            numberOfLines={3}
          />

          <Input
            label={ready ? t("editPatient.form.treatment") : "Traitement"}
            value={treatment}
            onChangeText={setTreatment}
            placeholder={
              ready
                ? t("editPatient.form.treatmentPlaceholder")
                : "Entrez le traitement (optionnel)"
            }
            multiline
            numberOfLines={3}
          />

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              {ready ? t("editPatient.form.date") : "Date de consultation"}
            </Text>
            <DatePicker
              value={date}
              onValueChange={setDate}
              placeholder={
                ready
                  ? t("editPatient.form.datePlaceholder")
                  : "Sélectionnez la date"
              }
            />
          </View>

          <View className="flex-row space-x-3 pt-4">
            <Button
              onPress={handleCancel}
              variant="outline"
              size="md"
              className="flex-1"
              disabled={isSubmitting}
            >
              {ready ? t("common.cancel") : "Annuler"}
            </Button>
            <Button
              onPress={handleSubmit}
              variant="primary"
              size="md"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? ready
                  ? t("common.loading")
                  : "Chargement..."
                : ready
                ? t("common.save")
                : "Sauvegarder"}
            </Button>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
