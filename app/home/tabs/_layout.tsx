import { Entypo, Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" size={size} color={color} />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
              

              <Link href={"/home/users"}>
                <FontAwesome5 name="users" size={24} color="black" />
              </Link>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
//
