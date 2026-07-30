import type { ReactNode } from "react";
import TopNavBar from "@/components/TopNavBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { getStorefrontCategories } from "@/services/storefrontCategoryService";
import { getStoreSettings } from "@/services/settingsService";

export default async function ShopLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [categories, settings] = await Promise.all([
    getStorefrontCategories(),
    getStoreSettings(),
  ]);

  return (
    <div className="flex min-h-screen flex-col relative">
      <TopNavBar categories={categories} settings={settings} />
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
      <Footer settings={settings} />
      <WhatsAppButton whatsappNumber={settings.whatsapp_number} />
    </div>
  );
}
