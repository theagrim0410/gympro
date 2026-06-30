import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type AdminHeaderProps = {
  title?: string;
};

export default function AdminHeader({
  title = "AI Trainer",
}: AdminHeaderProps) {
  const gotologin = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }
    else {
      router.replace("/admin");
    }
    // router.push("/login");
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={gotologin}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="#C3F400"
          />
        </TouchableOpacity>

        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/adminsetting")}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color="#E2E4CF"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C3F400",
    marginLeft: 10,
  },

  iconButton: {
    padding: 6,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C3F400",
  },
});

