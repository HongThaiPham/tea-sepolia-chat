import { formatAddress, formatTimestamp } from "@/lib/utils";
import { MessageType } from "@/types/Message.type";
import { memo } from "react";
interface ChatMessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}
const ChatMessage = memo(({ message, isCurrentUser }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-3 max-w-[80%] ${
        isCurrentUser ? "ml-auto" : ""
      }`}
    >
      {!isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-slate-500 dark:text-slate-300 flex-shrink-0">
          <i className="fa-solid fa-user"></i>
        </div>
      )}

      <div className={isCurrentUser ? "order-1" : ""}>
        <div
          className={`flex items-center gap-2 ${
            isCurrentUser ? "justify-end" : ""
          }`}
        >
          <span className="font-medium text-sm">
            {isCurrentUser ? "You" : formatAddress(message.author)}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>

        <div
          className={`mt-1 p-3 rounded-lg shadow-sm ${
            isCurrentUser
              ? "bg-blue-500 text-white rounded-tr-none"
              : "bg-white dark:bg-slate-700 rounded-tl-none"
          }`}
        >
          <p>{message.content}</p>
        </div>
      </div>

      {isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0">
          <i className="fa-solid fa-user"></i>
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";
export default ChatMessage;
