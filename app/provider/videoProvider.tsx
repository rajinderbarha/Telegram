import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
import { PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import tokenProvider from "../utility/tokenProider";
import { useAuth } from "./authProvider";
import { supabase } from "../lib/supabase";

const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY as string;

export default function VideoProvider({ children }: PropsWithChildren) {
  const [videoClient, setVideoClient] = useState<any>(null);
  const { profile } = useAuth();

  useEffect(() => {
    const initVideoClient = async () => {
      if (!profile) {
        return;
      }

      const user = {
        id: profile.id,
        name: profile.full_name,
        image: supabase.storage.from("avatars").getPublicUrl(profile.avatar_url)
          .data.publicUrl,
      };
      const client = new StreamVideoClient({ apiKey, user, tokenProvider });
      setVideoClient(client)
    };

    initVideoClient();

    return ()=>{
        if(videoClient) {
            videoClient.disconnectUser();
        }
    }
    
  }, [profile?.id]);

  if (!videoClient) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text>Loading Video Client</Text>
      </View>
    );
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>  ;
}
