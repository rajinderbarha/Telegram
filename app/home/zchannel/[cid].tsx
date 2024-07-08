import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { Channel as ChannelType, StreamChat } from "stream-chat";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";

export default function ChannelScreen() {
  const { cid } = useLocalSearchParams<{ cid: string }>();
  const [channel, setChannel] = useState<ChannelType | null>(null);

  const { client } = useChatContext();

  useEffect(() => {
    async function fetchChannel() {
      const channels = await client.queryChannels({ cid });
      setChannel(channels[0])
    }

    fetchChannel();
  }, [cid]);

  if (!channel) {
    return <ActivityIndicator />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
