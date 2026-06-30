import React, { useState ,useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Header2 from "../components/Header2";

import { useLocalSearchParams } from "expo-router";

export default function Nutrition() {
  interface Goal {
  _id: string;
  title: string;
  protein: string;
  carbs: string;
  fats: string;
  description: string;
}
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const API_URL = "http://192.168.29.104:5000";
  const { id, username } = useLocalSearchParams<{
    id: string;
    username: string;
  }>();
  
  useEffect(() => {
  const fetchNutrition = async () => {
    try {
      const response = await fetch(
        `${API_URL}/nutrition`
      );

      const result = await response.json();

      if (result.success) {
        setGoals(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchNutrition();
}, []);



  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Header2 title="Nutrition" id={id} username={username} />

      <Text style={styles.title}>
        Goal Specific Nutrition
      </Text>

      <Text style={styles.subtitle}>
        Select your nutrition goal
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={goals}
        keyExtractor={(item) =>
          item._id
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.goalCard,
              selectedGoal === item._id &&
                styles.activeGoal,
            ]}
            onPress={() =>
              setSelectedGoal(item._id)
            }
          >
            <Text style={styles.goalTitle}>
              {item.title}
            </Text>

            <Text style={styles.goalDesc}>
              {item.description}
            </Text>

            <View style={styles.macroRow}>
              <Text style={styles.macro}>
                Protein {item.protein}
              </Text>
              <Text style={styles.macro}>
                Carbs {item.carbs}
              </Text>
              <Text style={styles.macro}>
                Fat {item.fats}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />


      {/* Meals */}

      <Text style={styles.sectionTitle}>
        Meal Which Should Be Scheduled  
      </Text>

      <View style={styles.mealCard}>
        <Text style={styles.mealType}>
          BREAKFAST
        </Text>

        <Text style={styles.mealName}>
          Protein Oats with Berries
        </Text>

        <Text style={styles.mealCalories}>
          450 kcal
        </Text>
      </View>

      <View style={styles.mealCard}>
        <Text style={styles.mealType}>
          LUNCH
        </Text>

        <Text style={styles.mealName}>
          Grilled Salmon & Quinoa
        </Text>

        <Text style={styles.mealCalories}>
          620 kcal
        </Text>
      </View>

      <View style={styles.mealCard}>
        <Text style={styles.mealType}>
          SNACK
        </Text>

        <Text style={styles.mealName}>
          Greek Yogurt & Almonds
        </Text>

        <Text style={styles.mealCalories}>
          210 kcal
        </Text>
      </View>

      {/* Water */}

      <View style={styles.waterCard}>
        <Text style={styles.waterTitle}>
          Water ShouldIntake Per Day
        </Text>

        <Text style={styles.waterValue}>
          3.5 L to 4.0 L
        </Text>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    padding: 16,
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#c4c9ac",
    marginBottom: 20,
  },

  goalCard: {
    width: 220,
    backgroundColor: "#1e2113",
    padding: 16,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#333627",
  },

  activeGoal: {
    borderColor: "#C3F400",
    backgroundColor: "rgba(195,244,0,0.08)",
  },

  goalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  goalDesc: {
    color: "#c4c9ac",
    marginTop: 8,
  },

  macroRow: {
    marginTop: 12,
  },

  macro: {
    color: "#C3F400",
    marginBottom: 4,
  },

  insightCard: {
    marginTop: 20,
    backgroundColor: "rgba(195,244,0,0.1)",
    padding: 16,
    borderRadius: 16,
  },

  insightText: {
    color: "#fff",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 12,
  },

  macroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    flex: 1,
    backgroundColor: "#1e2113",
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 16,
  },

  statTitle: {
    color: "#c4c9ac",
  },

  statValue: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
  },

  mealCard: {
    backgroundColor: "#1e2113",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
  },

  mealType: {
    color: "#C3F400",
    fontSize: 12,
    fontWeight: "700",
  },

  mealName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 5,
  },

  mealCalories: {
    color: "#c4c9ac",
    marginTop: 5,
  },

  waterCard: {
    backgroundColor: "#1e2113",
    borderRadius: 18,
    padding: 16,
    marginTop: 20,
  },

  waterTitle: {
    color: "#C3F400",
    fontWeight: "700",
  },

  waterValue: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
});