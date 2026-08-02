import type { ReactNode } from "react";
import TopNavBar from "@/components/TopNavBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { getStorefrontCategories } from "@/services/storefrontCategoryService";
import { getStoreSettings } from "@/services/settingsService";
import MaintenancePage from "@/components/MaintenancePage";
import { createClient } from "@/lib/supabase-server";

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, settings] = await Promise.all([
    getStorefrontCategories(),
    getStoreSettings(),
  ]);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = user && (await supabase.from("admins").select("id").eq("id", user.id).single()).data;

  if (settings.store_status === "Maintenance" && !isAdmin) {
    return <MaintenancePage settings={settings} />;
  }

  return (
    <div className="flex min-h-screen flex-col relative">
      {settings.store_status === "Maintenance" && isAdmin && (
        <div className="w-full bg-amber-500 text-amber-950 font-medium text-center text-xs py-1.5 z-[200]">
          🚧 Storefront is in Maintenance Mode — only admins can view it. 🚧
        </div>
      )}
      <TopNavBar categories={categories} settings={settings} user={user} />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.whatsapp_number} />
    </div>
  );
}
