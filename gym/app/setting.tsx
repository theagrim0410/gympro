import React , {useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter , useLocalSearchParams } from "expo-router";
import Header2 from "../components/Header2";

export default function Setting() {
    const { id, username } = useLocalSearchParams<{
      id: string;
      username: string;
      }>();
    const [notifications, setNotifications] = useState(true);
    const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Header2 title="Settings" id={id} username={username} />
      {/* Hero Section */}
      <View style={styles.heroCard}>
        <Text style={styles.status}>SYSTEM STATUS</Text>
        <Text style={styles.adminTitle}>{username || "USER"}</Text>
        <Text style={styles.adminTitle}>{id}</Text>
      </View>

      {/* User Complaints */}
      <TouchableOpacity style={styles.card} onPress = {() => router.push({
  pathname: "/complains",
  params: {
    id: id,
    username: username,
  },
})}>
  
        <View style={styles.leftSection}>
          <View style={styles.iconBox}>
            <MaterialIcons name="forum" size={24} color="#C3F400" />
          </View>

          <View>
            <Text style={styles.title}>Complaint</Text>
            <Text style={styles.subtitle}>
              Review pending feedback
            </Text>
          </View>
        </View>

        <MaterialIcons
          name="chevron-right"
          size={24}
          color="#c4c9ac"
        />
      </TouchableOpacity>

      {/* Notifications */}
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconBox}>
            <MaterialIcons
              name="notifications-active"
              size={24}
              color="#C3F400"
            />
          </View>

          <View>
            <Text style={styles.title}>Global Notifications</Text>
            <Text style={styles.subtitle}>
              System-wide alerts
            </Text>
          </View>
        </View>

        <Switch
            value={notifications}
            onValueChange={setNotifications}
          thumbColor="#fff"
          trackColor={{
            false: "#444933",
            true: "#C3F400",
          }}
        />
      </View>

      {/* Usage */}
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconBox}>
            <MaterialIcons
              name="analytics"
              size={24}
              color="#C3F400"
            />
          </View>

          <View>
            <Text style={styles.title}>Application Usage</Text>
            <Text style={styles.subtitle}>
              Daily Active Users: 1.2k
            </Text>
          </View>
        </View>

        <MaterialIcons
          name="trending-up"
          size={24}
          color="#c4c9ac"
        />
      </View>

      {/* Version Info */}
      <View style={styles.card}>
        <View style={styles.leftSection}>
          <View style={styles.iconBox}>
            <MaterialIcons
              name="info"
              size={24}
              color="#c4c9ac"
            />
          </View>

          <View>
            <Text style={styles.title}>App Version Info</Text>
            <Text style={styles.subtitle}>
              v2.4.8-Kinetic-Enterprise
            </Text>
          </View>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>STABLE</Text>
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push("/login")}> 
        <MaterialIcons
          name="logout"
          size={24}
          color="#ffb4ab"
        />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          KINETIC AI ADMINISTRATIVE TERMINAL
        </Text>

        <View style={styles.footerIcons}>
          <MaterialIcons
            name="shield"
            size={22}
            color="#666"
          />
          <MaterialIcons
            name="storage"
            size={22}
            color="#666"
          />
          <MaterialIcons
            name="cloud-sync"
            size={22}
            color="#666"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    padding: 16,
  },

  heroCard: {
    backgroundColor: "#1e2113",
    borderRadius: 16,
    padding: 24,
    marginTop: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  status: {
    color: "#C3F400",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  adminTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#1e2113",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#333627",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    color: "#c4c9ac",
    fontSize: 13,
    marginTop: 2,
  },

  badge: {
    backgroundColor: "rgba(195,244,0,0.12)",
    borderWidth: 1,
    borderColor: "rgba(195,244,0,0.3)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#C3F400",
    fontSize: 10,
    fontWeight: "700",
  },

  logoutBtn: {
    backgroundColor: "rgba(255,180,171,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,180,171,0.2)",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  logoutText: {
    color: "#ffb4ab",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
  },

  footerText: {
    color: "#666",
    fontSize: 10,
    textAlign: "center",
  },

  footerIcons: {
    flexDirection: "row",
    gap: 20,
    marginTop: 15,
  },
});