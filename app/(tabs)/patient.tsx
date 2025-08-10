import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { Header } from "@/components/ui/Header";
import { SearchBar } from "@/components/ui/SearchBar";
import { PatientRepo } from "@/storage/patientRepo";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientsScreen() {
  const router = useRouter();
  const [patients, setPatients] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const renderPatientCard = ({ item }: { item: any }) => (
    <Card className="mb-4 p-4" variant="elevated">
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
        <Badge variant="info" size="sm">
          {item.gender || "N/A"}
        </Badge>
      </View>

      <View className="space-y-2">
        <View className="flex-row items-center">
          <Text className="text-gray-600 w-16">Âge:</Text>
          <Text className="text-gray-900 font-medium">{item.age || "N/A"}</Text>
        </View>

        <View className="flex-row items-start">
          <Text className="text-gray-600 w-16">Diagnostic:</Text>
          <Text className="text-gray-900 font-medium flex-1">
            {item.diagnosis || "N/A"}
          </Text>
        </View>

        {item.treatment && (
          <View className="flex-row items-start">
            <Text className="text-gray-600 w-16">Traitement:</Text>
            <Text className="text-gray-900 font-medium flex-1">
              {item.treatment}
            </Text>
          </View>
        )}

        {item.date && (
          <View className="flex-row items-center">
            <Text className="text-gray-600 w-16">Date:</Text>
            <Text className="text-gray-900 font-medium">{item.date}</Text>
          </View>
        )}
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header title="Liste des Patients" />

      <View className="flex-1 px-4">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un patient..."
          onClear={handleClearSearch}
        />

        {filteredPatients.length === 0 ? (
          <EmptyState
            title={searchQuery ? "Aucun résultat" : "Aucun patient"}
            description={
              searchQuery
                ? "Aucun patient ne correspond à votre recherche"
                : "Commencez par ajouter votre premier patient"
            }
            icon={searchQuery ? "magnifyingglass" : "user"}
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
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      <FloatingActionButton
        icon="plus"
        onPress={() => router.push("/(tabs)/add-patient")}
        variant="primary"
        size="lg"
      />
    </SafeAreaView>
  );
}
