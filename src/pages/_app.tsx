import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "@/data/context/AppContext";
import { AuthProvider } from "@/data/context/AuthContext";
import { NextUIProvider } from "@nextui-org/system";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AppProvider>
        <NextUIProvider>
          <Component {...pageProps}/>
        </NextUIProvider>
      </AppProvider>
    </AuthProvider>
  )
}
