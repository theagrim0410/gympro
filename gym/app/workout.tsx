import React, { useState ,useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useLocalSearchParams} from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import workouts from "../constant/workout";
import Header2 from "../components/Header2";
import { VideoView, useVideoPlayer } from "expo-video";

export default function Workout() {
  const API_URL = "http://192.168.29.104:5000";
  const { id, username } = useLocalSearchParams<{
      id: string;
      username: string;
    }>();
  // const workout = workouts.find(
  // (item) => item.id === Number(id)
  //   );
    type Workout = {
  id: number;
  name: string;
  description: string;
  image: string;
  video: string;
  caloriesBurned: number;
  sets: number;
  repetitions: number;
  restTime: number;
  steps: string[];
  mistake: string;
  route: string;
};

const [workout, setWorkout] = useState<Workout | null>(null);
const [showVideo, setShowVideo] = useState(false);
  const player = useVideoPlayer(
    { uri: workout?.video },
    (player) => {
      player.loop = true;
    }
  );
  useEffect(() => {
  const fetchWorkout = async () => {
    try {
      const res = await fetch(
        `${API_URL}/workouts/${id}`
      );
      console.log("id", id); // Log the id for debugging
      const json = await res.json();
      console.log("Workout Data:", json.data); // Log the workout data for debugging
      setWorkout(json.data);
    } catch (err) {
      console.log(err);
    }
  };
  fetchWorkout();
}, [id]);

  if (!workout) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>
          Workout not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header2 title="Exercise" id={id} username={username} />

        {/* Hero Image */}
        <View style={styles.hero}>
          <Image
            source={{ uri: workout.image }}
            style={styles.heroImage}
          />

          <View style={styles.overlay}>
            <Text style={styles.badge}>
              STRENGTH
            </Text>

            <Text style={styles.workoutName}>
              {workout.name}
            </Text>
          </View>
        </View>

        {/* Calories */}
        <View style={styles.card}>
          <MaterialIcons
            name="local-fire-department"
            size={28}
            color="#C3F400"
          />

          <Text style={styles.label}>
            CALORIES
          </Text>

          <Text style={styles.value}>
            {workout.caloriesBurned} kcal
          </Text>
        </View>

        {/* Routine */}
        <View style={styles.routineCard}>
          <Text style={styles.sectionTitle}>
            Target Routine
          </Text>

          <View style={styles.statsRow}>
            <View>
              <Text style={styles.big}>
                {workout.sets}
              </Text>
              <Text style={styles.small}>
                SETS
              </Text>
            </View>

            <View>
              <Text style={styles.big}>
                {workout.repetitions}
              </Text>
              <Text style={styles.small}>
                REPS
              </Text>
            </View>

            <View>
              <Text style={styles.big}>
                {workout.restTime}s
              </Text>
              <Text style={styles.small}>
                REST
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {workout.description}
          </Text>
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Step-by-Step
          </Text>

          {workout.steps.map((step, index) => (
            <View
              key={index}
              style={styles.stepContainer}
            >
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>
                  {index + 1}
                </Text>
              </View>

              <Text style={styles.stepText}>
                {step}
              </Text>
            </View>
          ))}
        </View>

        {/* Mistakes */}
        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>
            COMMON MISTAKE
          </Text>

          <Text style={styles.warningText}>
            {workout.mistake}
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Buttons */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.videoBtn}
          onPress={() => {
            setShowVideo(true);
            player.play();
          }}
        >
          <Ionicons
            name="videocam"
            size={24}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <Modal
  visible={showVideo}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setShowVideo(false)}
>
  <View style={styles.modalContainer}>
    <Text style={styles.videoTitle}>
    {workout.name} Tutorial
  </Text>
    <View style={styles.videoContainer}>

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => setShowVideo(false)}
      >
        <Ionicons
          name="close"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Video */}
      <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111508",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111508",
  },

  hero: {
    height: 350,
    position: "relative",
    backgroundColor: "#000",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 5,
    borderColor: "#C3F400",
    shadowColor: "#C3F400",
    shadowRadius: 15,
    elevation: 12,
  },

  heroImage: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
  },

  overlay: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  badge: {
    backgroundColor: "#C3F400",
    color: "#283500",
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  workoutName: {
    color: "#050000",
    fontSize: 38,
    fontWeight: "800",
  },

  card: {
    backgroundColor: "#1e2113",
    margin: 16,
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
  },

  label: {
    color: "#c4c9ac",
    marginTop: 8,
  },

  value: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 6,
  },

  routineCard: {
    backgroundColor: "#1e2113",
    marginHorizontal: 16,
    borderRadius: 18,
    padding: 20,
  },

  sectionTitle: {
    color: "#C3F400",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  big: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
  },

  small: {
    color: "#c4c9ac",
    textAlign: "center",
  },

  section: {
    backgroundColor: "#1e2113",
    margin: 16,
    borderRadius: 18,
    padding: 20,
  },

  description: {
    color: "#c4c9ac",
    lineHeight: 24,
  },

  stepContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#C3F400",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  stepNumber: {
    fontWeight: "700",
    color: "#283500",
  },

  stepText: {
    flex: 1,
    color: "#e2e4cf",
    lineHeight: 22,
  },

  warningCard: {
    backgroundColor: "#2A1717",
    borderLeftWidth: 4,
    borderLeftColor: "#ffb4ab",
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },

  warningTitle: {
    color: "#ffb4ab",
    fontWeight: "700",
    marginBottom: 10,
  },

  warningText: {
    color: "#fff",
  },

  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    alignItems: "flex-end",
  },

  videoBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1e2113",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  startBtn: {
    flexDirection: "row",
    backgroundColor: "#C3F400",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },

  startText: {
    color: "#283500",
    fontWeight: "700",
    marginLeft: 8,
  },

  modalContainer: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.95)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},


videoContainer: {
  width: "100%",
  height: 220,
  backgroundColor: "#000",
  borderRadius: 20,
  overflow: "hidden",
  borderWidth: 2,
  borderColor: "#C3F400",
  shadowColor: "#C3F400",
  shadowOpacity: 0.8,
  shadowRadius: 15,
  elevation: 12,
},

video: {
  flex: 1,
  borderRadius: 18,
},


closeBtn: {
  position: "absolute",
  top: 10,
  right: 10,
  zIndex: 10,
  backgroundColor: "rgba(0,0,0,0.6)",
  borderRadius: 20,
  padding: 5,
},
videoTitle: {
  color: "#C3F400",
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 20,
},
});