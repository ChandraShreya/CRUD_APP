"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

interface LoginProps {
  name: string;
  email: string;
  image: string;
}

export default function GoogleLogin() {
  const { data: session } = useSession();
  const user = session?.user as LoginProps | undefined;
  if (user) {
    return (
      <>
        Signed in as {user.email} <br />
        <img
          src={user.image}
          alt="User Image"
          height={"100px"}
          width={"100px"}
        />
        Signed in as {user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>

      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}> Google Sign in</button>
      <button onClick={() => signIn("facebook")}>Facebook Sign in</button>
    </>
  );
}