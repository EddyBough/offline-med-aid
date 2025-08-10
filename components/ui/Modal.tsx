import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect } from "react";
import {
  Animated,
  Modal as RNModal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSymbol } from "./IconSymbol";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  variant?: "default" | "fullscreen" | "bottomSheet";
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  variant = "default",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(variant === "bottomSheet" ? 300 : 0);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: variant === "bottomSheet" ? 300 : 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, variant]);

  const getModalClasses = () => {
    const baseClasses = "bg-white rounded-t-xl";

    if (variant === "fullscreen") {
      return `${baseClasses} flex-1 m-0`;
    }

    if (variant === "bottomSheet") {
      return `${baseClasses} mx-4 mb-4 max-h-96`;
    }

    return `${baseClasses} mx-6 max-w-sm`;
  };

  const getContainerClasses = () => {
    if (variant === "fullscreen") {
      return "flex-1 justify-center";
    }

    if (variant === "bottomSheet") {
      return "flex-1 justify-end";
    }

    return "flex-1 justify-center items-center";
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View
        className={`flex-1 ${getContainerClasses()}`}
        style={{
          opacity: fadeAnim,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <TouchableOpacity
          className="absolute inset-0"
          onPress={onClose}
          activeOpacity={1}
        />

        <Animated.View
          className={getModalClasses()}
          style={{
            transform: [{ translateY: slideAnim }],
          }}
        >
          {(title || showCloseButton) && (
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              {title && (
                <Text className="text-lg font-bold text-gray-900 flex-1">
                  {title}
                </Text>
              )}

              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  className="p-2 rounded-lg bg-gray-100"
                  activeOpacity={0.7}
                >
                  <IconSymbol name="xmark" size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View className="p-4">{children}</View>
        </Animated.View>
      </Animated.View>
    </RNModal>
  );
};
