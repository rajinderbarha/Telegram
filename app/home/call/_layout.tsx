import { Stack } from "expo-router";

export default function ChannelLayout(){
  return (
    <Stack >
        <Stack.Screen name="index" options={{headerShown: false}}/>
    </Stack>
  );
};
