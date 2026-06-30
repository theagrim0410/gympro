import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import workouts from "../constant/workout";

export default function Home() {
  const { id, username } = useLocalSearchParams<{
    id: string;
    username: string;
  }>();
  const goToWorkout = (route: string) => {
    router.push(route as any);
  };
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Your only competition is yourself.",
    "Precision in every movement.",
    "Momentum is built today.",
    "Evolution through guidance.",
    "Consistency is the ultimate tech.",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((p) => (p + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const openCamera = () => {
    // alert("opening camera...");
    // router.push({
    // pathname: "/camera" ,
    // params: { id: id, username: username }
    // });
    router.push("/camera");
  };

  const openBMI = () => {
    router.push("/BMICalculator");
  };

  const openProgress = () => {
    Alert.alert("when camera will be implemented it will also be available.");
  };

  const goToDietPlan = () => {
    router.push("/nutrition");
  };

  const gotologin = () => {
    router.push("/login");
  };

  const quickActions = [
    {
      title: "Camera",
      subtitle: "AI Form Check",
      icon: "camera",
      render: "openCamera",
    },
    {
      title: "BMI Calculator",
      subtitle: "Track Metrics",
      icon: "calculator",
      render: "openBMI",
    },
    {
      title: "Stats Details ",
      subtitle: "Weekly Stats",
      icon: "analytics",
      render: "openProgress",
    },
    {
      title: "Diet Plan",
      subtitle: "Macro Tracking",
      icon: "restaurant",
      render: "goToDietPlan",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Good Morning ";
    if (hour >= 12 && hour < 17) return "Good Afternoon ";
    if (hour >= 17 && hour < 22) return "Good Evening ";

    return "It's time to sleep";
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleActionPress = (render: string) => {
    switch (render) {
      case "openCamera":
        openCamera();
        break;
      case "openBMI":
        openBMI();
        break;
      case "openProgress":
        openProgress();
        break;
      case "goToDietPlan":
        goToDietPlan();
        break;
      case "gotologin":
        gotologin();
        break;
      default:
        break;
    }
  };

  const renderActionCard = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.actionCard}
      onPress={() => handleActionPress(item.render)}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={item.icon as any} size={24} color="#C3F400" />
      </View>

      <Text style={styles.actionTitle}>{item.title}</Text>
      <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const renderExerciseCard = (item: any, index: number) => (
    <TouchableOpacity
      key={item.id}
      style={styles.exerciseCard}
      onPress={() => goToWorkout(item.route)}
    >
      <Image source={item.image} style={styles.exerciseImage} />

      <View style={styles.exerciseContent}>
        <Text style={styles.exerciseTitle}>{item.name}</Text>

        <Text
          numberOfLines={2}
          style={{
            color: "#8E9379",
            fontSize: 12,
            marginTop: 4,
          }}
        >
          {item.description}
        </Text>

        <View style={styles.exerciseInfo}>
          <Text style={styles.badge}>Workout #{item.id}</Text>

          <Text style={styles.calories}>{item.caloriesBurned} kcal</Text>
        </View>
      </View>

      <Ionicons name="chevron-forward" size={24} color="#C3F400" />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Header title="Dashboard" id={id} username={username} />

      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={styles.date}>{currentDate}</Text>
        <Text style={styles.greeting}>
          {getGreeting()} {username || "guest"}{" "}
        </Text>
        <Text style={{ color: "#aaa", marginTop: 5 }}> {id || "0"} </Text>
      </View>

      {/* Motivation Card */}
      <View style={styles.heroCard}>
        <Text style={styles.motivationLabel}>DAILY MOTIVATION</Text>

        <Text style={styles.motivationText}>{quotes[quoteIndex]}</Text>

        <TouchableOpacity style={styles.startButton} onPress={openCamera}>
          <Ionicons name="play-circle" size={24} color="#161E00" />
          <Text style={styles.startButtonText}>Start Your Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionGrid}>
        {quickActions.map(renderActionCard)}
      </View>

      {/* Exercises */}
      <View style={styles.exerciseSection}>
        <View style={styles.exerciseHeader}>
          <Text style={styles.sectionTitle}>Exercises</Text>
        </View>

        {workouts.map(renderExerciseCard)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    paddingHorizontal: 20,
  },

  header: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#C3F400",
  },

  greetingSection: {
    marginTop: 25,
  },

  date: {
    color: "#8E9379",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 2,
  },

  greeting: {
    color: "#E2E4CF",
    fontSize: 30,
    fontWeight: "700",
    marginTop: 5,
  },

  heroCard: {
    backgroundColor: "#1E2113",
    padding: 20,
    borderRadius: 20,
    marginTop: 25,
  },

  motivationLabel: {
    color: "#C3F400",
    fontWeight: "700",
    marginBottom: 10,
  },

  motivationText: {
    color: "#E2E4CF",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },

  startButton: {
    backgroundColor: "#C3F400",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  startButtonText: {
    color: "#161E00",
    fontWeight: "bold",
    fontSize: 16,
  },

  actionGrid: {
    marginTop: 25,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
  },

  actionIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "rgba(195,244,0,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  actionTitle: {
    color: "#E2E4CF",
    fontWeight: "bold",
    fontSize: 16,
  },

  actionSubtitle: {
    color: "#8E9379",
    fontSize: 12,
    marginTop: 4,
  },

  exerciseSection: {
    marginTop: 20,
  },

  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#E2E4CF",
    fontSize: 22,
    fontWeight: "700",
  },

  viewAll: {
    color: "#C3F400",
    fontWeight: "600",
  },

  exerciseCard: {
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  exerciseImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  exerciseContent: {
    flex: 1,
    marginLeft: 12,
  },

  exerciseTitle: {
    color: "#E2E4CF",
    fontSize: 17,
    fontWeight: "600",
  },

  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 10,
  },

  badge: {
    backgroundColor: "#2D3218",
    color: "#C3F400",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: "bold",
  },

  calories: {
    color: "#8E9379",
    fontSize: 12,
  },
});
