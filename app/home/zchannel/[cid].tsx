import { FontAwesome5 } from "@expo/vector-icons";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View, Text } from "react-native";
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
      try {
        const channels = await client.queryChannels({ cid });
        if (channels.length > 0) {
          setChannel(channels[0]);
        } else {
          console.log("No channels Found");
        }
      } catch (error) {
        console.error("Error fetching channel:", error);
      }
    }

    fetchChannel();
  }, [cid]);

  async function joinCall() {
    const members = Object.values(channel.state.members).map((member: any) => ({
      user_id: member.user_id,
    }));

    if (!videoClient) {
      console.warn("No video client");
      return;
    }
    const call = videoClient.call("default", UUID);
    try {
      await call.getOrCreate({
        ring: true,
        data: {
          members,
        },
      });
    } catch (error) {
      console.error("Error joining call:", error);
    }
  }

  if (!channel) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text>Loading Messages</Text>
      </View>
    );
  }

  return (
    <Channel channel={channel}>
      <Stack.Screen
        options={{
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
