import { Link, router, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Channel,
  ChannelList,
  MessageInput,
  MessageList,
  
} from "stream-chat-expo";
import { useAuth } from "../../provider/authProvider";

export default function MainChatScreen() {
  const [channel, setChannel] = useState();
  const { user } = useAuth();

  function channelNavigation(cid: any) {
    router.push(`/home/zchannel/${cid}`);
  }

  return (
    <ChannelList
      filters={{ members: { $in: [user?.id || ''] } }}
      onSelect={(channel) => channelNavigation(channel.cid)}
    />
  );
}
