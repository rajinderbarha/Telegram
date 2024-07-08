import { useEffect, useState } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native";
import { useAuth } from "../provider/authProvider";
import { supabase } from "../lib/supabase";
import UserListItems from "../components/UserListItems";


interface Profile {
    full_name: string; // Adjust based on your actual profile structure
    // Add other fields as needed
  }

export default function UsersScreen() {
  const [users, setUsers] = useState<Profile[]>([]);;
    const {user} = useAuth()
  useEffect(() => {
    async function fetchUsers() {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq('id', user?.id)


      setUsers(profiles as Profile[]);
    }
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItems user={item}/>}
    />
  );
}
