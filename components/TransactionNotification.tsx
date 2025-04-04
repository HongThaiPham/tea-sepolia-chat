import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TransactionNotificationProps {
  txHash: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function TransactionNotification({
  txHash,
  isVisible,
  onClose,
}: TransactionNotificationProps) {
  const [isRendered, setIsRendered] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
    } else {
      // Allow time for exit animation
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isRendered && !isVisible) {
    return null;
  }

  // Create etherscan link based on network
  const networkPrefix = "sepolia"; // Default to Sepolia testnet
  const etherscanLink = `https://${networkPrefix}.tea.xyz/tx/${txHash}`;

  return (
    <div
      className={cn(
        "fixed bottom-16 md:bottom-4 right-4 max-w-xs w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transform transition-transform duration-300 p-4 z-50",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-blue-500 flex-shrink-0">
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </div>
        <div className="flex-1">
          <h4 className="font-medium">Transaction Sent</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Your message is being processed on the blockchain
          </p>
          <div className="mt-2">
            <a
              href={etherscanLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
            >
              <span>View on Etherscan</span>
              <i className="fa-solid fa-external-link-alt"></i>
            </a>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        >
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
    </div>
  );
}
