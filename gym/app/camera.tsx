// import React from "react";
// import { SafeAreaView } from "react-native";
// import { WebView } from "react-native-webview";
// import { useLocalSearchParams } from "expo-router";

// export default function GymCoach() {
//     const { id, username } = useLocalSearchParams<{
//     id: string;
//     username: string;
//   }>();
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <WebView
//         source={{
//         //  uri: `https://vicinity-cryptic-mangy.ngrok-free.dev/?id=${id}&username=${username}`,
//         uri :'https://instagram.com',
//         }}
//         javaScriptEnabled
//         domStorageEnabled
//         mediaPlaybackRequiresUserAction={false}
//         allowsInlineMediaPlayback
//       />
//     </SafeAreaView>
//   );
// }

import {View, Text} from 'react-native';
import React from 'react';
export default function Camera() {
  return (
    <View>
      <Text>Camera</Text>
      </View>
  );
}