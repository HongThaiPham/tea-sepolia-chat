import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/providers/app.provider";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tea Sepolia Dapp",
  description: "A simple dapp to test the Sepolia testnet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${unbounded.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
