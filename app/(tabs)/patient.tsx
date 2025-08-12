import { EditPatientModal } from "@/components/ui/EditPatientModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Header } from "@/components/ui/Header";
import { PatientCard } from "@/components/ui/PatientCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { PatientRepo } from "@/storage/patientRepo";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientsScreen() {
  const { t, ready } = useTranslation();
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const loadPatients = () => {
    const data = PatientRepo.getAll();
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadPatients();
    setRefreshing(false);
  };

  const filteredPatients = useMemo(() => {
    if (!searchQuery.trim()) return patients;

    const query = searchQuery.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(query) ||
        patient.diagnosis.toLowerCase().includes(query) ||
        (patient.treatment && patient.treatment.toLowerCase().includes(query))
    );
  }, [patients, searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleDeletePatient = (patientId: number, patientName: string) => {
    Alert.alert(t("common.delete"), t("patients.deleteConfirm"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.delete"),
        style: "destructive",
        onPress: () => {
          PatientRepo.delete(patientId);
          loadPatients();
        },
      },
    ]);
  };

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient);
    setIsEditModalVisible(true);
  };

  const handlePatientUpdated = () => {
    loadPatients();
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setEditingPatient(null);
  };

  const renderPatientCard = ({ item }: { item: any }) => (
    <PatientCard
      patient={item}
      onEdit={() => handleEditPatient(item)}
      onDelete={() => handleDeletePatient(item.id, item.name)}
    />
  );

  // Attendre que les traductions soient chargées
  if (!ready) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title={t("patients.title")} />

      <View className="flex-1 px-4">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={t("patients.searchPlaceholder")}
          onClear={handleClearSearch}
        />

        {filteredPatients.length === 0 ? (
          <EmptyState
            title={
              searchQuery ? t("patients.noResults") : t("patients.noPatients")
            }
            description={
              searchQuery
                ? t("patients.noResultsDescription")
                : t("patients.noPatientsDescription")
            }
            icon={searchQuery ? "magnifyingglass" : "person.fill"}
          />
        ) : (
          <FlatList
            data={filteredPatients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPatientCard}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        )}
      </View>

      <FloatingActionButton
        icon="plus"
        onPress={() => router.push("/(tabs)/add-patient")}
        variant="primary"
        size="lg"
      />

      <EditPatientModal
        visible={isEditModalVisible}
        onClose={handleCloseEditModal}
        patient={editingPatient}
        onPatientUpdated={handlePatientUpdated}
      />
    </SafeAreaView>
  );
}
