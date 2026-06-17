import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Image, Dimensions } from "react-native";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const scale = useRef(new Animated.Value(0.8)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Your only competition is yourself.",
    "Precision in every movement.",
    "Momentum is built today.",
    "Evolution through AI guidance.",
    "Consistency is the ultimate tech.",
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace("/login");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((p) => (p + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74" }}
        style={styles.bg}
      />

      <View style={styles.overlay} />

      <View style={styles.center}>
        <Animated.View style={{ transform: [{ scale }], opacity, alignItems: "center" }}>
          <Image source={require("../assets/start.png")} style={styles.logo} />
          <Text style={styles.title}>Kinetic AI</Text>
        </Animated.View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <Text style={styles.quote}>{quotes[quoteIndex]}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111508" },
  bg: { position: "absolute", width, height, resizeMode: "cover" },
  overlay: { position: "absolute", width, height, backgroundColor: "rgba(17,21,8,0.7)" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { width: 140, height: 140, marginBottom: 20 },
  title: { fontSize: 34, fontWeight: "800", color: "#c3f400" },

  bottom: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignItems: "center",
  },

  progressBar: {
    width: "80%",
    height: 6,
    backgroundColor: "#333627",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#c3f400",
  },

  quote: {
    color: "#c4c9ac",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
});