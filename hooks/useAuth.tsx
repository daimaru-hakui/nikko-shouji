import { useStore } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

const useAuth = (userId: string) => {
  const supabase = createClientComponentClient();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const currentUser = useStore((state) => state.currentUser);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();
      if (!data) return;
      setCurrentUser(data);
    };
    getUser();
  }, [supabase, userId, setCurrentUser]);

  return { currentUser };
};

export default useAuth;
