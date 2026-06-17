import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { addUser, users } from "../constant/login";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleRegister = () => {
    if (!email || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    // check if user already exists
    const exists = users.find((u) => u.username === email);

    if (exists) {
      Alert.alert("Error", "User already exists");
      return;
    }

    // add user
    addUser(email, password);

    Alert.alert("Success", "User registered");

    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Join our community todays
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={{ color: "#aaa", textAlign: "center", marginTop: 15 }}>
        have an account?{" "}
        <Text
          style={{ color: "#c3f400", fontWeight: "800" }}
          onPress={() => router.push("/login")}
        >
          Sign In
        </Text>
      </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f04",
    padding: 20,
    justifyContent: "center",
  },

  header: { alignItems: "center", marginBottom: 40 },

  title: { fontSize: 26, fontWeight: "800", color: "#fff" },

  subtitle: { color: "#aaa", textAlign: "center", marginTop: 10 },

  form: {},

  input: {
    backgroundColor: "#1a1d10",
    padding: 15,
    borderRadius: 12,
    color: "#fff",
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#c3f400",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: { fontWeight: "800", color: "#000" },
});