import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. Verify Admin Authentication
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      return NextResponse.json(
        { error: "Unauthorized access. Please login as an administrator." },
        { status: 401 }
      );
    }

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("id", user.id)
      .single();

    if (!admin || adminError) {
      return NextResponse.json(
        { error: "Forbidden. Administrative access required." },
        { status: 403 }
      );
    }

    // 2. Parse FormData
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "products";

    if (!file) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    // 3. Validate File Type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file format (${file.type}). Please upload JPG, PNG, or WEBP images.` },
        { status: 400 }
      );
    }

    // 4. Validate File Size (Max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds the 5MB maximum limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).` },
        { status: 400 }
      );
    }

    // 5. Prepare Buffer and Unique Filename
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const sanitizedBase = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .toLowerCase()
      .slice(0, 30);
    const filename = `${sanitizedBase}-${Date.now()}.${ext}`;

    // 6. Attempt Supabase Storage Upload first (bucket: 'products' or 'media')
    const bucketName = folder === "settings" ? "media" : "products";
    const { data: storageData, error: storageError } = await supabase.storage
      .from(bucketName)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (!storageError && storageData) {
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filename);
      return NextResponse.json({ success: true, url: publicUrlData.publicUrl });
    }

    // 7. Fallback: Save to Local Workspace `public/` directory (during development/local testing)
    const publicFolder = folder === "settings" ? "photos" : "products";
    const uploadDir = path.join(process.cwd(), "public", publicFolder);

    try {
      await fs.mkdir(uploadDir, { recursive: true });
      const localPath = path.join(uploadDir, filename);
      await fs.writeFile(localPath, buffer);

      const urlPath = `/${publicFolder}/${filename}`;
      return NextResponse.json({
        success: true,
        url: urlPath,
        note: storageError ? `Saved to local workspace (${storageError.message})` : undefined,
      });
    } catch (fsErr: any) {
      console.error("[uploadRoute] Local save error:", fsErr);
      return NextResponse.json(
        {
          error: `Storage upload failed (${storageError?.message || "Bucket missing"}) and local filesystem write failed (${fsErr.message}).`,
        },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("[uploadRoute] Unexpected exception:", err);
    return NextResponse.json(
      { error: err.message || "An unexpected error occurred during image upload." },
      { status: 500 }
    );
  }
}
