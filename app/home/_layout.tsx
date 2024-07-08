import { Redirect, Slot, Stack } from "expo-router";
import ChatProvider from "../provider/chatProvider";
import { useAuth } from "../provider/authProvider";

export default function HomeLayout() {

  const { user } = useAuth()


  if(!user){
    return <Redirect href={'/auth'} />
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="tabs" options={{headerShown : false}}/>
      </Stack>
    </ChatProvider>
  );
}
