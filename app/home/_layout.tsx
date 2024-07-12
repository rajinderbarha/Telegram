import { Link, Redirect, Slot, Stack } from "expo-router";
import ChatProvider from "../provider/chatProvider";
import { useAuth } from "../provider/authProvider";
import VideoProvider from "../provider/videoProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import CallProvider from "../provider/callProvider";
import NotificationsProvider from "../provider/notificationsProvider";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/auth"} />;
  }

  return (
    <NotificationsProvider>
    <ChatProvider>
      <VideoProvider>
        <CallProvider>
        <Stack>
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
          <Stack.Screen
            name="zchannel"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="users" />
          <Stack.Screen name="call" />
        </Stack>
        </CallProvider>
      </VideoProvider>
    </ChatProvider>
    </NotificationsProvider>
  );
}
