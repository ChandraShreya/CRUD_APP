"use client";
import { Provider } from "react-redux";
// import { store } from "../store/store";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { store } from "../store/store";
import {SessionProvider} from "next-auth/react"

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
    <SessionProvider>
      <Provider store={store}>

        {children}
        <Toaster position="top-right"
          theme="dark"
          richColors
          duration={3000} />

      </Provider>
    </SessionProvider>
    </>

  )
}



//virtual list-react window we use to create virtual list
//lazy-load
//infinite scrolling
