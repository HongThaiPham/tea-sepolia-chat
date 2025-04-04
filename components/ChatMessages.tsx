"use client";
import { MessageType } from "@/types/Message.type";
import React from "react";
import { isAddressEqual } from "viem";
import { useAccount } from "wagmi";
import ChatMessage from "./ChatMessage";
import { usePublicChat } from "./providers/publicChat.provider";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

const ChatMessages = () => {
  const { address } = useAccount();
  const { getMessages } = usePublicChat();

  const {
    data: messages,
    isLoading,
    error,
  } = useQuery<MessageType[]>({
    queryKey: ["blockchain-messages", address],
    queryFn: () => getMessages(0, 50), // Fetch the first 10 messages
    refetchInterval: 10000, // Refetch messages every 5 seconds
  });

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-start gap-3 max-w-[80%]">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-16 w-64" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-red-500">
        Error loading messages. Please try again.
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex items-center justify-center text-slate-500 dark:text-slate-400">
        No messages yet. Be the first to send a message!
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages &&
        messages.map((message) => {
          const isCurrentUser = isAddressEqual(
            message.author as `0x${string}`,
            address as `0x${string}`
          );
          return (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={isCurrentUser}
            />
          );
        })}
    </div>
  );
};

export default ChatMessages;
