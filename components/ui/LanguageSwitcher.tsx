import { useLanguage } from "@/hooks/useLanguage";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { Modal } from "./Modal";

interface LanguageSwitcherProps {
  variant?: "button" | "text";
  showLabel?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "button",
  showLabel = true,
}) => {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentLangName =
    availableLanguages.find((lang) => lang.code === currentLanguage)
      ?.nativeName || "Français";

  const handleLanguageSelect = async (languageCode: string) => {
    await changeLanguage(languageCode);
    setIsModalVisible(false);
  };

  if (variant === "text") {
    return (
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="flex-row items-center"
      >
        <Text className="text-blue-600 font-medium">{currentLangName}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className="bg-gray-100 rounded-lg px-4 py-2 flex-row items-center justify-between"
      >
        <View>
          {showLabel && (
            <Text className="text-gray-600 text-sm mb-1">
              {t("settings.language")}
            </Text>
          )}
          <Text className="text-gray-900 font-medium">{currentLangName}</Text>
        </View>
        <Text className="text-gray-400 text-lg">›</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={t("settings.selectLanguage")}
      >
        <View className="space-y-2">
          {availableLanguages.map((language) => (
            <TouchableOpacity
              key={language.code}
              onPress={() => handleLanguageSelect(language.code)}
              className={`p-4 rounded-lg border ${
                currentLanguage === language.code
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  currentLanguage === language.code
                    ? "text-blue-600"
                    : "text-gray-900"
                }`}
              >
                {language.nativeName}
              </Text>
              <Text className="text-gray-500 text-sm mt-1">
                {language.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
};
