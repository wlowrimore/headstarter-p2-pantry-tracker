import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SignInComponent from "./components/SignInComponent";
import SessionWrapper from "../providers/SessionProvider";
import { PantryProvider } from "@/providers/PantryProvider";
import { SetStateAction } from "react";
import { Ingredients } from "./interfaces";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker",
  description:
    "Next.JS Application that allows you to track your ingredients and search for recipes via AI",
  openGraph: {
    title: "Pantry Tracker",
    description:
      "Next.JS Application that allows you to track your ingredients and search for recipes via AI",
    url: "https://pantry-tracker.vercel.app/",
    siteName: "Pantry Tracker",
    images: [
      {
        url: "https://pantry-tracker.vercel.app/images/logos/site-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

const dynamic = "force-dynamic";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <SessionWrapper>
          <PantryProvider>
            <Header />
            <main
              style={{
                backgroundColor: "#478F59",
                maxWidth: "80rem",
                display: "flex",
                margin: "0 auto",
              }}
            >
              {children}
            </main>
            <section
              style={{
                maxWidth: "80rem",
                display: "flex",
                margin: "0 auto",
              }}
            >
              <SignInComponent />
            </section>
          </PantryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
