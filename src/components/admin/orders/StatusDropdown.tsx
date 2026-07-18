"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ORDER_STATUS, OrderStatus } from "@/types/order";
import { updateOrderStatusAction } from "@/app/admin/(protected)/orders/actions";

interface StatusDropdownProps {
  orderId: string;
  currentStatus: OrderStatus;
}

export default function StatusDropdown({ orderId, currentStatus }: StatusDropdownProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Status list in logical order
  const statuses = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.READY,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.CANCELLED,
  ];

  // Client-side validation function to disable invalid options
  function getIsDisabled(target: OrderStatus): boolean {
    if (target === currentStatus) return false; // Allowed to keep current
    
    // Once Completed or Cancelled, no further transitions are allowed
    if (currentStatus === ORDER_STATUS.COMPLETED || currentStatus === ORDER_STATUS.CANCELLED) {
      return true;
    }
    
    // Cancellation is allowed from any non-Completed state
    if (target === ORDER_STATUS.CANCELLED) {
      return false;
    }

    const flow = [
      ORDER_STATUS.PENDING,
      ORDER_STATUS.ACCEPTED,
      ORDER_STATUS.PREPARING,
      ORDER_STATUS.READY,
      ORDER_STATUS.COMPLETED,
    ];

    const currentIndex = flow.indexOf(currentStatus);
    const targetIndex = flow.indexOf(target);

    // Only allow moving to the direct next step in the flow
    return targetIndex !== currentIndex + 1;
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value as OrderStatus;
    if (newStatus === currentStatus) return;

    if (newStatus === ORDER_STATUS.CANCELLED) {
      if (!confirm("Are you sure you want to cancel this order? This cannot be undone.")) {
        // Reset select value to currentStatus
        e.target.value = currentStatus;
        return;
      }
    }

    startTransition(async () => {
      setToast(null);
      const res = await updateOrderStatusAction(orderId, newStatus);
      if (res.success) {
        setToast({ type: "success", message: `Order status updated to ${newStatus}!` });
        router.refresh();
        // Clear success toast after 3 seconds
        setTimeout(() => setToast(null), 3000);
      } else {
        setToast({ type: "error", message: res.error || "Failed to update status." });
        // Reset select value to currentStatus
        e.target.value = currentStatus;
      }
    });
  }

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg border text-sm transition-all duration-300 ${
            toast.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          <span className="material-symbols-outlined text-lg">
            {toast.type === "success" ? "check_circle" : "error"}
          </span>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined text-xs">close</span>
          </button>
        </div>
      )}

      {/* Select Dropdown */}
      <div className="relative flex items-center">
        <select
          defaultValue={currentStatus}
          disabled={
            isPending ||
            currentStatus === ORDER_STATUS.COMPLETED ||
            currentStatus === ORDER_STATUS.CANCELLED
          }
          onChange={handleStatusChange}
          className={`block w-full rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-sm font-medium text-gray-700 shadow-xs focus:border-gray-900 focus:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-75`}
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
              disabled={getIsDisabled(status)}
            >
              {status}
            </option>
          ))}
        </select>
        {isPending && (
          <div className="absolute right-8 flex h-4 w-4 items-center justify-center">
            <svg
              className="h-4 w-4 animate-spin text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
