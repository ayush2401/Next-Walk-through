// Add the appropriate types for your components and props
"use client";

import React, { ReactNode } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
  session: Session | null | undefined; // Assuming your session can be null or undefined
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
