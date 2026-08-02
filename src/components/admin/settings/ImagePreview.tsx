"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImagePreviewProps {
  url: string | null | undefined;
  label: string;
  type?: "logo" | "favicon";
}

export default function ImagePreview({ url, label, type = "logo" }: ImagePreviewProps) {
  const [hasError, setHasError] = useState(false);



  const isValidUrl = url && typeof url === "string" && url.trim().length > 0 && !hasError;

  return (
    <div className="mt-3 flex items-center gap-4 rounded-lg border border-gray-200 bg-gray-50/70 p-3.5">
      {/* Thumbnail box */}
      <div
        className={`flex flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white shadow-xs ${
          type === "favicon" ? "h-12 w-12" : "h-14 w-28"
        }`}
      >
        {isValidUrl ? (
          <Image layout="fill" objectFit="cover" unoptimized
            src={url}
            alt={label}
            onError={() => setHasError(true)}
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-xl">
              {type === "favicon" ? "favorite" : "image"}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-wider mt-0.5">
              {hasError ? "Broken Link" : "No Image"}
            </span>
          </div>
        )}
      </div>

      {/* Details / Status text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-700">{label} Preview</span>
          {isValidUrl ? (
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-200">
              Active
            </span>
          ) : hasError ? (
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 border border-red-200">
              Invalid URL
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
              Default Fallback
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-400 truncate font-mono">
          {url ? url : `Using default ${type === "favicon" ? "icon" : "brand font text"}`}
        </p>
      </div>
    </div>
  );
}
