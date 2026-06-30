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


//username == email
export default function Register() {
  const [user, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const handleRegister = () => {
  //   if (!user || !password) {
  //     Alert.alert("Error", "Fill all fields");
  //     return;
  //   }

  //   // check if user already exists
  //   const exists = users.find((u) => u.username === user);

  //   if (exists) {
  //     Alert.alert("Error", "User already exists");
  //     return;
  //   }

  //   // add user
  //   addUser(user, password);

  //   Alert.alert("Success", "User registered");

  //   router.replace("/login");
  // };
  const API_URL = "http://192.168.29.104:5000"; 
  const handleRegister = async () => {
    console.log("Register request received");
    if (!user || !password) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Registration failed");
        return;
      }

      Alert.alert("Success", "User registered successfully");

      router.replace("/login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to connect to server");
    }
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
          value={user}
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