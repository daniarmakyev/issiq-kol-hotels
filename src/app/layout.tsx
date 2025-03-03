"use client"
import React from "react";
import { Montserrat } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import dynamic from "next/dynamic";
const ResponsiveAppBar = dynamic(() => import("@/components/header"), { ssr: false });
import "./global.css";
import "../i18n";
const montserrat = Montserrat({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${montserrat.className}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveAppBar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
