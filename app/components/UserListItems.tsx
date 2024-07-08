import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../provider/authProvider";
import { router } from "expo-router";

export default function UserListItems({ user }: any) {
  const { client } = useChatContext();
  const { user: me } = useAuth();
   async function onPress() {
    const channel = client.channel("messaging", {
      members: [me?.id, user.id],
    });
    await channel.watch();
    router.replace(`/home/zchannel/${channel.cid}`)
  }

  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Text style={{ fontWeight: "600" }}>{user.full_name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    padding: 15,
    backgroundColor: "white",
  },
});
