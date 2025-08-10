import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { StatsCard } from "@/components/ui/StatsCard";
import { PatientRepo } from "@/storage/patientRepo";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { t, ready } = useTranslation();
  const router = useRouter();

  // Attendre que les traductions soient chargées
  if (!ready) {
    return null;
  }
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t("home.welcome")}</ThemedText>
        <HelloWave />
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

          <View className="space-y-3">
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
              className="w-full"
            >
              {t("common.patients")}
            </Button>
          </View>
        </Card>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Développement</ThemedText>
        <ThemedText>
          Éditez{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          pour voir les changements. Appuyez sur{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          pour ouvrir les outils de développement.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
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
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
