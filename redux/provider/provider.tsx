"use client";
import { Provider, useDispatch } from "react-redux";
// import { store } from "../store/store";
import { ReactNode, useEffect } from "react";
import { Toaster } from "sonner";
import { store } from "../store/store";
import { SessionProvider } from "next-auth/react"
import { checkToken } from "../slice/authSlice";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {


  return (
    <>
      <Provider store={store}>
        <SessionProvider>


          {children}
          {/* <Toaster position="top-right"
            theme="dark"
            richColors
            duration={3000} /> */}


        </SessionProvider>
      </Provider>
    </>

  )
}



//virtual list-react window we use to create virtual list
//lazy-load
//infinite scrolling
