"use client";

import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface IProps {
  children: React.ReactNode;
}

type User = {
  id: string | null;
  email: string | null;
  name: string | null;
  picture: string | null;
};

type ContextType = {
  user: User | null;
  id: string | null;
  email: string | null;
  name: string | null;
  picture: string | null;
  signOut: () => Promise<void>;
};

const Context = createContext<ContextType | undefined>(undefined);

const Provider: React.FC<IProps> = ({ children }) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  const supabaseClient = createClientComponentClient();

  const getCurrentSession = async () => {
    const res = await supabaseClient.auth.getSession();
    if (res && res.data.session) {
      return res.data.session;
    }
    clearUser();
    return null;
  };

  const getCurrentUser = async () => {
    if (id) return;

    const res = await supabaseClient.auth.getUser();
    if (res && res.data.user) {
      const theUser = res.data.user;

      setUser(theUser);
      setId(theUser.id);
      setEmail(theUser.email);

      if (theUser.identities && theUser.identities[0]?.identity_data) {
        setName(theUser.identities[0]?.identity_data.name);
        setPicture(theUser.identities[0]?.identity_data.picture);
      }
    }
  };

  useEffect(() => {
    const isUser = async () => {
      const currentSession = await getCurrentSession();
      if (currentSession) await getCurrentUser();
    };
    isUser();
  }, []);

  const signOut = async () => {
    await supabaseClient.auth.signOut();
    clearUser();
    router.push("/");
  };

  const clearUser = () => {
    setUser(null);
    setId(null);
    setEmail(null);
    setName(null);
    setPicture(null);
  };

  const exposed: ContextType = { user, id, email, name, picture, signOut };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = (): ContextType => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default Provider;
