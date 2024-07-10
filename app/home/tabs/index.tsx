import { router } from "expo-router";
import { useState } from "react";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../provider/authProvider";

export default function MainChatScreen() {
  const { user } = useAuth();

  function channelNavigation(cid: any) {
    router.push(`/home/zchannel/${cid}`);
  }

  return (
    <ChannelList
      filters={{ members: { $in: [user?.id || ""] } }}
      onSelect={(channel) => channelNavigation(channel.cid)}
    />
  );
}
