import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Channel, ChannelList, MessageInput, MessageList } from "stream-chat-expo";

export default function ChatScreen() {
  const [channel, setChannel] = useState();

  if(channel){
    return (<Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>)
  }


  return <ChannelList onSelect={(channel) => setChannel(channel)} />;
}

