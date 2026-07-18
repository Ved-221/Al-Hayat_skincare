"use client";

import React from "react";

interface ReorderHandleProps {
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  disabled?: boolean;
}

export default function ReorderHandle({
  onDragStart,
  onDragOver,
  onDrop,
  disabled = false,
}: ReorderHandleProps) {
  return (
    <div
      draggable={!disabled}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      title="Drag to reorder"
      className={`inline-flex items-center justify-center p-1.5 text-gray-400 rounded hover:bg-gray-100 transition-colors ${
        disabled ? "opacity-30 cursor-not-allowed" : "cursor-grab active:cursor-grabbing hover:text-gray-600"
      }`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 8h16M4 16h16"
        />
      </svg>
    </div>
  );
}
