import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const BUCKET_NAME = "site-assets";

async function ensureBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw listError;

  const exists = buckets.find((b) => b.name === BUCKET_NAME);
  if (!exists) {
    console.log(`Creating bucket ${BUCKET_NAME}...`);
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, { public: true });
    if (error) throw error;
  } else {
    console.log(`Bucket ${BUCKET_NAME} already exists.`);
  }
}

async function uploadAndRecord(key: string, buffer: Buffer, contentType: string, folder: string) {
  const filename = key.split('/').pop()!;
  const storagePath = `${folder}/${filename}`;

  console.log(`Uploading ${storagePath}...`);
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(storagePath, buffer, {
      contentType,
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(storagePath);
  const url = urlData.publicUrl;

  console.log(`Recording ${key} -> ${url}`);
  const { error: dbError } = await supabase
    .from("site_media")
    .upsert({ key, url }, { onConflict: "key" });

  if (dbError) throw dbError;
}

async function processImage(localPath: string, key: string, folder: string) {
  console.log(`Compressing ${localPath}...`);
  const buffer = await fs.readFile(localPath);
  const compressedBuffer = await sharp(buffer)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();

  const webpKey = key.replace(/\.png$|\.jpg$|\.jpeg$/, ".webp");
  await uploadAndRecord(webpKey, compressedBuffer, "image/webp", folder);
}

async function main() {
  try {
    await ensureBucket();

    const publicDir = path.join(process.cwd(), "public");

    // 1. Process specific unique bgremoved_photos
    const bgRemovedDir = path.join(publicDir, "bgremoved_photos");
    const bgFiles = await fs.readdir(bgRemovedDir);
    for (const file of bgFiles) {
      if (file.endsWith(".png")) {
        await processImage(path.join(bgRemovedDir, file), `ingredients/${file}`, "ingredients");
      }
    }

    // 2. Process unique products (only from products/ to avoid duplicates)
    const productsDir = path.join(publicDir, "products");
    const productFiles = await fs.readdir(productsDir);
    for (const file of productFiles) {
      if (file.endsWith(".png")) {
        await processImage(path.join(productsDir, file), `products/${file}`, "products");
      }
    }

    // 3. Process logo
    const logoPath = path.join(publicDir, "logo_withoutbg.png");
    if (await fs.stat(logoPath).catch(() => null)) {
      await processImage(logoPath, "branding/logo_withoutbg.png", "branding");
    }

    // 4. Video (assume optimized video exists, or upload original if not)
    const videos = [
      { key: "hero/hero_video.mp4", paths: ["hero_video_optimized.mp4", "hero_video.mp4"] },
      { key: "hero/keep_everything_in_this_video_gwr_video_mvp.mp4", paths: ["keep_everything_in_this_video_gwr_video_mvp_optimized.mp4", "keep_everything_in_this_video_gwr_video_mvp.mp4"] }
    ];

    for (const v of videos) {
      let videoToUpload = null;
      for (const p of v.paths) {
        const fullPath = path.join(publicDir, p);
        if (await fs.stat(fullPath).catch(() => null)) {
          videoToUpload = fullPath;
          break;
        }
      }

      if (videoToUpload) {
        console.log(`Reading video ${videoToUpload}...`);
        const videoBuffer = await fs.readFile(videoToUpload);
        await uploadAndRecord(v.key, videoBuffer, "video/mp4", "hero");
      }
    }

    console.log("Migration complete!");
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

main();
