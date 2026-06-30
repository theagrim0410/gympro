import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
// import { MaterialIcons } from "@expo/vector-icons";
// import AdminHeader from "../components/AdminHeader";
import AdminHeader2 from "../components/AdminHeader2";
import { router } from "expo-router";
import users, { addUser } from "../constant/users";
import {addUserDetails} from "../constant/userdata";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [role, setRole] = useState("Pro Athlete");
  const [status, setStatus] = useState("Active");

  const [avatar, setAvatar] = useState(
    `https://i.pravatar.cc/150?img=${users.length + 1}`
  );

  const handleCreateUser = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter user name");
      return;
    }

    const user = addUser(
      name,
      role,
      status,
      avatar,
      email
    );

    const userData = addUserDetails(
    name,
    role,
    0, // totalWorkouts
    true, // isActive
    new Date().toISOString(), // lastLogin
    0, // totalHours
    0, // streak
    avatar
  );

  Alert.alert(
    "Success",
    `${user.name}  created and added successfully`
  )
  router.replace("/admin");

  };

  return (
    <View style={styles.container}>
      <AdminHeader2 title="Add User" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Personal Info */}

        <Text style={styles.sectionTitle}>
          Personal Information
        </Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <TextInput
            placeholder="example@gmail.com"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Professional Role */}

        <Text style={styles.sectionTitle}>
          Professional Role
        </Text>

        <View style={styles.card}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              onValueChange={setRole}
              dropdownIconColor="#fff"
              style={styles.picker}
            >
              <Picker.Item
                label="Pro Athlete"
                value="Pro Athlete"
              />
              <Picker.Item
                label="AI Trainer"
                value="AI Trainer"
              />
              <Picker.Item
                label="Data Scientist"
                value="Data Scientist"
              />
              <Picker.Item
                label="CrossFit Trainer"
                value="CrossFit Trainer"
              />
            </Picker>
          </View>
        </View>

        {/* Status */}

        <Text style={styles.sectionTitle}>
          Account Status
        </Text>

        <View style={styles.card}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={setStatus}
              dropdownIconColor="#fff"
              style={styles.picker}
            >
              <Picker.Item
                label="Active"
                value="Active"
              />
              <Picker.Item
                label="Away"
                value="Away"
              />
              <Picker.Item
                label="Offline"
                value="Offline"
              />
            </Picker>
          </View>
        </View>

        {/* Avatar URL */}

        <Text style={styles.sectionTitle}>
          Avatar URL
        </Text>

        <View style={styles.card}>
          <TextInput
            placeholder="Avatar URL"
            placeholderTextColor="#666"
            value={avatar}
            onChangeText={setAvatar}
            style={styles.input}
          />
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Create Button */}

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateUser}
        >
          <Text style={styles.buttonText}>
            Create User
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  avatarSection: {
    alignItems: "center",
    marginBottom: 25,
  },

  avatarBox: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C3F40050",
    backgroundColor: "#1E2113",
    justifyContent: "center",
    alignItems: "center",
  },

  cameraBtn: {
    position: "absolute",
    right: 5,
    bottom: 5,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#C3F400",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: {
    color: "#C3F400",
    marginTop: 10,
    fontWeight: "700",
  },

  sectionTitle: {
    color: "#C4C9AC",
    marginBottom: 8,
    marginTop: 15,
    fontSize: 12,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#0C0F04",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginVertical: 5,
  },

  pickerContainer: {
    backgroundColor: "#0C0F04",
    borderRadius: 10,
  },

  picker: {
    color: "#fff",
  },

  footer: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 20,
  },

  button: {
    backgroundColor: "#C3F400",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#111508",
    fontSize: 17,
    fontWeight: "800",
  },
});