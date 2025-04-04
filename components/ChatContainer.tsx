"use client";
import React, { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import TransactionNotification from "./TransactionNotification";
import PublicChatProvider from "./providers/publicChat.provider";

const ChatContainer = () => {
  const [notification, setNotification] = useState<{
    txHash: string;
    isVisible: boolean;
  }>({
    txHash: "",
    isVisible: false,
  });

  const showNotification = (txHash: string) => {
    setNotification({
      txHash,
      isVisible: true,
    });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 5000);
  };

  const closeNotification = () => {
    setNotification((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };
  return (
    <PublicChatProvider>
      <ChatMessages />
      <ChatInput onMessageSent={showNotification} />
      <TransactionNotification
        txHash={notification.txHash}
        isVisible={notification.isVisible}
        onClose={closeNotification}
      />
    </PublicChatProvider>
  );
};

export default ChatContainer;
