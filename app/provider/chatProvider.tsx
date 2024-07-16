import { useEffect, useState,PropsWithChildren } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider } from "stream-chat-expo";
import { ActivityIndicator , View, Text} from "react-native";
import { useAuth } from "./authProvider";
import { supabase } from "../lib/supabase";
import tokenProvider from "../utility/tokenProider";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error("Stream API key is not defined in environment variables.");
}

const client = StreamChat.getInstance(apiKey);
export default function ChatProvider({ children }: PropsWithChildren) {
  const [isReady, setIsReady] = useState(false);
  const { profile, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }
    tokenProvider()

    async function connectUser() {
      if (!profile) {
        return;
      }
      try{
      await client.connectUser(
        {
          id: profile.id,
          name: profile.full_name,
          image: supabase.storage
            .from("avatars")
            .getPublicUrl(profile.avatar_url).data.publicUrl,
        },
        tokenProvider
      );
      setIsReady(true);
    } catch(error){
      console.error("Error connecting user (chat Provider):", error);
    } 
    };

    connectUser();

    return () => {
      if (client.userID) {
        client.disconnectUser();
      }
      setIsReady(false);
    };
  }, [profile, loading]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text>Loading Chat Provider</Text>
      </View>
    );
  } 

  return (
    <OverlayProvider>
      <Chat client={client}>{children}</Chat>
    </OverlayProvider>
  );
}


