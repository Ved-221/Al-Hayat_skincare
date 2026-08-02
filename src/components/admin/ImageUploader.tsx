"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  name: string;
  label: string;
  defaultValue?: string | null;
  folder?: "products" | "settings";
  hint?: string;
  required?: boolean;
  onChange?: (url: string) => void;
}

export default function ImageUploader({
  name,
  label,
  defaultValue = "",
  folder = "products",
  hint,
  required = false,
  onChange,
}: ImageUploaderProps) {
  const [currentUrl, setCurrentUrl] = useState<string>(defaultValue || "");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    setError(null);

    // Client-side validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please select a JPG, PNG, or WEBP image.");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError(`Image exceeds 5MB size limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`);
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      if (currentUrl) {
        formData.append("oldUrl", currentUrl);
      }

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Image upload failed. Please try again.");
      }

      setCurrentUrl(data.url);
      if (onChange) onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected upload error occurred.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isUploading) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (isUploading) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = async () => {
    if (currentUrl) {
      // Fire and forget delete so it doesn't block the UI
      fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: currentUrl, folder }),
      }).catch(err => console.error("Failed to delete file on remove:", err));
    }
    
    setCurrentUrl("");
    if (onChange) onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      {/* Hidden input ensuring the serialized path goes cleanly to Server Actions */}
      <input type="hidden" name={name} value={currentUrl} />

      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-gray-900">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {currentUrl && (
          <span className="text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full font-medium border border-green-200/60">
            ✓ Image Attached
          </span>
        )}
      </div>

      {hint && <p className="text-xs text-gray-500">{hint}</p>}

      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
          <span className="material-symbols-outlined text-base">error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone or Image Preview Card */}
      {!currentUrl ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all cursor-pointer ${
            isDragging
              ? "border-gray-900 bg-gray-50/90 scale-[0.995]"
              : isUploading
              ? "border-gray-300 bg-gray-50 cursor-wait opacity-80"
              : "border-gray-300 bg-gray-50/40 hover:border-gray-500 hover:bg-gray-50/80"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            disabled={isUploading}
            className="hidden"
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-gray-900">Uploading media asset...</p>
                <p className="text-[11px] text-gray-400">Please wait while the image is saved</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 rounded-full bg-white p-3.5 shadow-xs border border-gray-200 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-2xl text-gray-700">
                  cloud_upload
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800">
                Click to choose image or drag and drop here
              </p>
              <p className="mt-1 text-[11px] text-gray-400 font-medium">
                Supports JPG, PNG, WEBP (Maximum size: 5MB)
              </p>
            </>
          )}
        </div>
      ) : (
        /* Attached Image Preview Card */
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full sm:w-auto min-w-0">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center">
                <Image
                  src={currentUrl}
                  alt="Uploaded preview"
                  fill
                  sizes="80px"
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Current Asset Path
                </p>
                <p className="mt-0.5 font-mono text-xs text-gray-900 break-all truncate">
                  {currentUrl}
                </p>
                <p className="mt-1 text-[11px] text-gray-500">
                  Ready to be saved with product configuration
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-base">change_circle</span>
                Replace Image
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50/60 px-3.5 py-2 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
              >
                <span className="material-symbols-outlined text-base">delete</span>
                Remove
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelect(file);
            }}
            disabled={isUploading}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
}
