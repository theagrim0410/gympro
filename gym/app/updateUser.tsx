import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, router } from "expo-router";
import AdminHeader2 from "../components/AdminHeader2";


export default function UpdateUser() {


const { id , username } = useLocalSearchParams<{
    id: string;
    username: string;
  }>();

  type UserDetails = {
    id: string;
    username: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    totalHours: number;
    workoutStreak: number;
    lastLogin: string;
    workouts: number;
    avatar: string;
  };
  const [usersList, setUsersList] = useState<UserDetails | null>(null);

const API_URL = "http://192.168.29.104:5000";

useEffect(() => {
  fetchUser();
}, []);

const fetchUser = async () => {
  try {
    const res = await fetch(`${API_URL}/userdetails2/${id}`) || fetch(`${API_URL}/userdetails3/${id}`);
    const json = await res.json();

    if (json.success) {
      setUsersList(json.data);
    }
  } catch (err) {
    console.log(err);
  }
};

  const user = usersList;
  console.log("User ID:", id); // Log the user ID for debugging
  console.log("User Data:", user); // Log the user data for debugging
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>
          User Not Found
        </Text>
      </View>
    );
  }

  const saveUser = async () => {
    try {
      await fetch(`${API_URL}/usersupdate/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      Alert.alert("Success", "User Updated");

      router.push("/admin");
    } catch {
      Alert.alert("Error");
    }
  };

  const deleteUser = async () => {
    try {
      await fetch(`${API_URL}/usersdelete/${id}`, {
        method: "DELETE",
      });
      Alert.alert("Success", "User Deleted");
      router.push("/admin");
    } catch {
      Alert.alert("Error", "Failed to delete user");
    }
  };

  // if (loading)
  //   return (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#A3E635" />
  //     </View>
  //   );

  return (
    <ScrollView style={styles.container}>
      <AdminHeader2 title={`Update ${username}`} />

      <View style={styles.profile}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user.username}
        </Text>

        <Text style={styles.role}>{user.role}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.card}>
          <Text style={styles.label}>Hours</Text>
          <Text style={styles.value}>
            {user.totalHours}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Workouts</Text>
          <Text style={styles.value}>
            {user.workouts}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          Username
        </Text>

        <TextInput
          value={user.username}
          onChangeText={(t) =>
            setUsersList({
              ...user,
              username: t,
            })
          }
          style={styles.input}
        />

        <Text style={styles.heading}>
          Role
        </Text>

        <Picker
          selectedValue={user.role}
          onValueChange={(v) =>
            setUsersList({
              ...user,
              role: v,
            })
          }
          style={styles.picker}
        >
          <Picker.Item
            label="User"
            value="user"
          />
          <Picker.Item
            label="Trainer"
            value="trainer"
          />
          <Picker.Item
            label="Admin"
            value="admin"
          />
        </Picker>

        <Text style={styles.heading}>
          Status
        </Text>

        <Picker
          selectedValue={user.isActive ? "true" : "false"}
          onValueChange={(v) =>
            setUsersList({
              ...user,
              isActive: v === "true",
            })
          }
          style={styles.picker}
        >
          <Picker.Item
            label="Active"
            value="true"
          />
          <Picker.Item
            label="Inactive"
            value="false"
          />
        </Picker>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          Created At
        </Text>

        <Text style={styles.info}>
          {new Date(user.createdAt).toLocaleString()}
        </Text>

        <Text style={styles.heading}>
          Updated At
        </Text>

        <Text style={styles.info}>
          {new Date(user.updatedAt).toLocaleString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.save}
        onPress={saveUser}
      >
        <Text style={styles.saveText}>
          Save Changes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.delete} onPress={deleteUser}>
        <Text style={styles.deleteText}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101412",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#101412",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 30,
  },

  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 15,
  },

  profile: {
    alignItems: "center",
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: "#A3E635",
  },

  name: {
    color: "white",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 15,
  },

  role: {
    color: "#bbb",
    marginTop: 5,
    marginBottom: 25,
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#1B211D",
    padding: 20,
    borderRadius: 18,
  },

  label: {
    color: "#888",
  },

  value: {
    color: "#A3E635",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },

  section: {
    backgroundColor: "#1B211D",
    borderRadius: 18,
    padding: 20,
    marginTop: 20,
  },

  heading: {
    color: "#A3E635",
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#272D28",
    borderRadius: 12,
    color: "white",
    padding: 14,
  },

  picker: {
    color: "white",
    backgroundColor: "#272D28",
  },

  info: {
    color: "white",
    marginBottom: 15,
  },

  save: {
    backgroundColor: "#A3E635",
    marginVertical: 30,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },

  saveText: {
    fontWeight: "700",
    color: "#111",
    fontSize: 18,
  },

  delete: {
    borderWidth: 1,
    borderColor: "red",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 40,
  },

  deleteText: {
    color: "red",
    fontWeight: "700",
  },
});