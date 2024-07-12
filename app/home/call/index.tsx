import {
  RingingCallContent,
  StreamCall,
  useCalls,
} from "@stream-io/video-react-native-sdk";
import { router, useLocalSearchParams, } from "expo-router";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function VideoCallScreen() {
  // const {id} = useLocalSearchParams<{ id: string }>();
  const calls: any = useCalls();

  const call = calls[0];

  // const [call, setCall] = useState<any>(null);

  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   if(calls)
  //   console.log('calls ===== tRUE')

  // }, [calls]);

  // useEffect(() => {
  //   if (calls ) {
  //     setCall(calls[0]);

  //   } else {
  //     setError('No calls available');

  //   }
  // }, [calls]);

  // if (error) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>{error}</Text>
  //     </View>
  //   );
  // }

  if (!call) {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/");
    }
    return null;
  }

  return (
    <StreamCall call={call}>
      <RingingCallContent />
    </StreamCall>
  );
}
