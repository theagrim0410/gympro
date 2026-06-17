import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BackButton() {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.back()}
    >
      <Text style={styles.text}>← Back</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: "absolute",
    top: 50,
    left: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});