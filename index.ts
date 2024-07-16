import "expo-router/entry";
import messaging from "@react-native-firebase/messaging";
import { StreamChat } from "stream-chat";
import tokenProvider from "./app/utility/tokenProider";
import { supabase } from "./app/lib/supabase";
import notifee, { EventType } from "@notifee/react-native";
import {router} from 'expo-router'

console.log("Notification Background Listner");



const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("Stream API key is not defined in environment variables.");
}

messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  try{
  console.log('Background message Recieved', remoteMessage);
  const client = StreamChat.getInstance(apiKey);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    console.log("ERROR : No User Logged in");
    return;
  }

  client._setToken(
    {
      id: session?.user.id ?? "",
    },
    tokenProvider
  );

  const message: any = await client.getMessage(remoteMessage.data.id);

  if(!message){
    console.log('Error : Message not found')
    return;
  }

  const channelId = await notifee.createChannel({
    id: "chat-messages",
    name: "Chat Messages",
  });

  // display the notification
  const { stream, ...rest } = remoteMessage.data ?? {};
  const data = {
    ...rest,
    ...((stream as unknown as Record<string, string> | undefined) ?? {}), // extract and merge stream object if present
  };
  await notifee.displayNotification({
    title: "New message from " + message.message.user.name,
    body: message.message.text,
    data,
    android: {
      channelId,
      // add a press action to open the app on press
      pressAction: {
        id: "default",
      },
    },
  });
} catch (error){
  console.error("Error in background message handler:", error)
}
});

notifee.onBackgroundEvent( async ({detail, type}: any)=>{
    if(type === EventType.PRESS){
        const cid = detail.notification?.data.cid;
        if(cid){
        router.push(`/home/zchannel/${cid}`)
        }

    }
} )
