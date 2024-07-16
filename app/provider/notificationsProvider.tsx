import { PropsWithChildren, useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { StreamChat } from "stream-chat";
import { useAuth } from "./authProvider";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("Stream API key is not defined in environment variables.");
}

const client = StreamChat.getInstance(apiKey);

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
    const {user}: any = useAuth();
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  useEffect(() => {
    
    const registerPushToken = async () => {
      // unsubscribe any previous listener
      const token = await messaging().getToken();
      const push_provider = "firebase";
      const push_provider_name = "Firebase";
        client.addDevice(token, push_provider, user.id, push_provider_name)

    //   client.setLocalDevice({
    //     id: token,
    //     push_provider,
    //     push_provider_name,
    //   });
    };
    const init = async () => {
      await requestPermission();
      await registerPushToken();

      setIsReady(true);
    };

    init();
  }, []);


  if(!isReady){
    return null;
  }

  return <>{children}</>;
}
