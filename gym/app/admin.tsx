import React, { useState ,useEffect} from "react";
import { router } from "expo-router"; 
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AdminHeader from "../components/AdminHeader";
import users , {activeUsers} from "../constant/users";

export default function Admin() {
  type UserDetails = {
  _id: string;
  userId: string;
  username: string;
  role: string;
  isActive: boolean;
  totalHours: number;
  workoutStreak: number;
  lastLogin: string;
  avatar: string;
  workouts: number;
};
  const API_URL = "http://192.168.29.104:5000";
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState<UserDetails[]>([]);
useEffect(() => {
  fetchUserDetails();
}, []);
const fetchUserDetails = async () => {
  try {
    const res = await fetch(`${API_URL}/userdetails`);
    const json = await res.json();

    if (json.success) {
      setUsersList(json.data);
    }
  } catch (err) { 
    console.log(err);
  }
};
  const filteredUsers = usersList.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );


  const renderUser = ({ item }: { item: UserDetails }) => (
  <TouchableOpacity style={styles.userCard} activeOpacity={0.8} onPress={() => router.push(`/userdata?id=${item._id}&username=${item.username}`)}>
    
    <Image
      source={{
            uri: item.avatar,
          }}
      style={styles.userAvatar}
    />

    <View style={styles.userInfo}>
      <Text style={styles.userName}>
        {item.username}
      </Text>

      <Text style={styles.userRole}>
        {item.role}
      </Text>

      <Text style={{ color: "#8E9379", fontSize: 12 }}>
        🔥 {item.workoutStreak} streak | ⏱ {item.totalHours} hrs
      </Text>

      <Text style={{ color: item.isActive ? "#C3F400" : "#8E9379", fontSize: 11 }}>
        {item.isActive ? "Active" : "Inactive"}
      </Text>
    </View>

    <Ionicons name="chevron-forward" size={22} color="#8E9379" />
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) =>
          item._id.toString()
        }
        renderItem={renderUser}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <AdminHeader title="Admin DashBoard" />

            {/* Search */}

            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={20}
                color="#8E9379"
              />

              <TextInput
                placeholder="Search users..."
                placeholderTextColor="#8E9379"
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />

            </View>

            {/* Stats */}

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  ACTIVE USERS
                </Text>

                <Text style={styles.statValue}>
  {activeUsers?.length || 0}
</Text>

                <Ionicons
                  name="people"
                  size={40}
                  color="rgba(255,255,255,0.1)"
                  style={styles.bgIcon}
                />
              </View>

              <View style={styles.statCard}>
                <Text style={styles.statLabel}>
                  NEW TODAY
                </Text>

                <Text
                  style={[
                    styles.statValue,
                    { color: "#ADC6FF" },
                  ]}
                >
                 +{usersList.length} 
                </Text>

                <Ionicons
                  name="trending-up"
                  size={40}
                  color="rgba(255,255,255,0.1)"
                  style={styles.bgIcon}
                />
              </View>
            </View>

            {/* User Header */}

            <View style={styles.userHeader}>
              <Text style={styles.userHeaderTitle}>
                User Management
              </Text>

              <Text style={styles.userCount}>
                TOTAL {usersList.length}
              </Text>
            </View>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    paddingHorizontal: 20,
  },

  searchContainer: {
    backgroundColor: "#1E2113",
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  searchInput: {
    flex: 1,
    color: "#E2E4CF",
    marginHorizontal: 10,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statCard: {
    width: "48%",
    height: 130,
    backgroundColor: "#1E2113",
    borderRadius: 18,
    padding: 15,
    overflow: "hidden",
  },

  statLabel: {
    color: "#8E9379",
    fontSize: 11,
    fontWeight: "700",
  },

  statValue: {
    color: "#C3F400",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 12,
  },

  bgIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },

  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  userHeaderTitle: {
    color: "#E2E4CF",
    fontSize: 22,
    fontWeight: "700",
  },

  userCount: {
    color: "#8E9379",
    fontSize: 12,
    fontWeight: "700",
  },

  userCard: {
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
  },

  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  userStatus: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    right: -2,
    bottom: -2,
    borderWidth: 2,
    borderColor: "#111508",
  },

  userInfo: {
    flex: 1,
    marginLeft: 12,
  },

  userName: {
    color: "#E2E4CF",
    fontSize: 16,
    fontWeight: "700",
  },

  userRole: {
    color: "#8E9379",
    marginTop: 4,
    fontSize: 13,
  },

});