import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import SignInComponent from "./components/SignInComponent";
import SessionWrapper from "../providers/SessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <Header />
          <main
            style={{
              backgroundColor: "#478F59",
              maxWidth: "80rem",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            {children}
          </main>
          <section
            style={{
              maxWidth: "80rem",
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <SignInComponent />
          </section>
        </SessionWrapper>
      </body>
    </html>
  );
}
