import { Redirect, Slot } from "expo-router";
import { useAuth } from "../provider/authProvider";

export default function AuthLayout(){

  const {user} = useAuth();


    if(user){
      return <Redirect href={'/home'} />
    }

  return (
    <Slot/>
  );
};
