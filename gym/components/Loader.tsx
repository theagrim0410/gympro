import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import Svg, { Rect, Circle, Defs, LinearGradient, Stop } from "react-native-svg";

export default function Loader() {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50],
  });

  return (
    <View style={styles.container}>
      <Svg width={320} height={220} viewBox="0 0 800 500">

        <Defs>
          <LinearGradient id="chip" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#2d2d2d" />
            <Stop offset="100%" stopColor="#0f0f0f" />
          </LinearGradient>
        </Defs>

        {/* Chip */}
        <Rect
          x="330"
          y="190"
          width="140"
          height="100"
          rx="20"
          fill="url(#chip)"
          stroke="#222"
          strokeWidth="3"
        />

        {/* Animated flowing line (simplified) */}
        <Animated.View
          style={[
            styles.flowDot,
            { transform: [{ translateX: translate }] },
          ]}
        />

        {/* Nodes */}
        <Circle cx="100" cy="100" r="6" fill="#000" />
        <Circle cx="700" cy="90" r="6" fill="#000" />

        <Text x="400" y="250" fill="white" fontSize="22" textAnchor="middle">
          Loading...
        </Text>
      </Svg>

      <Text style={styles.text}>AI Gym Trainer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 20,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  flowDot: {
    position: "absolute",
    top: 120,
    left: 120,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#00ccff",
  },
});