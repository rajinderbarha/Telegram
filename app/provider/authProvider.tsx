import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

type AuthContext = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
};

export const AuthContext = createContext<AuthContext>({
  session: null,
  user: null,
  profile: null,
  loading: true,
});

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    initAuth();

    const { data: authListner } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      authListner.subscription.unsubscribe();
    };

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   setSession(session);
    // });
  }, []);

  useEffect(() => {
    

    if(session && session.user){
    async function fetchProfile() {
      let { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();
      setProfile(data);
    }

    fetchProfile();
  }else {
    setProfile(null)
  }

  }, [session?.user]);

  // console.log(profile);

  const value: AuthContext = {
    session,
    user: session?.user ?? null,
    profile,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
