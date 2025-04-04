import { chatAbi } from "@/lib/abi";
import {
  CONTRACT_ADDRESS,
  FIRST_MESSAGE_FEE,
  MESSAGE_FEE,
} from "@/lib/constants";
import { MessageType } from "@/types/Message.type";
import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

// Interface for the BlockChat context
interface PublicChatContextType {
  isLoading: boolean;
  sendMessage: (content: string) => Promise<string | null>;
  getMessages: (pageNumber: number, pageSize: number) => Promise<MessageType[]>;
}

const PublicChatContext = React.createContext<
  PublicChatContextType | undefined
>(undefined);
const PublicChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const getMessages = useCallback(
    async (pageNumber: number, pageSize: number): Promise<MessageType[]> => {
      if (!publicClient) return [];
      try {
        // Get raw blockchain messages
        const messages = (await publicClient.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: chatAbi,
          functionName: "getMessages",
          args: [BigInt(pageNumber ?? 0), BigInt(pageSize ?? 10)],
        })) as unknown as MessageType[];

        // Format messages for UI
        return messages.map((msg, index) => ({
          id: `message-${index}`, // Generate a unique ID
          author: msg.author,
          content: msg.content,
          timestamp: Number(msg.timestamp) * 1000, // Convert to milliseconds
        }));
      } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
      }
    },
    [publicClient]
  );

  // Send a message to a room
  const sendMessage = useCallback(
    async (content: string) => {
      if (!walletClient || !address) {
        throw new Error("Wallet not connected");
      }
      if (!publicClient) return null;

      try {
        const hasSentFirstMessage = (await publicClient.readContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: chatAbi,
          functionName: "hasSentFirstMessage",
          args: [address],
        })) as unknown as boolean;

        const fee = hasSentFirstMessage
          ? parseEther(MESSAGE_FEE)
          : parseEther(FIRST_MESSAGE_FEE);
        console.log("hasSentFirstMessage", hasSentFirstMessage);

        // // Make the blockchain transaction
        const hash = await walletClient.writeContract({
          address: CONTRACT_ADDRESS as `0x${string}`,
          abi: chatAbi,
          functionName: "sendMessage",
          args: [content],
          value: fee,
        });

        // Wait for the transaction to be mined
        const receipt = await publicClient?.waitForTransactionReceipt({ hash });

        if (receipt?.status !== "success") {
          throw new Error("Transaction failed");
        }

        return hash;
      } catch (error) {
        console.error("Error sending message:", error);
        throw error;
      }
    },
    [walletClient, publicClient, address]
  );

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo<PublicChatContextType>(
    () => ({
      isLoading: false,
      sendMessage,
      getMessages,
    }),
    [getMessages, sendMessage]
  );

  return (
    <PublicChatContext.Provider value={contextValue}>
      {children}
    </PublicChatContext.Provider>
  );
};

export default PublicChatProvider;

export function usePublicChat() {
  const context = useContext(PublicChatContext);
  if (context === undefined) {
    throw new Error("usePublicChat must be used within a PublicChatProvider");
  }
  return context;
}
