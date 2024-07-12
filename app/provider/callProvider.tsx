import { useCalls } from "@stream-io/video-react-native-sdk";
import { router, useSegments } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CallProvider({ children }: PropsWithChildren) {
  const calls = useCalls();
  const call = calls[0];
  const { top } = useSafeAreaInsets();
  const segments = useSegments();
  const isOnCallScreen = segments[1] === "call";


  // function goToCall() {
  //   if (call) {
  //     router.push(`/home/call`);
  //   }
  // }

  useEffect(() => {
    if (!call) {
      return;
    }
    if (!isOnCallScreen && call.state.callingState === 'ringing') {
      router.push(`/home/call`);
    }
  }, [call, isOnCallScreen]);



  return (
    <>
      {children}
      {call && !isOnCallScreen && (
        <Pressable
          onPress={() => router.push(`/home/call`)}
          style={{
            position: 'absolute',
            backgroundColor: 'lightgreen',
            top: top + 40,
            left: 0,
            right: 0,
            padding: 10,
          }}
        >
          <Text>
            Call: {call.id} ({call.state.callingState})
          </Text>
        </Pressable>
      )}
    </>
  );
}


//   if (call && !isOnCallScreen) {
//     return (
//       <>
//         <Pressable
//           style={({ pressed }) => [
//             styles.call,
//             pressed && styles.pressed,
//             { top: top + 20 },
//           ]}
//           onPress={() => goToCall()}
//         >
//           <Text>Call: {call.id} ({call.state.callingState})</Text>
//         </Pressable>

//         {children}
//       </>
//     );
//   } else {
//     return <>{children}</>;
//   }
// }

// const styles = StyleSheet.create({
//   call: {
//     backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//     height: 32,
//     zIndex: 1,
//   },
//   pressed: {
//     opacity: 0.5,
//   },
// });


