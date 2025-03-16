"use client";
import React, { useEffect } from "react";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import dynamic from "next/dynamic";
const ResponsiveAppBar = dynamic(() => import("@/components/header"), {
  ssr: false,
});
import "./global.css";
import "../i18n";
import { CssVarsProvider } from "@mui/joy";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="text-dark">
      <head />
      <body className={`${montserrat.className} bg-gray`}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ResponsiveAppBar />
            <CssVarsProvider>{children}</CssVarsProvider>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
