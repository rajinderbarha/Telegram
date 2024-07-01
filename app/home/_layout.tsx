import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { StreamChat } from 'stream-chat';
import { ChannelList, Chat, OverlayProvider } from 'stream-chat-expo';


const client = StreamChat.getInstance('vz55nyx7v2ja');


export default function HomeLayout() {

  useEffect(() => {
     async function connectUser(){
    await client.connectUser(
      {
        id: 'jlahey',
        name: 'Jim Lahey',
        image: 'https://i.imgur.com/fR9Jz14.png',
      },
      client.devToken('jlahey'),
    )
    // const channel = client.channel('messaging', 'the_park', {
    //   name: 'The Park',

    // });
    
    // await channel.watch()
  }

    connectUser();
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        
    <Tabs >
      <Tabs.Screen name="tabs/chat" options={{ title: 'Chat' , tabBarIcon : ({color,size})=> <Entypo name='chat' size={size} color={color}/>}} />
      <Tabs.Screen name="tabs/profile" options={{ title: 'Profile',  tabBarIcon : ({color,size})=> <Ionicons name="person-circle-outline" size={size} color={color} /> }} />
    </Tabs>
    </Chat>
    </OverlayProvider>
  );
};

