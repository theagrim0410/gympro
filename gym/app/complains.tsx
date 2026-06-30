import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

import Header2 from "../components/Header2";
// import { addComplaint } from "../constant/complain";

export default function Complains() {
  const { id, username } = useLocalSearchParams<{
    id: string;
    username: string;
  }>();

  // const [category, setCategory] = useState("Technical Issue");
  // const [subject, setSubject] = useState("");
  // const [description, setDescription] = useState("");

  // const handleSubmit = () => {
  //   if (!subject.trim()) {
  //     Alert.alert("Error", "Please enter a subject.");
  //     return;
  //   }

  //   if (!description.trim()) {
  //     Alert.alert("Error", "Please enter a description.");
  //     return;
  //   }

  //   try {
  //     addComplaint(
  //       category,
  //       subject,
  //       description,
  //       "Pending",
  //       new Date().toISOString()
  //     );

  //     Alert.alert(
  //       "Success",
  //       "Complaint submitted successfully."
  //     );

  //     setCategory("Technical Issue");
  //     setSubject("");
  //     setDescription("");
  //   } catch (error) {
  //     Alert.alert(
  //       "Error",
  //       "Failed to submit complaint."
  //     );
  //   }
  // };

  const API_URL = "http://192.168.29.104:5000";
  const [category, setCategory] = useState("Technical Issue");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim()) {
      Alert.alert("Error", "Please enter a subject.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description.");
      return;
    }

    try {
      setLoading(true);
      // console.log("Submitting complaint");
      
      const response = await fetch(`${API_URL}/complaints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id || "unknown",
          username: username || "unknown", 
          category,
          subject,
          description,
        }),
      });

      const data = await response.json();
      // console.log("Response from server:", data);
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      Alert.alert("Success", "Complaint submitted successfully.");

      setCategory("Technical Issue");
      setSubject("");
      setDescription("");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    console.log("Loading...");
  }
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Header2
        title="Support Center"
        id={id}
        username={username}
      />

      {/* Intro */}
      <View style={styles.intro}>
        <Text style={styles.heading}>
          We are Listening.
        </Text>

        <Text style={styles.subHeading}>
          Your performance data is sacred to us.
          If something is not meeting the Kinetic
          standard, tell us and we will recalibrate.
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formCard}>
        <Text style={styles.label}>
          CATEGORY
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(value) =>
              setCategory(value)
            }
            dropdownIconColor="#C3F400"
            style={styles.picker}
          >
            <Picker.Item
              label="Technical Issue"
              value="Technical Issue"
            />
            <Picker.Item
              label="Billing"
              value="Billing"
            />
            <Picker.Item
              label="Workout Accuracy"
              value="Workout Accuracy"
            />
            <Picker.Item
              label="Other"
              value="Other"
            />
          </Picker>
        </View>

        <Text style={styles.label}>
          SUBJECT
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Brief summary of the issue"
          placeholderTextColor="#777"
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>
          DESCRIPTION
        </Text>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Please provide as much detail as possible..."
          placeholderTextColor="#777"
          multiline
          numberOfLines={6}
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
        >
          <Text style={styles.submitText}>
            Submit Complaint
          </Text>

          <MaterialIcons
            name="send"
            size={20}
            color="#283500"
          />
        </TouchableOpacity>

        <Text style={styles.responseTime}>
          Typical response time:
          <Text style={styles.highlight}>
            {" "}
            Under 15 minutes
          </Text>
        </Text>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoIcon}>
          <MaterialIcons
            name="verified-user"
            size={28}
            color="#C3F400"
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.infoTitle}>
            Encrypted Channel
          </Text>

          <Text style={styles.infoSubtitle}>
            All support interactions are
            end-to-end encrypted.
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    paddingHorizontal: 16,
  },

  intro: {
    marginBottom: 20,
  },

  heading: {
    color: "#C3F400",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subHeading: {
    color: "#c4c9ac",
    fontSize: 15,
    lineHeight: 22,
  },

  formCard: {
    backgroundColor: "#1e2113",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  label: {
    color: "#C3F400",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 12,
  },

  pickerContainer: {
    backgroundColor: "#282b1d",
    borderRadius: 14,
    overflow: "hidden",
  },

  picker: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#282b1d",
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: "#fff",
    fontSize: 15,
  },

  textArea: {
    minHeight: 140,
    textAlignVertical: "top",
  },

  submitBtn: {
    marginTop: 24,
    backgroundColor: "#C3F400",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#283500",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },

  responseTime: {
    textAlign: "center",
    color: "#c4c9ac",
    marginTop: 14,
    fontSize: 13,
  },

  highlight: {
    color: "#C3F400",
    fontWeight: "bold",
  },

  infoCard: {
    backgroundColor: "#1e2113",
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  infoIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#333627",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  infoTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  infoSubtitle: {
    color: "#c4c9ac",
    fontSize: 13,
    marginTop: 4,
  },
});