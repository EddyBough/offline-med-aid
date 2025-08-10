import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { StatsCard } from "@/components/ui/StatsCard";
import { PatientRepo } from "@/storage/patientRepo";

export default function HomeScreen() {
  const { t, ready } = useTranslation();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalPatients: 0,
    recentPatients: 0,
  });

  useEffect(() => {
    const patients = PatientRepo.getAll();
    setStats({
      totalPatients: patients.length,
      recentPatients: patients.filter((p) => {
        if (!p.date) return false;
        const patientDate = new Date(p.date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return patientDate >= weekAgo;
      }).length,
    });
  }, []);

  // Attendre que les traductions soient chargées
  if (!ready) {
    return null;
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 mt-20">
      <View className="p-6">
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">{t("home.welcome")}</ThemedText>
        </ThemedView>

        {/* Sélecteur de langue */}
        <ThemedView style={styles.languageContainer}>
          <LanguageSwitcher />
        </ThemedView>

        <ThemedView style={styles.statsContainer}>
          <StatsCard
            title={t("home.totalPatients")}
            value={stats.totalPatients.toString()}
            icon="house.fill"
            variant="primary"
          />
          <StatsCard
            title={t("home.thisWeek")}
            value={stats.recentPatients.toString()}
            icon="paperplane.fill"
            variant="info"
          />
        </ThemedView>

        <ThemedView style={styles.actionsContainer}>
          <Card className="p-6 mb-4" variant="elevated">
            <ThemedText type="subtitle" className="mb-4">
              {t("home.quickActions")}
            </ThemedText>

            <View className="space-y-4">
              <Button
                onPress={() => router.push("/(tabs)/add-patient")}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {t("common.addPatient")}
              </Button>

              <Button
                onPress={() => router.push("/(tabs)/patient")}
                variant="outline"
                size="lg"
                className="w-full mt-3"
              >
                {t("common.patients")}
              </Button>
            </View>
          </Card>
        </ThemedView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  languageContainer: {
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  actionsContainer: {
    marginBottom: 24,
  },
});
