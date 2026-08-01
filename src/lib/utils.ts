import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImageUrl(img: string | undefined | null): string {
  if (!img) return "";
  if (img.startsWith("http")) return img;
  
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return img;
  
  return `${base}/storage/v1/object/public/site-assets${img.replace(".png", ".webp")}`;
}
