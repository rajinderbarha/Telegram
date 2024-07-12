import { FontAwesome5 } from "@expo/vector-icons";
import {
  StreamVideoClient,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { Channel as ChannelType, StreamChat } from "stream-chat";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";
import * as Crypto from "expo-crypto";

const UUID = Crypto.randomUUID();
export default function ChannelScreen() {
  const [channel, setChannel] = useState<any>(null);
  const { cid } = useLocalSearchParams<{ cid: string }>();

  const { client } = useChatContext();

  const videoClient = useStreamVideoClient();

  useEffect(() => {
    async function fetchChannel() {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0]);
    }

    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  async function joinCall() {
    const members = Object.values(channel.state.members).map((member: any) => ({
      user_id: member.user_id,
    }));

    if (!videoClient) {
      console.warn("No video client");
      return;
    }
    const call = videoClient.call("default", UUID);
    await call.getOrCreate({
      ring: true,
      data: {
        members,
        
      },
    });

    // router.push(`/home/call`);
  }

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <Stack.Screen
        options={{
          title: "Messages",
          headerRight: () => (
            <TouchableOpacity onPress={joinCall}>
              <FontAwesome5 name="video" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
