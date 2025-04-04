"use client";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Welcome to Tea Chat
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Connect your wallet to start chatting on the blockchain
              </p>
            </div>
            <div className="mt-8 flex flex-col justify-center items-center gap-y-4">
              <ConnectButton />
              {isConnected ? (
                <Link href={"/chat"}>
                  <Button>Start Chatting</Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
