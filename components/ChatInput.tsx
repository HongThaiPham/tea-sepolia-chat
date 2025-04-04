"use client";
import { MESSAGE_FEE } from "@/lib/constants";
import { parseEther } from "viem";
import { useAccount, useBalance } from "wagmi";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { usePublicChat } from "./providers/publicChat.provider";

interface ChatInputProps {
  onMessageSent: (txHash: string) => void;
}

export default function ChatInput({ onMessageSent }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const { address, isConnected } = useAccount();
  const { sendMessage } = usePublicChat();

  const { data: balanceData } = useBalance({ address });

  const messageFeeInWei = parseEther(MESSAGE_FEE);
  const hasEnoughBalance = balanceData?.value
    ? balanceData.value >= messageFeeInWei
    : false;

  const handleSubmit = async () => {
    const hash = await sendMessage(message);
    console.log("Message sent with hash:", hash);
    if (hash) {
      onMessageSent(hash);
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4">
      {isConnected && !hasEnoughBalance ? (
        <Alert className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 mb-3">
          <AlertTriangle className="h-4 w-4 text-amber-700 dark:text-amber-400" />
          <AlertTitle className="text-amber-700 dark:text-amber-400">
            Insufficient balance
          </AlertTitle>
          <AlertDescription className="text-sm text-amber-700 dark:text-amber-400">
            You need at least {MESSAGE_FEE} TEA to send a message
          </AlertDescription>
        </Alert>
      ) : null}
      {/* Message input form */}
      <form className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Type your message..."
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-transparent pr-[4.5rem]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={!hasEnoughBalance}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-medium bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 px-2 py-0.5 rounded-full">
            {MESSAGE_FEE} TEA
          </div>
        </div>
        <Button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors"
          disabled={!message.trim() || !hasEnoughBalance}
          aria-label="Send message"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </div>
  );
}
