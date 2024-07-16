import {
  RingingCallContent,
  StreamCall,
  useCalls,
} from "@stream-io/video-react-native-sdk";
import { router } from "expo-router";
import { useEffect } from "react";

export default function VideoCallScreen() {
  const calls: any = useCalls();

  const call = calls[0];

  useEffect(() => {
    async function endCall() {
      if (call) {
        await call.endCall();
      }
    }

    if (!call) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("./home");
      }
      endCall();
    }
  }, [call]);

  return (
    <StreamCall call={call}>
      <RingingCallContent />
    </StreamCall>
  );
}
