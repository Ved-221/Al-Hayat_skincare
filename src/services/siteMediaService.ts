import { createClient } from "@supabase/supabase-js";

// Uses a service role key ONLY IF available (e.g. during build or admin calls), otherwise falls back to anon key.
// But we actually only ever need the ANON key for public reads on the client or server.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface SiteMedia {
  key: string;
  url: string;
  created_at: string;
  updated_at: string;
}

/**
 * Fetches all site media URLs, returning them as a Record<string, string> mapped by `key`.
 * This allows easy lookups like `media['branding/logo_withoutbg.webp']`.
 */
export async function getSiteMedia(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from("site_media")
    .select("key, url");

  if (error) {
    console.error("Error fetching site_media:", error);
    return {};
  }

  const mediaMap: Record<string, string> = {};
  if (data) {
    for (const item of data) {
      mediaMap[item.key] = item.url;
    }
  }
  return mediaMap;
}

/**
 * Fetches a single media URL by key.
 */
export async function getSiteMediaByKey(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("site_media")
    .select("url")
    .eq("key", key)
    .single();

  if (error || !data) {
    return null;
  }
  return data.url;
}
