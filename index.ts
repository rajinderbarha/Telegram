import "expo-router/entry";
import messaging from "@react-native-firebase/messaging";
import { StreamChat } from "stream-chat";
import tokenProvider from "./app/utility/tokenProider";
import { supabase } from "./app/lib/supabase";
import notifee, { AndroidImportance, EventType } from "@notifee/react-native";
import { router } from "expo-router";

console.log("Notification Background Listner");

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("Stream API key is not defined in environment variables.");
}
const client = StreamChat.getInstance(apiKey);

messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  try {
    console.log("Background message Received:", remoteMessage);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      console.log("ERROR: No User Logged in");
      return;
    }

    // Set the user properly
    await client._setToken(
      {
        id: session.user.id,
        
      },
      tokenProvider
    );

    

    // Check for call notification type
    if (remoteMessage.data.type === "call.ring") {
      console.log("Incoming call from:", remoteMessage.data.created_by_display_name);

      await notifee.displayNotification({
        title: "Incoming Call",
        body: `Incoming call from ${remoteMessage.data.created_by_display_name}`,
        android: {
          channelId: "chat-messages",
          pressAction: {
            id: "default",
          },
        },
      });
    } else if (remoteMessage.data.type === "call.missed") {
      console.log("Missed call from:", remoteMessage.data.created_by_display_name);
      
      await notifee.displayNotification({
        title: "Missed Call",
        body: `You missed a call from ${remoteMessage.data.created_by_display_name}`,
        android: {
          channelId: "chat-messages",
          pressAction: {
            id: "default",
          },
        },
      });
    } else if( remoteMessage.data.type === "message.new") {
     
      const messageId = remoteMessage.data.id; // Update to your actual key

      if (!messageId) {
        console.log("Error: Message ID is missing");
        return;
      }

      const message = await client.getMessage(messageId);

      if (!message) {
        console.log("Error: Message not found");
        return;
      }

      const channelId = await notifee.createChannel({
        id: "chat-messages",
        name: "Chat Messages",
        vibration : true,
        importance : AndroidImportance.HIGH,
        lights : true,
        sound : 'default'
      });

      const { stream, ...rest } = remoteMessage.data ?? {};
        const data = {
          ...rest,
          ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
        };


      await notifee.displayNotification({
        title: message.message.user?.name ?? '',
        body: message.message.text,
        data,
        android: {
          channelId,
          pressAction: {
            id: "default",
          },
        },
      });
    }
  } catch (error) {
    console.error("Error in background message handler:", error);
  }
});

notifee.onBackgroundEvent(async ({ detail, type }: any) => {
  console.log('Event :',type)
  if (type === EventType.PRESS) {
    const cid = detail.notification?.data.cid;
    console.log('detail : ' ,detail.notification?.data)
    if (cid) {
      router.push(`/home/zchannel/${cid}`);
    }
  }
});