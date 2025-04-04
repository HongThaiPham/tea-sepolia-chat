import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format an Ethereum address to a shortened form
 * @param address The full address
 * @returns Shortened address (e.g. 0x1234...5678)
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

/**
 * Format timestamp to a readable time
 * @param timestamp Date, timestamp string, or number
 * @returns Formatted time (e.g. 10:30 AM)
 */
export function formatTimestamp(timestamp: Date | string | number): string {
  if (!timestamp) return "";

  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp);
  }

  // Handle invalid dates
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format timestamp to a readable date and time
 * @param timestamp Date, timestamp string, or number
 * @returns Formatted date and time (e.g. Jan 1, 2023 10:30 AM)
 */
export function formatDateTime(timestamp: Date | string | number): string {
  if (!timestamp) return "";

  let date: Date;
  if (timestamp instanceof Date) {
    date = timestamp;
  } else if (typeof timestamp === "number") {
    date = new Date(timestamp);
  } else {
    date = new Date(timestamp);
  }

  // Handle invalid dates
  if (isNaN(date.getTime())) return "";

  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
