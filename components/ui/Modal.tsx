import React from "react";
import { Modal as RNModal, Text, TouchableOpacity, View } from "react-native";
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
  const getModalClasses = () => {
    if (variant === "fullscreen") {
      return "bg-white flex-1 m-0";
    }

    if (variant === "bottomSheet") {
      return "bg-white rounded-t-xl mx-4 mb-4 max-h-96";
    }

    return "bg-white rounded-xl mx-4 max-w-lg w-full shadow-2xl";
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
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View
        className={`flex-1 ${getContainerClasses()}`}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <TouchableOpacity
          className="absolute inset-0"
          onPress={onClose}
          activeOpacity={1}
        />

        <View
          className={getModalClasses()}
          style={{
            backgroundColor: "#FFFFFF",
            opacity: 1,
          }}
          onStartShouldSetResponder={() => true}
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

          <View
            className="p-0"
            style={{ backgroundColor: "#FFFFFF", opacity: 1 }}
          >
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};
