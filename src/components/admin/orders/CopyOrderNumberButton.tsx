"use client";

import { useState } from "react";

interface CopyOrderNumberButtonProps {
  orderNumber: string;
}

export default function CopyOrderNumberButton({ orderNumber }: CopyOrderNumberButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy order number:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 ${
        copied
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 active:bg-gray-100"
      }`}
      title="Copy Order Reference Number"
    >
      <span className="material-symbols-outlined text-sm">
        {copied ? "check" : "content_copy"}
      </span>
      <span>{copied ? "Copied!" : "Copy Number"}</span>
    </button>
  );
}
