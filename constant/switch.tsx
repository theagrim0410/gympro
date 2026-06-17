// import React, { useState } from "react";
// import { View, Text, Pressable, StyleSheet } from "react-native";

// // import your theme files
// import LightColors from "./light";
// import DarkColors from "./dark";

// export default function ThemeSwitch() {
//   const [isDark, setIsDark] = useState(false);

//   const theme = isDark ? DarkColors : LightColors;

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: theme.background },
//       ]}
//     >
//       <Text style={[styles.text, { color: theme.text }]}>
//         {isDark ? "Dark Mode" : "Light Mode"}
//       </Text>

//       <Pressable
//         onPress={() => setIsDark(!isDark)}
//         style={[
//           styles.button,
//           { backgroundColor: theme.button },
//         ]}
//       >
//         <Text style={{ color: theme.buttonText }}>
//           Switch Theme
//         </Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 22,
//     marginBottom: 20,
//     fontWeight: "600",
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
// });