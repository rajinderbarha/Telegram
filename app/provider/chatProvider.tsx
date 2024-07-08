import { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator } from "react-native";
import { useAuth } from "./authProvider";
import { supabase } from "../lib/supabase";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("Stream API key is not defined in environment variables.");
}

const client = StreamChat.getInstance(apiKey);
export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    if (!profile) {
      return;
    }

    async function connectUser() {
      // Updated function definition
      try {
        await client.connectUser(
          {
            id: profile.id,
            name: profile.full_name,
            image: supabase.storage
              .from("avatars")
              .getPublicUrl(profile.avatar_url).data.publicUrl,
          },
          client.devToken(profile.id)
        );
        setIsReady(true);
      } catch (error) {
        console.error("Error connecting user:", error);
        setIsReady(true)
      }

      // const channel = client.channel('messaging', 'the_park', {
      //   name: 'The Park',

      // });

      // await channel.watch()
    }

    if (!isReady) {
      connectUser();
    }
    return () => {
      if (isReady) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile?.id]);

  // if (!isReady) {
  //   return <ActivityIndicator />;
  // }

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}
