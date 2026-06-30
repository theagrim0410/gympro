import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { useLocalSearchParams } from "expo-router";
import Header2 from "../components/Header2";

export default function BMICalculator() {
    const { id, username } = useLocalSearchParams<{
      id: string;
      username: string;
    }>();
  const [gender, setGender] = useState("Male");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");

  const [bmi, setBmi] = useState("0");
  const [category, setCategory] = useState("Not Calculated");
  const [insight, setInsight] = useState(
    "Enter your details to get AI-powered BMI insights."
  );

  const calculateBMI = () => {
    if (!height || !weight) return;

    const h = Number(height) / 100;
    const bmiValue = Number(weight) / (h * h);

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setCategory("Underweight");
      setInsight(
        "Increase calorie intake and prioritize strength training."
      );
    } else if (bmiValue < 25) {
      setCategory("Normal Range");
      setInsight(
        "You're in the healthy range. Maintain current habits."
      );
    } else if (bmiValue < 30) {
      setCategory("Overweight");
      setInsight(
        "Increase activity and monitor calorie intake."
      );
    } else {
      setCategory("Obese");
      setInsight(
        "Consider a structured nutrition and exercise program."
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
        <Header2 title="BMI Calculator" id={id} username={username} />

      <Text style={styles.heading}>
        BMI Insights
      </Text>

      <Text style={styles.subHeading}>
        Calculate your Body Mass Index with
        precision AI analysis.
      </Text>

      {/* Gender */}

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderBtn,
            gender === "Male" && styles.activeBtn,
          ]}
          onPress={() => setGender("Male")}
        >
          <Text
            style={[
              styles.genderText,
              gender === "Male" &&
                styles.activeText,
            ]}
          >
            MALE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderBtn,
            gender === "Female" &&
              styles.activeBtn,
          ]}
          onPress={() => setGender("Female")}
        >
          <Text
            style={[
              styles.genderText,
              gender === "Female" &&
                styles.activeText,
            ]}
          >
            FEMALE
          </Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}

      <View style={styles.row}>
        <View style={styles.inputCard}>
          <Text style={styles.label}>
            Height (cm)
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholder="180"
            placeholderTextColor="#444933"
          />
        </View>

        <View style={styles.inputCard}>
          <Text style={styles.label}>
            Weight (kg)
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholder="75"
            placeholderTextColor="#444933"
          />
        </View>
      </View>

      <View style={styles.inputCard}>
        <Text style={styles.label}>Age</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          placeholder="28"
          placeholderTextColor="#444933"
        />
      </View>

      {/* Calculate Button */}

      <TouchableOpacity
        style={styles.calculateBtn}
        onPress={calculateBMI}
      >
        <Text style={styles.calculateText}>
          Calculate
        </Text>
      </TouchableOpacity>

      {/* Gauge */}

      <View style={styles.gaugeContainer}>
        <CircularProgress
          value={Number(bmi)}
          radius={110}
          maxValue={40}
          activeStrokeColor="#C3F400"
          inActiveStrokeColor="#1E2113"
          progressValueColor="#C3F400"
          title={"BMI INDEX"}
          titleColor="#8E9379"
          titleStyle={{
            fontSize: 12,
            letterSpacing: 2,
          }}
        />
      </View>

      {/* Category */}

      <View style={styles.categoryBadge}>
        <View style={styles.dot} />

        <Text style={styles.categoryText}>
          {category}
        </Text>
      </View>

      {/* AI Insight */}

      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>
          AI Insight
        </Text>

        <Text style={styles.insightText}>
          {insight}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
    padding: 20,
  },

  header: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#C3F400",
    fontSize: 22,
    fontWeight: "700",
  },

  heading: {
    color: "#C3F400",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 30,
  },

  subHeading: {
    color: "#8E9379",
    marginTop: 8,
    marginBottom: 25,
  },

  genderContainer: {
    flexDirection: "row",
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
  },

  genderBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  activeBtn: {
    backgroundColor: "#373B2C",
  },

  genderText: {
    color: "#8E9379",
    fontWeight: "700",
  },

  activeText: {
    color: "#C3F400",
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  inputCard: {
    flex: 1,
    backgroundColor: "#1E2113",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  label: {
    color: "#8E9379",
    fontSize: 12,
    marginBottom: 8,
  },

  input: {
    color: "#C3F400",
    fontSize: 28,
    fontWeight: "700",
  },

  calculateBtn: {
    backgroundColor: "#C3F400",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },

  calculateText: {
    color: "#161E00",
    fontWeight: "700",
    fontSize: 18,
  },

  gaugeContainer: {
    alignItems: "center",
    marginVertical: 30,
  },

  categoryBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(195,244,0,0.1)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(195,244,0,0.3)",
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C3F400",
    marginRight: 8,
  },

  categoryText: {
    color: "#C3F400",
    fontWeight: "700",
  },

  insightCard: {
    marginTop: 25,
    backgroundColor: "#1E2113",
    borderRadius: 20,
    padding: 20,
  },

  insightTitle: {
    color: "#ABD600",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  insightText: {
    color: "#E2E4CF",
    lineHeight: 24,
  },
});