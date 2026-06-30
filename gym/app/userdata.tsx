import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AdminHeader2 from "../components/AdminHeader2";
// import userData from "../constant/userdata";

export default function UserData() {
  const { id } = useLocalSearchParams<{
    id: string;
    username: string;
  }>();

  type UserDetails = {
    id: string;
    username: string;
    role: string;
    isActive: boolean;
    totalHours: number;
    lastLogin: string;
    workoutStreak: number;
    avatar: string;
    workouts: number;
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
        <Text style={styles.notFound}>
          User Not Found
        </Text>
      </View>
    );
  }

  const loginDate = new Date(user.lastLogin);

  return (
    <View style={styles.container}>    
      <AdminHeader2 title="User Details" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.profileSection}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user.username}
          </Text>

          <Text style={styles.role}>
            {user.role}
          </Text>
        </View>

        <View style={styles.grid}>
          <MetricCard
            icon="barbell"
            title="Workouts"
            value={user.workouts}
            subtitle="Lifetime Total"
          />

          <MetricCard
            icon="time"
            title="Hours"
            value={user.totalHours}
            subtitle="Active Training"
          />

          <MetricCard
            icon="flash"
            title="Streak"
            value={`${user.workoutStreak} Days`}
            subtitle="Personal Best"
          />

          <MetricCard
            icon="checkmark-circle"
            title="Status"
            value={
              user.isActive
                ? "Active"
                : "Inactive"
            }
            subtitle="Premium Member"
          />
        </View>

        <View style={styles.lastLoginCard}>
          <View style={styles.row}>
            <Ionicons
              name="log-in"
              size={24}
              color="#C3F400"
            />

            <Text style={styles.cardTitle}>
              Last Session
            </Text>
          </View>

          <Text style={styles.loginDate}>
            {loginDate.toLocaleDateString()}
          </Text>

          <Text style={styles.loginTime}>
            {loginDate.toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
           <TouchableOpacity
              style={styles.fab}
              onPress={() =>
                router.push({
                pathname: "/updateUser",
                params: {
                  id: id,
                  username: user.username,
                },
              })
            }
            >
              <Ionicons
                name="pencil"
                size={30}
                color="#161E00"
              />
      </TouchableOpacity>
    </View>
  );
}

function MetricCard({
  icon,
  title,
  value,
  subtitle,
}: any) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.row}>
        <Ionicons
          name={icon}
          size={22}
          color="#C3F400"
        />
        <Text style={styles.metricTitle}>
          {title}
        </Text>
      </View>

      <Text style={styles.metricValue}>
        {value}
      </Text>

      <Text style={styles.metricSubtitle}>
        {subtitle}
      </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
  },

  content: {
    padding: 20,
    paddingTop: 100,
  },

  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#C3F400",
  },

  name: {
    color: "#E2E4CF",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 15,
  },

  role: {
    color: "#C3F400",
    marginTop: 5,
    fontWeight: "600",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  metricCard: {
    width: "48%",
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
  },

  metricTitle: {
    color: "#8E9379",
    marginLeft: 6,
    fontSize: 12,
  },

  metricValue: {
    color: "#C3F400",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 15,
  },

  metricSubtitle: {
    color: "#8E9379",
    fontSize: 12,
    marginTop: 4,
  },

  lastLoginCard: {
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    color: "#E2E4CF",
    marginLeft: 10,
    fontWeight: "600",
  },

  loginDate: {
    color: "#E2E4CF",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
  },

  loginTime: {
    color: "#8E9379",
    marginTop: 5,
  },

  notFound: {
    color: "#E2E4CF",
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
  },
    fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#C3F400",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 25,
    bottom: 25,
    elevation: 5,
  },
});