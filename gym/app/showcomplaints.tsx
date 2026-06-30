import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";

import AdminHeader2 from "../components/AdminHeader2";
// import complaints from "../constant/complain";

export default function ShowComplaints() {
  const API_URL = "http://192.168.29.104:5000";

  type Complaint = {
  _id: string;
  username: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
};
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const fetchComplaints = async () => {
  try {
    setLoading(true);

    const res = await fetch(`${API_URL}/complaints`);
    const data = await res.json();

    if (data.success) {
      setComplaints(data.data);
    }
  } catch (error) {
    console.log("Error fetching complaints:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  fetchComplaints();
}, []);

  const filteredComplaints = complaints.filter((item) => {
    const searchMatch =
      item.username
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.subject
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const filterMatch =
      filter === "All" ||
      item.status.toLowerCase() ===
        filter.toLowerCase();

    return searchMatch && filterMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "#C3F400";

      case "In Review":
        return "#F59E0B";

      case "Pending":
        return "#EF4444";

      case "Open":
        return "#3B82F6";

      default:
        return "#8e9379";
    }
  };

  const renderComplaint = ({ item }: { item: Complaint }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardTop}>
        <View>
          <Text style={styles.userName}>
            @{item.username}
          </Text>

          <Text style={styles.ticketId}>
            #{item._id}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            {
              borderColor: getStatusColor(
                item.status
              ),
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  getStatusColor(item.status),
              },
            ]}
          />

          <Text
            style={[
              styles.statusText,
              {
                color: getStatusColor(
                  item.status
                ),
              },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.subject}>
        {item.subject}
      </Text>

      <Text style={styles.category}>
        {item.category}
      </Text>

      <Text
        style={styles.description}
        numberOfLines={2}
      >
        {item.description}
      </Text>

      <Text style={styles.date}>
        Submitted:
        {" "}
        {new Date(
          item.createdAt
        ).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );
  if(loading) {
    console.log("Loading...");
  }
  return (
    <View style={styles.container}>
      <AdminHeader2
        title="User Complaints"
      />

      {/* Search */}

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={22}
          color="#8e9379"
        />

        <TextInput
          style={styles.searchInput}
          placeholder="Search complaints..."
          placeholderTextColor="#8e9379"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Filters */}

      <View style={styles.filterRow}>
        {[
          "All",
          "Pending",
          "In Review",
          "Resolved",
          "Open",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterBtn,
              filter === item &&
                styles.activeFilter,
            ]}
            onPress={() =>
              setFilter(item)
            }
          >
            <Text
              style={[
                styles.filterText,
                filter === item &&
                  styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Complaint List */}

      {filteredComplaints.length > 0 ? (
        <FlatList
          data={filteredComplaints}
          keyExtractor={(item) =>
            item._id
          }
          renderItem={renderComplaint}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons
            name="forum"
            size={80}
            color="#C3F400"
          />

          <Text style={styles.emptyTitle}>
            No Complaints Found
          </Text>

          <Text style={styles.emptyText}>
            No complaint matches your
            current search or filter.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    paddingHorizontal: 16,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282b1d",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    padding: 14,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
    flexWrap: "wrap",
  },

  filterBtn: {
    backgroundColor: "#1e2113",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  activeFilter: {
    borderWidth: 1,
    borderColor: "#C3F400",
    backgroundColor:
      "rgba(195,244,0,0.1)",
  },

  filterText: {
    color: "#8e9379",
    fontWeight: "600",
    fontSize: 12,
  },

  activeFilterText: {
    color: "#C3F400",
  },

  card: {
    backgroundColor: "#1e2113",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor:
      "rgba(255,255,255,0.08)",
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  userName: {
    color: "#C3F400",
    fontSize: 13,
    fontWeight: "700",
  },

  ticketId: {
    color: "#8e9379",
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  subject: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
  },

  category: {
    color: "#C3F400",
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  description: {
    color: "#c4c9ac",
    marginTop: 8,
    lineHeight: 20,
  },

  date: {
    color: "#8e9379",
    marginTop: 12,
    fontSize: 12,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },

  emptyText: {
    color: "#c4c9ac",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 30,
  },
});