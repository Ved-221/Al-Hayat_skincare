import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();

  if (!user?.user) {
    redirect("/admin/login");
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("id")
    .eq("id", user.user.id)
    .single();

  if (!admin) {
    redirect("/");
  }

  return user.user;
}

export async function requireCustomer() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user) {
    redirect("/account/login");
  }

  return user.user;
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}