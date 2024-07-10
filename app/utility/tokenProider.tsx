import { supabase } from "../lib/supabase";

export default async function tokenProvider(){
    const {data} =await supabase.functions.invoke('stream-token')
    console.log(data)
  return data.token ;
};
